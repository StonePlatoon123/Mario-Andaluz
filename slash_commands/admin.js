const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { transcribirEmbedEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Comandos de administración de Mario Andaluz')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('stats')
                .setDescription('Estadísticas del bot'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('reload')
                .setDescription('Recargar comandos del bot'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('webhook')
                .setDescription('Gestionar webhooks del servidor')
                .addStringOption(option =>
                    option.setName('accion')
                        .setDescription('Acción a realizar')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Listar', value: 'listar' },
                            { name: 'Limpiar', value: 'limpiar' }
                        ))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'stats') {
            const statsEmbed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('📊 Estadísticas de Mario Andaluz')
                .addFields(
                    { name: '🖥️ Servidores', value: `${interaction.client.guilds.cache.size}`, inline: true },
                    { name: '👥 Usuarios', value: `${interaction.client.users.cache.size}`, inline: true },
                    { name: '⚡ Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
                    { name: '💾 Memoria', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, inline: true },
                    { name: '⏰ Uptime', value: `${Math.floor(interaction.client.uptime / 1000 / 60)} minutos`, inline: true },
                    { name: '🎯 Comandos', value: `${interaction.client.commands.size}`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: '¡EPA! ¡Estadísticas del bot, colega!' });

            const embedTranscrito = transcribirEmbedEPA(statsEmbed);
            await interaction.reply({ embeds: [embedTranscrito] });

        } else if (subcommand === 'reload') {
            try {
                // Recargar comandos
                const fs = require('fs');
                const path = require('path');
                
                const commandsPath = path.join(__dirname, '..', 'slash_commands');
                const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
                
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(path.join(commandsPath, file))];
                }

                const reloadEmbed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('✅ Comandos recargados')
                    .setDescription('¡EPA! Los comandos han sido recargados correctamente, colega.')
                    .setTimestamp();

                const embedTranscrito = transcribirEmbedEPA(reloadEmbed);
                await interaction.reply({ embeds: [embedTranscrito] });

            } catch (error) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('❌ Error al recargar')
                    .setDescription('¡EPA! Ha habío un problemilla recargando los comandos, colega.')
                    .setTimestamp();

                const embedTranscrito = transcribirEmbedEPA(errorEmbed);
                await interaction.reply({ embeds: [embedTranscrito] });
            }

        } else if (subcommand === 'webhook') {
            const accion = interaction.options.getString('accion');

            if (accion === 'listar') {
                const webhooks = await interaction.guild.fetchWebhooks();
                
                const webhookEmbed = new EmbedBuilder()
                    .setColor('#FFD700')
                    .setTitle('🔗 Webhooks del servidor')
                    .setDescription(`Total de webhooks: ${webhooks.size}`)
                    .setTimestamp();

                if (webhooks.size > 0) {
                    const webhookList = webhooks.map(webhook => 
                        `• ${webhook.name} (${webhook.channel.name})`
                    ).join('\n');
                    
                    webhookEmbed.addFields({ name: '📋 Lista', value: webhookList, inline: false });
                } else {
                    webhookEmbed.addFields({ name: '📋 Lista', value: 'No hay webhooks en este servidor', inline: false });
                }

                const embedTranscrito = transcribirEmbedEPA(webhookEmbed);
                await interaction.reply({ embeds: [embedTranscrito] });

            } else if (accion === 'limpiar') {
                try {
                    const webhooks = await interaction.guild.fetchWebhooks();
                    let eliminados = 0;

                    for (const webhook of webhooks.values()) {
                        if (webhook.name.includes('Mario Andaluz') || webhook.name.includes('transcribir')) {
                            await webhook.delete('Limpieza de webhooks del bot');
                            eliminados++;
                        }
                    }

                    const limpiarEmbed = new EmbedBuilder()
                        .setColor('#00FF00')
                        .setTitle('✅ Webhooks limpiados')
                        .setDescription(`¡EPA! Se han eliminado ${eliminados} webhooks del bot, colega.`)
                        .setTimestamp();

                    const embedTranscrito = transcribirEmbedEPA(limpiarEmbed);
                    await interaction.reply({ embeds: [embedTranscrito] });

                } catch (error) {
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle('❌ Error al limpiar')
                        .setDescription('¡EPA! Ha habío un problemilla limpiando los webhooks, colega.')
                        .setTimestamp();

                    const embedTranscrito = transcribirEmbedEPA(errorEmbed);
                    await interaction.reply({ embeds: [embedTranscrito] });
                }
            }
        }
    },
};
