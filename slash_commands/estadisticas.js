const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('estadisticas')
        .setDescription('Estadísticas detalladas del servidor y el bot'),

    async execute(interaction) {
        const guild = interaction.guild;
        const bot = interaction.client;

        // Obtener estadísticas del servidor
        const totalMembers = guild.memberCount;
        const onlineMembers = guild.members.cache.filter(member => member.presence?.status === 'online').size;
        const idleMembers = guild.members.cache.filter(member => member.presence?.status === 'idle').size;
        const dndMembers = guild.members.cache.filter(member => member.presence?.status === 'dnd').size;
        const offlineMembers = totalMembers - onlineMembers - idleMembers - dndMembers;

        // Obtener estadísticas de canales
        const totalChannels = guild.channels.cache.size;
        const textChannels = guild.channels.cache.filter(channel => channel.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2).size;
        const categoryChannels = guild.channels.cache.filter(channel => channel.type === 4).size;

        // Obtener estadísticas de roles
        const totalRoles = guild.roles.cache.size;
        const managedRoles = guild.roles.cache.filter(role => role.managed).size;

        // Obtener estadísticas del bot
        const botUptime = Math.floor(bot.uptime / 1000);
        const botMemory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        const botPing = bot.ws.ping;

        // Crear embed con estadísticas
        const statsEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('📊 Estadísticas del Servidor y Bot')
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: '👥 Miembros del Servidor',
                    value: `**Total:** ${totalMembers}\n**🟢 Online:** ${onlineMembers}\n**🟡 Ausente:** ${idleMembers}\n**🔴 No molestar:** ${dndMembers}\n**⚫ Desconectados:** ${offlineMembers}`,
                    inline: true
                },
                {
                    name: '📺 Canales',
                    value: `**Total:** ${totalChannels}\n**💬 Texto:** ${textChannels}\n**🔊 Voz:** ${voiceChannels}\n**📁 Categorías:** ${categoryChannels}`,
                    inline: true
                },
                {
                    name: '🎭 Roles',
                    value: `**Total:** ${totalRoles}\n**🤖 Gestionados:** ${managedRoles}\n**👑 Humanos:** ${totalRoles - managedRoles}`,
                    inline: true
                },
                {
                    name: '🤖 Bot - Mario Andaluz',
                    value: `**⚡ Ping:** ${botPing}ms\n**💾 Memoria:** ${botMemory}MB\n**⏰ Uptime:** ${Math.floor(botUptime / 3600)}h ${Math.floor((botUptime % 3600) / 60)}m\n**🖥️ Servidores:** ${bot.guilds.cache.size}`,
                    inline: true
                },
                {
                    name: '📅 Información del Servidor',
                    value: `**👑 Propietario:** <@${guild.ownerId}>\n**📅 Creado:** <t:${Math.floor(guild.createdTimestamp / 1000)}:R>\n**🆔 ID:** ${guild.id}`,
                    inline: true
                },
                {
                    name: '🔒 Seguridad',
                    value: `**🛡️ Nivel de verificación:** ${guild.verificationLevel}\n**🚫 Filtro de contenido:** ${guild.explicitContentFilter}\n**🔐 2FA requerido:** ${guild.mfaLevel === 1 ? 'Sí' : 'No'}`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: '¡EPA! ¡Estadísticas completas, colega!' });

        const embedTranscrito = transcribirEmbedEPA(statsEmbed);
        await interaction.reply({ embeds: [embedTranscrito] });
    },
};
