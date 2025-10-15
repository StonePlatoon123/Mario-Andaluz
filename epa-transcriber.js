/**
 * Sistema de Transcripción al Andaluz EPA - Versión JavaScript
 * Basado en AndaluGeeks - Implementación completa
 * 
 * ¡EPA! Sistema súper completo para transcribir al andaluz, colega!
 */

const fs = require('fs');
const path = require('path');

// Constantes para variantes de transcripción
const VAF = 'ç'; // Variante de transcripción de 's' y 'z'
const VVF = 'h'; // Variante de transcripción de 'j' y 'g'

// Dígrafos que activan las reglas generales
const DIGRAPHS = [
    'bb', 'bc', 'bç', 'bÇ', 'bd', 'bf', 'bg', 'bh', 'bm', 'bn', 'bp', 'bq', 'bt', 'bx', 'by', 'cb', 'cc',
    'cç', 'cÇ', 'cd', 'cf', 'cg', 'ch', 'cm', 'cn', 'cp', 'cq', 'ct', 'cx', 'cy',
    'db', 'dc', 'dç', 'dÇ', 'dd', 'df', 'dg', 'dh', 'dl', 'dm', 'dn', 'dp', 'dq', 'dt', 'dx', 'dy',
    'fb', 'fc', 'fç', 'fÇ', 'fd', 'ff', 'fg', 'fh', 'fm', 'fn', 'fp', 'fq', 'ft', 'fx', 'fy',
    'gb', 'gc', 'gç', 'gÇ', 'gd', 'gf', 'gg', 'gh', 'gm', 'gn', 'gp', 'gq', 'gt', 'gx', 'gy',
    'jb', 'jc', 'jç', 'jÇ', 'jd', 'jf', 'jg', 'jh', 'jl', 'jm', 'jn', 'jp', 'jq', 'jr', 'jt', 'jx', 'jy',
    'lb', 'lc', 'lç', 'lÇ', 'ld', 'lf', 'lg', 'lh', 'll', 'lm', 'ln', 'lp', 'lq', 'lr', 'lt', 'lx', 'ly',
    'mm', 'mn', 'nm', 'nn',
    'pb', 'pc', 'pç', 'pÇ', 'pd', 'pf', 'pg', 'ph', 'pm', 'pn', 'pp', 'pq', 'pt', 'px', 'py',
    'rn',
    'sb', 'sc', 'sç', 'sÇ', 'sd', 'sf', 'sg', 'sh', 'sk', 'sl', 'sm', 'sn', 'sñ', 'sp', 'sq', 'sr', 'st', 'sx', 'sy',
    'tb', 'tc', 'tç', 'tÇ', 'td', 'tf', 'tg', 'th', 'tl', 'tm', 'tn', 'tp', 'tq', 'tt', 'tx', 'ty',
    'xb', 'xc', 'xç', 'xÇ', 'xd', 'xf', 'xg', 'xh', 'xl', 'xm', 'xn', 'xp', 'xq', 'xr', 'xt', 'xx', 'xy',
    'zb', 'zc', 'zç', 'zÇ', 'zd', 'zf', 'zg', 'zh', 'zl', 'zm', 'zn', 'zp', 'zq', 'zr', 'zt', 'zx', 'zy'
];

// Excepciones para reglas H
const H_RULES_EXCEPT = {
    'haz': 'âh', 'hez': 'êh', 'hoz': 'ôh',
    'oh': 'ôh',
    'yihad': 'yihá',
    'h': 'h'
};

// Excepciones para reglas G/J
const GJ_RULES_EXCEPT = {
    'gin': 'yin', 'jazz': 'yâh', 'jet': 'yêh'
};

// Excepciones para reglas V
const V_RULES_EXCEPT = {
    'vis': 'bî', 'ves': 'bêh'
};

// Excepciones para reglas LL
const LL_RULES_EXCEPT = {
    'grill': 'grîh'
};

// Excepciones para finales D
const WORDEND_D_RULES_EXCEPT = {
    'çed': 'çêh'
};

// Excepciones para finales S
const WORDEND_S_RULES_EXCEPT = {
    'bies': 'biêh', 'bis': 'bîh', 'blues': 'blû', 'bus': 'bûh',
    'dios': 'diôh', 'dos': 'dôh',
    'gas': 'gâh', 'gres': 'grêh', 'gris': 'grîh',
    'luis': 'luîh',
    'mies': 'miêh', 'mus': 'mûh',
    'os': 'ô',
    'pis': 'pîh', 'plus': 'plûh', 'pus': 'pûh',
    'ras': 'râh', 'res': 'rêh',
    'tos': 'tôh', 'tres': 'trêh', 'tris': 'trîh'
};

