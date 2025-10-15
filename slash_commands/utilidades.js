const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('utilidades')
        .setDescription('Utilidades varias de Mario Andaluz')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Comprobar la latencia del bot'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Ver el avatar de un usuario')
                .addUserOption(option =>
                    option.setName('usuario')
                        .setDescription('Usuario del que quieres ver el avatar')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('servidor')
                .setDescription('Información del servidor')),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'ping') {
            const sent = await interaction.reply({ content: '🏓 Calculando ping...', fetchReply: true });
            const ping = sent.createdTimestamp - interaction.createdTimestamp;

            const pingEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('🏓 Ping de Mario Andaluz')
                .addFields(
                    { name: '⚡ Latencia del bot', value: `${ping}ms`, inline: true },
                    { name: '🌐 Latencia de Discord', value: `${interaction.client.ws.ping}ms`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: '¡EPA! ¡Ping calculado, colega!' });

            const embedTranscrito = transcribirEmbedEPA(pingEmbed);
            await interaction.editReply({ content: '', embeds: [embedTranscrito] });

        } else if (subcommand === 'avatar') {
            const usuario = interaction.options.getUser('usuario') || interaction.user;

            const avatarEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle(`🖼️ Avatar de ${usuario.username}`)
                .setImage(usuario.displayAvatarURL({ size: 512 }))
                .addFields(
                    { name: '👤 Usuario', value: usuario.tag, inline: true },
                    { name: '🆔 ID', value: usuario.id, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: '¡EPA! ¡Avatar mostrado, colega!' });

            const embedTranscrito = transcribirEmbedEPA(avatarEmbed);
            await interaction.reply({ embeds: [embedTranscrito] });

        } else if (subcommand === 'servidor') {
            const guild = interaction.guild;

            const servidorEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle(`🏰 Información de ${guild.name}`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    { name: '👑 Propietario', value: `<@${guild.ownerId}>`, inline: true },
                    { name: '👥 Miembros', value: `${guild.memberCount}`, inline: true },
                    { name: '📅 Creado', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                    { name: '🆔 ID', value: guild.id, inline: true },
                    { name: '🌍 Región', value: guild.preferredLocale || 'No especificada', inline: true },
                    { name: '📊 Nivel de verificación', value: guild.verificationLevel.toString(), inline: true }
                )
                .setTimestamp()
                .setFooter({ text: '¡EPA! ¡Información del servidor, colega!' });

            const embedTranscrito = transcribirEmbedEPA(servidorEmbed);
            await interaction.reply({ embeds: [embedTranscrito] });
        }
    },
};
