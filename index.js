const { Client, GatewayIntentBits, Collection, Events, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { transcribirEPA } = require('./epa-auto-transcriber');
require('dotenv').config();

// Función para verificar configuración automáticamente
function checkConfiguration() {
    const requiredVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
    const missingVars = [];
    
    for (const varName of requiredVars) {
        if (!process.env[varName] || process.env[varName].includes('tu_')) {
            missingVars.push(varName);
        }
    }
    
    if (missingVars.length > 0) {
        console.log('❌ Configuración incompleta detectada');
        console.log(`⚠️  Variables faltantes: ${missingVars.join(', ')}`);
        console.log('🔄 Ejecuta "npm run setup" para configurar automáticamente');
        console.log('💡 O edita el archivo .env manualmente');
        process.exit(1);
    }
    
    console.log('✅ Configuración verificada correctamente');
}

// Verificar configuración antes de iniciar
checkConfiguration();

// Crear el cliente del bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks
    ]
});

// Colección para comandos
client.commands = new Collection();

// Cargar comandos slash
const commandsPath = path.join(__dirname, 'slash_commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`✅ Comando cargado: ${command.data.name}`);
        } else {
            console.log(`⚠️ El comando en ${filePath} no tiene las propiedades requeridas.`);
        }
    }
}

// Cargar eventos
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        console.log(`✅ Evento cargado: ${event.name}`);
    }
}

// Evento de interacción de comandos slash
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`❌ No se encontró el comando: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Error ejecutando comando ${interaction.commandName}:`, error);
        
        const errorMessage = {
            content: '¡EPA! Ha habío un problemilla ejecutando ese comando, colega. ¡Inténtalo otra vez!',
            ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Evento de mensajes para respuestas automáticas en andaluz
client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    
    // Respuestas automáticas en andaluz (se transcriben automáticamente con EPA)
    const responses = [
        { trigger: /hola|hello|hi/i, response: '¡EPA! ¿Qué tal, colega? ¡Aquí está Mario Andaluz pa echarte una mano!' },
        { trigger: /gracias|thanks/i, response: '¡De ná, colega! ¡Pa eso estamos los andaluces, pa ayudarnos!' },
        { trigger: /adiós|bye|hasta luego/i, response: '¡Hasta luego, colega! ¡Que vaya bien y no te olvides de echarle ganas!' },
        { trigger: /bot|mario/i, response: '¡EPA! Aquí estoy, colega. ¿En qué te puedo ayudar?' },
        { trigger: /andaluz|andalucía/i, response: '¡Eso es! ¡Andalucía es la hostia, colega! ¡Aquí se vive de puta madre!' }
    ];

    for (const { trigger, response } of responses) {
        if (trigger.test(message.content)) {
            const respuestaTranscrita = transcribirEPA(response);
            await message.reply(respuestaTranscrita);
            break;
        }
    }
});

// Manejo de errores
process.on('unhandledRejection', error => {
    console.error('❌ Error no manejado:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Excepción no capturada:', error);
});

// Iniciar el bot
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log('🚀 ¡Mario Andaluz está listo pa la acción!');
}).catch(error => {
    console.error('❌ Error iniciando el bot:', error);
});
