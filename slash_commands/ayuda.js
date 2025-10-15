const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { transcribirEPA, transcribirEmbedEPA, transcribirSelectOptionsEPA } = require('../epa-auto-transcriber');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ayuda')
        .setDescription('Sistema de ayuda interactivo de Mario Andaluz'),

    async execute(interaction) {
        // Crear menú de selección
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ayuda_menu')
            .setPlaceholder('Selecciona una categoría de ayuda')
            .addOptions(transcribirSelectOptionsEPA([
                {
                    label: '🎯 Comandos Principales',
                    description: 'Comandos básicos del bot',
                    value: 'comandos_principales'
                },
                {
                    label: '🛠️ Comandos de Utilidades',
                    description: 'Herramientas útiles',
                    value: 'comandos_utilidades'
                },
                {
                    label: '🔧 Comandos de Administración',
                    description: 'Comandos para administradores',
                    value: 'comandos_admin'
                },
                {
                    label: '💬 Respuestas Automáticas',
                    description: 'Cómo funciona el sistema de respuestas',
                    value: 'respuestas_automaticas'
                },
                {
                    label: '🔗 Sistema de Webhooks',
                    description: 'Información sobre webhooks',
                    value: 'sistema_webhooks'
                },
                {
                    label: '❓ Solución de Problemas',
                    description: 'Ayuda con problemas comunes',
                    value: 'solucion_problemas'
                }
            ]));

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const ayudaEmbed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🎯 Sistema de Ayuda - Mario Andaluz')
            .setDescription('¡EPA! Selecciona una categoría para obtener ayuda detallada, colega.')
            .addFields(
                { name: '🎯 Comandos Principales', value: '`/transcribir`, `/saludo`, `/frases`, `/info`', inline: true },
                { name: '🛠️ Utilidades', value: '`/utilidades`, `/estadisticas`, `/ayuda`', inline: true },
                { name: '🔧 Administración', value: '`/admin` (requiere permisos)', inline: true }
            )
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: '¡EPA! ¡Ayuda disponible, colega!' });

        const embedTranscrito = transcribirEmbedEPA(ayudaEmbed);
        await interaction.reply({ embeds: [embedTranscrito], components: [row] });

        // Manejar la selección del menú
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'ayuda_menu') {
                const value = i.values[0];
                let embedResponse;

                switch (value) {
                    case 'comandos_principales':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('🎯 Comandos Principales')
                            .setDescription('Comandos básicos de Mario Andaluz')
                            .addFields(
                                { name: '`/transcribir`', value: 'Convierte texto al andaluz EPA usando la API de AndaluGeeks\n**Opciones:** texto (requerido), webhook (opcional)', inline: false },
                                { name: '`/saludo`', value: 'Saludo personalizado en andaluz\n**Opciones:** nombre (opcional)', inline: false },
                                { name: '`/frases`', value: 'Frases típicas andaluzas\n**Opciones:** tipo (saludos, despedidas, expresiones, aleatorio)', inline: false },
                                { name: '`/info`', value: 'Información completa del bot y sus funcionalidades', inline: false }
                            )
                            .setTimestamp();
                        break;

                    case 'comandos_utilidades':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('🛠️ Comandos de Utilidades')
                            .setDescription('Herramientas útiles del bot')
                            .addFields(
                                { name: '`/utilidades ping`', value: 'Comprobar la latencia del bot', inline: false },
                                { name: '`/utilidades avatar`', value: 'Ver el avatar de un usuario\n**Opciones:** usuario (opcional)', inline: false },
                                { name: '`/utilidades servidor`', value: 'Información detallada del servidor', inline: false },
                                { name: '`/estadisticas`', value: 'Estadísticas completas del servidor y bot', inline: false }
                            )
                            .setTimestamp();
                        break;

                    case 'comandos_admin':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('🔧 Comandos de Administración')
                            .setDescription('Comandos para administradores (requiere permisos)')
                            .addFields(
                                { name: '`/admin stats`', value: 'Estadísticas del bot (servidores, usuarios, memoria, etc.)', inline: false },
                                { name: '`/admin reload`', value: 'Recargar comandos del bot', inline: false },
                                { name: '`/admin webhook listar`', value: 'Listar webhooks del servidor', inline: false },
                                { name: '`/admin webhook limpiar`', value: 'Limpiar webhooks del bot', inline: false }
                            )
                            .setTimestamp();
                        break;

                    case 'respuestas_automaticas':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('💬 Respuestas Automáticas')
                            .setDescription('Cómo funciona el sistema de respuestas automáticas')
                            .addFields(
                                { name: '🎯 Palabras clave', value: 'hola, hello, hi, gracias, thanks, adiós, bye, bot, mario, andaluz, andalucía', inline: false },
                                { name: '⚡ Funcionamiento', value: 'El bot responde automáticamente cuando detecta estas palabras en los mensajes', inline: false },
                                { name: '⏰ Cooldown', value: '5 segundos entre respuestas para evitar spam', inline: false },
                                { name: '🔧 Personalización', value: 'Puedes modificar las respuestas en el archivo config.js', inline: false }
                            )
                            .setTimestamp();
                        break;

                    case 'sistema_webhooks':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('🔗 Sistema de Webhooks')
                            .setDescription('Información sobre el sistema de webhooks para transcripciones')
                            .addFields(
                                { name: '🎯 Propósito', value: 'Las transcripciones se envían como webhooks simulando al usuario', inline: false },
                                { name: '🔒 Privacidad', value: 'El comando no deja rastro visible, solo la transcripción', inline: false },
                                { name: '⏰ Duración', value: 'Los webhooks se eliminan automáticamente después de 5 segundos', inline: false },
                                { name: '🛠️ Configuración', value: 'Puedes desactivar webhooks usando la opción webhook:false', inline: false }
                            )
                            .setTimestamp();
                        break;

                    case 'solucion_problemas':
                        embedResponse = new EmbedBuilder()
                            .setColor('#FFD700')
                            .setTitle('❓ Solución de Problemas')
                            .setDescription('Ayuda con problemas comunes')
                            .addFields(
                                { name: '❌ Error de API Key', value: 'Verifica tu API key de AndaluGeeks en el archivo .env', inline: false },
                                { name: '❌ Comandos no aparecen', value: 'Ejecuta `node deploy-commands.js` y espera unos minutos', inline: false },
                                { name: '❌ Webhooks no funcionan', value: 'Verifica que el bot tenga permisos de gestión de webhooks', inline: false },
                                { name: '❌ Bot no responde', value: 'Revisa los logs del bot y verifica la configuración', inline: false }
                            )
                            .setTimestamp();
                        break;
                }

                await i.update({ embeds: [embedResponse], components: [row] });
            }
        });

        collector.on('end', async () => {
            const timeoutEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('⏰ Tiempo agotado')
                .setDescription('El menú de ayuda ha expirado. Usa `/ayuda` para abrirlo de nuevo.')
                .setTimestamp();

            try {
                await interaction.editReply({ embeds: [timeoutEmbed], components: [] });
            } catch (error) {
                console.log('No se pudo actualizar el mensaje de ayuda:', error.message);
            }
        });
    },
};
