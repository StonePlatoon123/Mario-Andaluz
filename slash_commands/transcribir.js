const { SlashCommandBuilder, EmbedBuilder, WebhookClient } = require('discord.js');
const EPA = require('../epa-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transcribir')
        .setDescription('Transcribe cualquier texto al andaluz EPA usando el sistema local')
        .addStringOption(option =>
            option.setName('texto')
                .setDescription('El texto que quieres transcribir al andaluz')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('webhook')
                .setDescription('Enviar como webhook simulando al usuario (por defecto: true)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const texto = interaction.options.getString('texto');
        const usarWebhook = interaction.options.getBoolean('webhook') ?? true;

        try {
            // Usar sistema local de transcripción EPA
            const epa = new EPA();
            const textoTranscrito = epa.transcribir(texto);

            if (usarWebhook) {
                // Crear webhook temporal
                const webhook = await interaction.channel.createWebhook({
                    name: interaction.user.username,
                    avatar: interaction.user.displayAvatarURL(),
                    reason: 'Transcripción al andaluz EPA'
                });

                // Enviar mensaje como webhook
                const webhookClient = new WebhookClient({ url: webhook.url });
                
                await webhookClient.send({
                    content: textoTranscrito,
                    username: interaction.user.username,
                    avatarURL: interaction.user.displayAvatarURL()
                });

                // Eliminar webhook después de un tiempo
                setTimeout(async () => {
                    try {
                        await webhook.delete('Transcripción completada');
                    } catch (error) {
                        console.log('No se pudo eliminar el webhook:', error.message);
                    }
                }, 5000);

                // Respuesta privada confirmando la transcripción
                const confirmEmbed = new EmbedBuilder()
                    .setColor('#FFD700')
                    .setTitle('✅ ¡Transcripción completada!')
                    .setDescription('Tu texto ha sido transcrito al andaluz EPA y enviado como webhook.')
                    .addFields(
                        { name: '📝 Texto original', value: texto, inline: false },
                        { name: '🎯 Texto transcrito', value: textoTranscrito, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: '¡EPA! ¡Transcripción completada, colega!' });

                await interaction.editReply({ embeds: [confirmEmbed] });

            } else {
                // Enviar respuesta normal
                const transcribirEmbed = new EmbedBuilder()
                    .setColor('#FFD700')
                    .setTitle('🎯 Transcripción al Andaluz EPA')
                    .setDescription('¡Aquí tienes tu texto transcrito, colega!')
                    .addFields(
                        { name: '📝 Texto original', value: texto, inline: false },
                        { name: '🎯 Texto transcrito', value: textoTranscrito, inline: false }
                    )
                    .setTimestamp()
                    .setFooter({ text: '¡EPA! ¡Transcripción completada, colega!' });

                await interaction.editReply({ embeds: [transcribirEmbed] });
            }

        } catch (error) {
            console.error('Error en transcripción:', error);
            
            const errorMessage = '¡EPA! Ha habío un problemilla con la transcripción, colega.';

            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('❌ Error en la transcripción')
                .setDescription(errorMessage)
                .addFields(
                    { name: '🔧 Solución', value: 'Inténtalo otra vez en un momento, colega.' }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