// Excepciones para finales consonantes
const WORDEND_CONST_RULES_EXCEPT = {
    'al': 'al', 'cual': 'cuâ', 'del': 'del', 'dél': 'dél', 'el': 'el', 'él': 'él', 'tal': 'tal', 'bil': 'bîl',
    'por': 'por', 'uir': 'huîh',
    'çic': 'çic', 'tac': 'tac',
    'yak': 'yak',
    'stop': 'êttôh', 'bip': 'bip'
};

// Excepciones para D intervocálico
const WORDEND_D_INTERVOWEL_RULES_EXCEPT = {
    'fado': 'fado', 'cado': 'cado', 'nado': 'nado', 'priado': 'priado',
    'fabada': 'fabada', 'fabadas': 'fabadas', 'fada': 'fada', 'ada': 'ada', 'lada': 'lada', 'rada': 'rada',
    'adas': 'adas', 'radas': 'radas', 'nadas': 'nadas',
    'aikido': 'aikido', 'bûççido': 'bûççido', 'çido': 'çido', 'cuido': 'cuido', 'cupido': 'cupido', 'descuido': 'descuido',
    'despido': 'despido', 'eido': 'eido', 'embido': 'embido', 'fido': 'fido', 'hido': 'hido', 'ido': 'ido', 'infido': 'infido',
    'laido': 'laido', 'libido': 'libido', 'nido': 'nido', 'nucleido': 'nucleido', 'çonido': 'çonido', 'çuido': 'çuido'
};

// Excepciones generales
const ENDING_RULES_EXCEPTION = {
    'biêmmandao': 'bienmandao', 'biêmmeçabe': 'bienmeçabe', 'buêmmoço': 'buenmoço', 'çiêmmiléçima': 'çienmiléçima', 'çiêmmiléçimo': 'çienmiléçimo', 'çiêmmilímetro': 'çienmilímetro', 'çiêmmiyonéçima': 'çienmiyonéçima', 'çiêmmiyonéçimo': 'çienmiyonéçimo', 'çiêmmirmiyonéçima': 'çienmirmiyonéçima', 'çiêmmirmiyonéçimo': 'çienmirmiyonéçimo',
    'marrotadôh': 'mârrotadôh', 'marrotâh': 'mârrotâh', 'mirrayâ': 'mîrrayâ',
    'herôççiquiatría': 'heroçiquiatría', 'herôççiquiátrico': 'heroçiquiátrico', 'farmacôççiquiatría': 'farmacoçiquiatría', 'metempçícoçî': 'metemçícoçî', 'necróçico': 'necróççico', 'pampçiquîmmo': 'pamçiquîmmo',
    'antîççerôttármico': 'antiçerôttármico', 'eclampçia': 'eclampçia', 'pôttoperatorio': 'pôççoperatorio', 'çáccrito': 'çánccrito', 'manbîh': 'mambîh', 'cômmelináçeo': 'commelináçeo', 'dîmmneçia': 'dînneçia', 'todo': 'tó', 'todô': 'tôh', 'toda': 'toa', 'todâ': 'toâ',
    'as': 'âh', 'clown': 'claun', 'crack': 'crâh', 'down': 'daun', 'es': 'êh', 'ex': 'êh', 'ir': 'îh', 'miss': 'mîh', 'muy': 'mu', 'ôff': 'off', 'os': 'ô', 'para': 'pa', 'ring': 'rin', 'rock': 'rôh', 'spray': 'êppray', 'sprint': 'êpprín', 'wa': 'gua'
};

// Funciones auxiliares
function isUpperCase(str) {
    return str.toUpperCase() === str;
}

function isLowerCase(str) {
    return str.toLowerCase() === str;
}

function isCapitalized(word) {
    return isUpperCase(word.charAt(0)) && isLowerCase(word.substr(1));
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}

function keep_case(word, replacement_word) {
    if (isLowerCase(word)) return replacement_word;
    if (isUpperCase(word)) return replacement_word.toUpperCase();
    if (isCapitalized(word)) return capitalize(replacement_word);
    return replacement_word;
}

const VOWELS_ALL_NOTILDE = 'aeiouâêîôûAEIOUÂÊÎÔÛ';
const VOWELS_ALL_TILDE = 'áéíóúâêîôûÁÉÍÓÚÂÊÎÔÛ';

