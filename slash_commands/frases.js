const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { transcribirEPA, transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frases')
        .setDescription('Mario Andaluz te dice frases típicas andaluzas EPA')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('Tipo de frase que quieres')
                .setRequired(false)
                .addChoices(
                    { name: 'Saludos', value: 'saludos' },
                    { name: 'Despedidas', value: 'despedidas' },
                    { name: 'Expresiones', value: 'expresiones' },
                    { name: 'Aleatorio', value: 'aleatorio' }
                )),

    async execute(interaction) {
        const tipo = interaction.options.getString('tipo') || 'aleatorio';

        const frases = {
            saludos: [
                '¡EPA! ¿Qué tal, colega?',
                '¡Hola, colega! ¿Cómo estás?',
                '¡Qué pasa, colega!',
                '¡EPA! ¿Cómo va la cosa?',
                '¡Hola, colega! ¿Qué cuentas?'
            ],
            despedidas: [
                '¡Hasta luego, colega! ¡Que vaya bien!',
                '¡Nos vemos, colega! ¡Que vaya todo genial!',
                '¡Hasta la próxima, colega!',
                '¡Que vaya bien, colega! ¡Nos vemos!',
                '¡Hasta luego! ¡Que vaya todo de puta madre!'
            ],
            expresiones: [
                '¡Eso es la hostia, colega!',
                '¡Cateto tú que no entiendê el andalûh!',
                '¡Aquí çe bibe de puta madre!',
                '¡EPA! ¡Qué paçá!',
                '¡Colega, eço êttá de luho!!',
                '¡EPA! ¡Qué chulo!',
                '¡Eso mola mogollón!'
            ],
            aleatorio: [
                '¡EPA! ¿Qué tal, colega?',
                '¡Hasta luego, colega! ¡Que vaya bien!',
                '¡Eso es la hostia, colega!',
                '¡Cateto tú que no entiendê el andalûh!',
                '¡Aquí çe bibe de puta madre!',
                '¡EPA! ¡Qué paçá!',
                '¡Colega, eço êttá de luho!',
                '¡Qué guay, colega!',
                '¡EPA! ¡Qué chulo!',
                '¡Colega, eso mola mogollón!',
                '¡Hola, colega! ¿Cómo estás?',
                '¡Qué pasa, colega!',
                '¡EPA! ¿Cómo va la cosa?',
                '¡Hola, colega! ¿Qué cuentas?',
                '¡Nos vemos, colega! ¡Que vaya todo genial!',
                '¡Hasta la próxima, colega!',
                '¡Que vaya bien, colega! ¡Nos vemos!',
                '¡Hasta luego! ¡Que vaya todo de puta madre!'
            ]
        };

        const frasesSeleccionadas = frases[tipo];
        const fraseAleatoria = transcribirEPA(frasesSeleccionadas[Math.floor(Math.random() * frasesSeleccionadas.length)]);

        const frasesEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🎯 Frase Andaluza EPA')
            .setDescription(fraseAleatoria)
            .addFields(
                { name: '📝 Tipo', value: tipo.charAt(0).toUpperCase() + tipo.slice(1), inline: true },
                { name: '🎯 Comando', value: '`/frases` para más frases', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: '¡EPA! ¡Frases andaluzas, colega!' });

        const embedTranscrito = transcribirEmbedEPA(frasesEmbed);
        await interaction.reply({ embeds: [embedTranscrito] });
    },
};
