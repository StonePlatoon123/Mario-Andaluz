const { Events, EmbedBuilder } = require('discord.js');
const { transcribirEPA, transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        // Mensaje de bienvenida en andaluz (se transcribe automáticamente con EPA)
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('¡EPA! ¡Bienvenío, colega!')
            .setDescription(`¡Hola ${member.user.username}! ¡Bienvenío al servidor, colega!`)
            .addFields(
                { name: '👋 Saludo', value: '¡Aquí está Mario Andaluz pa darte la bienvenida!' },
                { name: '🎯 ¿Qué puedes hacer?', value: 'Usa `/transcribir` pa convertir cualquier texto al andaluz EPA' },
                { name: '💬 ¿Necesitas ayuda?', value: '¡Pregúntame lo que quieras, colega!' }
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: '¡Que vaya bien por aquí, colega!' });

        const embedTranscrito = transcribirEmbedEPA(welcomeEmbed);

        // Buscar canal de bienvenida
        const welcomeChannel = member.guild.channels.cache.find(channel => 
            channel.name.includes('bienvenida') || 
            channel.name.includes('welcome') ||
            channel.name.includes('general')
        );

        if (welcomeChannel) {
            try {
                await welcomeChannel.send({ embeds: [embedTranscrito] });
            } catch (error) {
                console.error('Error enviando mensaje de bienvenida:', error);
            }
        }

        // Mensaje directo al usuario
        try {
            const dmEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('¡EPA! ¡Bienvenío al servidor!')
                .setDescription('¡Hola, colega! Soy Mario Andaluz, tu bot andaluz de confianza.')
                .addFields(
                    { name: '🎯 Comandos principales', value: '`/transcribir` - Convierte texto al andaluz EPA' },
                    { name: '💬 Respuestas automáticas', value: 'Solo escribe "hola" o "mario" y te responderé' },
                    { name: '🤝 Ayuda', value: 'Si necesitas ayuda, pregúntame directamente' }
                )
                .setTimestamp()
                .setFooter({ text: '¡Que vaya bien por aquí, colega!' });

            const dmEmbedTranscrito = transcribirEmbedEPA(dmEmbed);
            await member.send({ embeds: [dmEmbedTranscrito] });
        } catch (error) {
            console.log('No se pudo enviar DM al usuario:', error.message);
        }
    },
};