function get_vowel_tilde(vowel) {
    const i = VOWELS_ALL_NOTILDE.indexOf(vowel);
    if (vowel && i !== -1) return VOWELS_ALL_TILDE[i];
    if (VOWELS_ALL_TILDE.includes(vowel)) return vowel;
    return vowel;
}

function get_vowel_circumflex(vowel) {
    const i = VOWELS_ALL_NOTILDE.indexOf(vowel);
    if (vowel && i !== -1) return VOWELS_ALL_NOTILDE[i + 5];
    if (VOWELS_ALL_TILDE.includes(vowel)) return vowel;
    return vowel;
}

function matchWholeWord(exp) {
    return `(?=|$|[^\\p{L}])${exp}(?=^|$|[^\\p{L}])`;
}

function matchWholeWordFromSubexpression(exp) {
    return matchWholeWord(`(\\p{L}*)${exp}(\\p{L}*)`);
}

function matchWholeWordFromSubexpressionAtEnd(exp) {
    return matchWholeWord(`(\\p{L}*)${exp}`);
}

class EPA {
    constructor() {
        this.tags = [];
        this.lemario = new Map();
        this.loadLemario();
    }

    // Cargar diccionario desde CSV
    loadLemario() {
        try {
            const csvPath = path.join(__dirname, 'test', 'lemario.csv');
            if (fs.existsSync(csvPath)) {
                const csvContent = fs.readFileSync(csvPath, 'utf-8');
                const lines = csvContent.split('\n');
                
                for (const line of lines) {
                    if (line.trim()) {
                        const [original, transcrito] = line.split(',');
                        if (original && transcrito) {
                            const cleanOriginal = original.replace(/"/g, '').trim();
                            const cleanTranscrito = transcrito.replace(/"/g, '').trim();
                            this.lemario.set(cleanOriginal.toLowerCase(), cleanTranscrito);
                        }
                    }
                }
                console.log(`✅ Lemario cargado: ${this.lemario.size} palabras`);
            } else {
                console.log('⚠️  Lemario no encontrado, usando reglas básicas');
            }
        } catch (error) {
            console.log('⚠️  Error cargando lemario:', error.message);
        }
    }

    // Ignorar reglas para URLs, menciones, etc.
    ignore_rules(text) {
        const patterns = [
            /(https?:\/\/)?(?:www\.)?(?:[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})/gi,
            /(?:@([\p{L}])+)/gi,
            /(?:#([\p{L}])+)/gi,
            /(?=\b[MCDXLVI]{1,8}\b)M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})/g,
        ];

        return patterns.reduce((text, pattern) => {
            const matches = text.match(pattern);
            if (matches) {
                const randomInt = Math.floor(Math.random() * 999999999).toString();
                matches.forEach(match => this.tags.push([randomInt, match]));
                return text.replace(pattern, randomInt);
            }
            return text;
        }, text);
    }

    // Reglas para 'h'
    h_rules(text) {
        // chihuahua => chiguagua
        text = text.replace(/([\p{L}])?(?<!c)(h)(ua)/gi, (_, prev_char = '', h_char, ua_chars) => 
            prev_char + keep_case(h_char, 'g') + ua_chars);
        
        // hueco => güeco
        text = text.replace(/([\p{L}])?(?<!c)(h)(u)(e)/gi, (_, prev_char = '', h_char, u_char, e_char) => 
            prev_char + keep_case(h_char, 'g') + keep_case(u_char, 'ü') + e_char);
        
        // Reglas generales para h
        text = text.replace(new RegExp(matchWholeWordFromSubexpression('(?<!c)(h)'), 'gi'), (word) => {
            if (word && H_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, H_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/([\p{L}])?(?<!c)(h)([\p{L}]?)/gi, (_, prev_char = '', h_char, next_char = '') => 
                prev_char + keep_case(h_char, next_char));
        });

        return text;
    }

    // Reglas para 'x'
    x_rules(text, vaf = VAF) {
        // Axila => Aççila | Éxito => Éççito
        text = text.replace(/(a|e|i|o|u|á|é|í|ó|ú)(x)(a|e|i|o|u|y|á|é|í|ó|ú)/gi, 
            (_, prev_char, x_char, next_char) => get_vowel_circumflex(prev_char) + keep_case(x_char, vaf).repeat(2) + next_char);
        
        // Xilófono => Çilófono
        text = text.replace(/(?<=^|\s)(x)/gi, (x_char) => keep_case(x_char, vaf));

        return text;
    }

    // Reglas para 'ch'
    ch_rules(text) {
        return text.replace(/ch/gi, (match) => keep_case(match[0], 'x'));
    }

    // Reglas para 'g' y 'j'
    gj_rules(text, vvf = VVF) {
        // G,J + vocal replacement
        text = text.replace(new RegExp(matchWholeWordFromSubexpression('(g(?=e|i|é|í)|j)(a|e|i|o|u|á|é|í|ó|ú)'), 'gi'), (word) => {
            if (GJ_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, GJ_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/(g(?=e|i|é|í)|j)(a|e|i|o|u|á|é|í|ó|ú)/gi, (_, jg_cons, vowel) => 
                keep_case(jg_cons, vvf) + vowel);
        });
        
        // GUE,GUI replacement
        text = text.replace(/(g)u(e|i|é|í)/gi, '$1$2');
        
        // GÜE,GÜI replacement
        text = text.replace(/(g)(ü)(e|i|é|í)/gi, (_, g_char, middle_u, vowel) => 
            g_char + keep_case(middle_u, 'u') + vowel);
        
        // bueno / abuelo / sabues => gueno / aguelo / sagues
        text = text.replace(/(b)(uen)/gi, (_, b_char, suffix) => keep_case(b_char, 'g') + suffix);
        text = text.replace(/(s|a)?(?<!m)(b)(ue)(l|s)/gi, (_, sa, b, ue, cons) => sa + keep_case(b, 'g') + ue + cons);

        return text;
    }

    // Reglas para 'v'
    v_rules(text) {
        // NV -> NB -> MB (i.e.: envidia -> embidia)
        text = text.replace(/nv/gi, (chars) => keep_case(chars[0], 'm') + keep_case(chars[1], 'b'));
        
        // v -> b
        text = text.replace(new RegExp(matchWholeWordFromSubexpression('v'), 'gi'), (word) => {
            if (V_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, V_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/v/gi, (word) => keep_case(word, 'b'));
        });

        return text;
    }

    // Reglas para 'll'
    ll_rules(text) {
        return text.replace(new RegExp(matchWholeWordFromSubexpression('ll'), 'gi'), (word) => {
            if (LL_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, LL_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/ll/gi, (word) => keep_case(word, 'y'));
        });
    }

    // Reglas para 'l'
    l_rules(text) {
        return text.replace(/(l)(b|c|ç|g|s|d|f|g|h|k|m|p|q|r|t|x|z)/gi, 
            (_, l_char, suffix) => keep_case(l_char, 'r') + suffix);
    }

    // Reglas para psico/pseudo
    psico_pseudo_rules(text) {
        return text.replace(/p(sic|seud)/gi, '$1');
    }

    // Reglas VAF (s/z -> ç)
    vaf_rules(text, vaf = VAF) {
        return text.replace(/(c(?=e|i|é|í|ê|î)|z|s)(a|e|i|o|u|á|é|í|ó|ú|Á|É|Í|Ó|Ú|â|ê|î|ô|û|Â|Ê|Î|Ô|Û)/gi, 
            (_, cons_char, suffix) => keep_case(cons_char, vaf) + suffix);
    }

    // Reglas de final de palabra (simplificadas)
    word_ending_rules(text) {
        const repl_rules = {
            a: 'â', A: 'Â', á: 'â', Á: 'Â',
            e: 'ê', E: 'Ê', é: 'ê', É: 'Ê',
            i: 'î', I: 'Î', í: 'î', Í: 'Î',
            o: 'ô', O: 'Ô', ó: 'ô', Ó: 'Ô',
            u: 'û', U: 'Û', ú: 'û', Ú: 'Û'
        };

        // Aplicar reglas básicas de final de palabra
        text = text.replace(new RegExp(matchWholeWordFromSubexpressionAtEnd('(a|e|i|o|u|á|é|í|ó|ú)(d)'), 'gi'), (word) => {
            if (WORDEND_D_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, WORDEND_D_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/(a|e|i|o|u|á|é|í|ó|ú)(d)$/gi, (_, vowel) => repl_rules[vowel] || vowel);
        });

        text = text.replace(new RegExp(matchWholeWordFromSubexpressionAtEnd('(a|e|i|o|u|á|é|í|ó|ú)(s)'), 'gi'), (word) => {
            if (WORDEND_S_RULES_EXCEPT[word.toLowerCase()]) {
                return keep_case(word, WORDEND_S_RULES_EXCEPT[word.toLowerCase()]);
            }
            return word.replace(/(a|e|i|o|u|á|é|í|ó|ú)(s)$/gi, (_, vowel) => repl_rules[vowel] || vowel);
        });

        return text;
    }

    // Reglas de dígrafos
    digraph_rules(text) {
        // intersticial / solsticio / superstición / cárstico
        text = text.replace(/(a|e|i|o|u|á|é|í|ó|ú)(l|r)s(t)/gi, 
            (_, vowel_char, lr_char, t_char) => vowel_char + (lr_char.toLowerCase() === 'l' ? keep_case(lr_char, 'r') : lr_char) + t_char + t_char);
        
        // aerotransporte => aerotrâpporte | translado => trâl-lao
        text = text.replace(/(tr|p)(a|o)(?:ns|st)(b|c|ç|d|f|g|h|j|k|l|m|n|p|q|s|t|v|w|x|y|z)/gi, 
            (_, init_char, vowel_char, cons_char) => init_char + get_vowel_circumflex(vowel_char) + cons_char + (cons_char.toLowerCase() === 'l' ? '-' : '') + cons_char);
        
        // abstracto => âttrâtto | adscrito => âccrito
        text = text.replace(/(a|e|i|o|u|á|é|í|ó|ú)(b|d|n|r)(s)(b|c|ç|d|f|g|h|j|k|l|m|n|p|q|s|t|v|w|x|y|z)/gi, 
            (_, vowel_char, cons_char, s_char, digraph_char) => {
                const isrs = cons_char.toLowerCase() === 'r' && s_char.toLowerCase() === 's';
                return (isrs ? vowel_char + cons_char : get_vowel_circumflex(vowel_char)) + digraph_char.repeat(2);
            });
        
        // atlántico => âl-lántico | orla => ôl-la
        text = text.replace(/(a|e|i|o|u|á|é|í|ó|ú)(?:d|j|r|s|t|x|z)(l)/gi, 
            (_, vowel_char, digraph_char) => get_vowel_circumflex(vowel_char) + digraph_char + '-' + digraph_char);
        
        // Reglas generales de dígrafos
        text = text.replace(new RegExp(`(a|e|i|o|u|á|é|í|ó|ú)(${DIGRAPHS.join('|')})`, 'gi'), 
            (_, vowel_char, digraph_chars) => get_vowel_circumflex(vowel_char) + digraph_chars[1].repeat(2));

        return text;
    }

    // Reglas de excepciones
    exception_rules(text) {
        return text.replace(new RegExp(matchWholeWord(`(${Object.keys(ENDING_RULES_EXCEPTION).join('|')})`), 'gi'), 
            (word) => keep_case(word, ENDING_RULES_EXCEPTION[word.toLowerCase()]));
    }

    // Reglas de interacción entre palabras
    word_interaction_rules(text) {
        return text.replace(/(?=|$|[^\p{L}])(\p{L}*)(l)(\s)(b|c|ç|d|f|g|h|j|k|l|m|n|ñ|p|q|s|t|v|w|x|y|z)/gi, 
            (_, prefix, l_char, whitespace_char, suffix) => prefix + keep_case(l_char, 'r') + whitespace_char + suffix);
    }

    // Función principal de transcripción
    transcript(text, vaf = VAF, vvf = VVF, scapeLinks = false) {
        let substitutedText = text;

        if (scapeLinks) {
            substitutedText = this.ignore_rules(text);
        }

        const rules = [
            this.h_rules,
            this.x_rules,
            this.ch_rules,
            this.gj_rules,
            this.v_rules,
            this.ll_rules,
            this.l_rules,
            this.psico_pseudo_rules,
            this.vaf_rules,
            this.word_ending_rules,
            this.digraph_rules,
            this.exception_rules,
            this.word_interaction_rules
        ];

        const finalText = rules.reduce((substitutedText, rule) => {
            if (rule === this.x_rules) return this.x_rules(substitutedText, vaf);
            if (rule === this.vaf_rules) return this.vaf_rules(substitutedText, vaf);
            if (rule === this.gj_rules) return this.gj_rules(substitutedText, vvf);
            return rule(substitutedText);
        }, substitutedText);

        return this.tags.reduce((text, tags) => text.replace(tags[0], tags[1]), finalText);
    }

    // Función de transcripción rápida para uso directo
    transcribir(texto) {
        return this.transcript(texto);
    }
}

module.exports = EPA;
module.exports.VAF = VAF;
module.exports.VVF = VVF;
