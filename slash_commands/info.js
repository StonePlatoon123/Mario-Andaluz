const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Información sobre Mario Andaluz y sus funcionalidades'),

    async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🎯 Mario Andaluz - Bot de Discord EPA')
            .setDescription('¡EPA! Soy Mario Andaluz, tu bot andaluz de confianza. ¡Aquí estoy pa echarte una mano!')
            .addFields(
                { 
                    name: '🎯 Comandos principales', 
                    value: '`/transcribir` - Convierte texto al andaluz EPA\n`/saludo` - Saludo personalizado\n`/frases` - Frases típicas andaluzas\n`/info` - Esta información', 
                    inline: false 
                },
                { 
                    name: '💬 Funcionalidades', 
                    value: '• Transcripción automática al andaluz EPA\n• Respuestas automáticas en andaluz\n• Sistema de webhooks para transcripciones\n• Saludos y frases típicas\n• Bienvenidas automáticas', 
                    inline: false 
                },
                { 
                    name: '🔧 Tecnologías', 
                    value: '• Discord.js v14\n• API de AndaluGeeks\n• Sistema de webhooks\n• Respuestas automáticas', 
                    inline: false 
                },
                { 
                    name: '🤝 ¿Necesitas ayuda?', 
                    value: 'Solo escribe "hola" o "mario" y te responderé automáticamente. ¡También puedes usar los comandos slash!', 
                    inline: false 
                }
            )
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: '¡EPA! ¡Mario Andaluz a tu servicio, colega!' });

        const embedTranscrito = transcribirEmbedEPA(infoEmbed);
        await interaction.reply({ embeds: [embedTranscrito] });
    },
};
