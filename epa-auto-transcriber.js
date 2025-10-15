/**
 * Sistema de Transcripción Automática EPA para Mario Andaluz
 * ¡EPA! Todas las respuestas del bot se transcriben automáticamente, colega!
 */

const EPA = require('./epa-transcriber');

class EPAAutoTranscriber {
    constructor() {
        this.epa = new EPA();
        this.enabled = true;
    }

    // Función principal para transcribir automáticamente
    transcribir(texto) {
        if (!this.enabled || !texto) return texto;
        
        try {
            return this.epa.transcribir(texto);
        } catch (error) {
            console.error('Error en transcripción automática:', error);
            return texto; // Devolver texto original si hay error
        }
    }

    // Función para transcribir objetos de embed
    transcribirEmbed(embed) {
        if (!this.enabled || !embed) return embed;

        try {
            // Transcribir título
            if (embed.title) {
                embed.title = this.transcribir(embed.title);
            }

            // Transcribir descripción
            if (embed.description) {
                embed.description = this.transcribir(embed.description);
            }

            // Transcribir campos
            if (embed.fields && Array.isArray(embed.fields)) {
                embed.fields = embed.fields.map(field => ({
                    ...field,
                    name: this.transcribir(field.name),
                    value: this.transcribir(field.value)
                }));
            }

            // Transcribir footer
            if (embed.footer && embed.footer.text) {
                embed.footer.text = this.transcribir(embed.footer.text);
            }

            return embed;
        } catch (error) {
            console.error('Error transcribiendo embed:', error);
            return embed;
        }
    }

    // Función para transcribir arrays de embeds
    transcribirEmbeds(embeds) {
        if (!this.enabled || !embeds) return embeds;
        
        if (Array.isArray(embeds)) {
            return embeds.map(embed => this.transcribirEmbed(embed));
        } else {
            return this.transcribirEmbed(embeds);
        }
    }

    // Función para transcribir opciones de select menu
    transcribirSelectOptions(options) {
        if (!this.enabled || !options) return options;
        
        return options.map(option => ({
            ...option,
            label: this.transcribir(option.label),
            description: option.description ? this.transcribir(option.description) : option.description
        }));
    }

    // Habilitar/deshabilitar transcripción automática
    setEnabled(enabled) {
        this.enabled = enabled;
        console.log(`🎯 Transcripción automática EPA: ${enabled ? 'habilitada' : 'deshabilitada'}`);
    }

    // Obtener estado
    isEnabled() {
        return this.enabled;
    }
}

// Instancia global del transcriber
const epaTranscriber = new EPAAutoTranscriber();

// Función helper para usar en todo el bot
function transcribirEPA(texto) {
    return epaTranscriber.transcribir(texto);
}

function transcribirEmbedEPA(embed) {
    return epaTranscriber.transcribirEmbed(embed);
}

function transcribirEmbedsEPA(embeds) {
    return epaTranscriber.transcribirEmbeds(embeds);
}

function transcribirSelectOptionsEPA(options) {
    return epaTranscriber.transcribirSelectOptions(options);
}

module.exports = {
    EPAAutoTranscriber,
    epaTranscriber,
    transcribirEPA,
    transcribirEmbedEPA,
    transcribirEmbedsEPA,
    transcribirSelectOptionsEPA
};
