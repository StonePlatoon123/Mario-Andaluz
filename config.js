const { EmbedBuilder } = require('discord.js');

// Configuración del bot Mario Andaluz
const config = {
    // Configuración básica
    bot: {
        name: 'Mario Andaluz',
        version: '1.0.0',
        description: 'Bot de Discord súper completo que habla andaluz EPA',
        prefix: '!',
        ownerId: process.env.OWNER_ID || 'tu_user_id_aqui'
    },

    // Configuración de colores para embeds
    colors: {
        primary: '#FFD700',      // Dorado
        success: '#00FF00',      // Verde
        error: '#FF0000',       // Rojo
        warning: '#FFA500',      // Naranja
        info: '#0099FF'          // Azul
    },

    // Configuración de transcripción
    transcription: {
        enabled: process.env.TRANSCRIPTION_ENABLED === 'true' || true,
        cooldown: parseInt(process.env.TRANSCRIPTION_COOLDOWN) || 3000,
        useLocalSystem: true, // Usar sistema local EPA
        timeout: 10000
    },

    // Configuración de webhooks
    webhooks: {
        enabled: process.env.WEBHOOK_ENABLED === 'true' || true,
        deleteAfter: parseInt(process.env.WEBHOOK_DELETE_AFTER) || 5000,
        maxWebhooks: 10
    },

    // Configuración de respuestas automáticas
    autoResponses: {
        enabled: true,
        cooldown: 5000,
        useEPA: true, // Usar transcripción EPA automática
        responses: [
            { trigger: /hola|hello|hi/i, response: '¡EPA! ¿Qué tal, colega? ¡Aquí está Mario Andaluz pa echarte una mano!' },
            { trigger: /gracias|thanks/i, response: '¡De ná, colega! ¡Pa eso estamos los andaluces, pa ayudarnos!' },
            { trigger: /adiós|bye|hasta luego/i, response: '¡Hasta luego, colega! ¡Que vaya bien y no te olvides de echarle ganas!' },
            { trigger: /bot|mario/i, response: '¡EPA! Aquí estoy, colega. ¿En qué te puedo ayudar?' },
            { trigger: /andaluz|andalucía/i, response: '¡Eso es! ¡Andalucía es la hostia, colega! ¡Aquí se vive de puta madre!' }
        ]
    },

    // Frases típicas andaluzas
    frases: {
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
            '¡Andalucía es la hostia!',
            '¡Aquí se vive de puta madre!',
            '¡EPA! ¡Qué pasada!',
            '¡Colega, eso está de lujo!',
            '¡Qué guay, colega!',
            '¡EPA! ¡Qué chulo!',
            '¡Colega, eso mola mogollón!'
        ]
    },

    // Configuración de actividades del bot
    activities: [
        { name: 'hablando andaluz EPA', type: 'Playing' },
        { name: 'transcribiendo al andaluz', type: 'Listening' },
        { name: 'ayudando a los colegas', type: 'Watching' },
        { name: 'disfrutando de Andalucía', type: 'Playing' },
        { name: 'echando una mano', type: 'Watching' }
    ],

    // Configuración de logs
    logging: {
        enabled: true,
        level: 'info',
        channels: {
            errors: 'bot-errors',
            commands: 'bot-commands',
            moderation: 'bot-moderation'
        }
    }
};

// Función para crear embeds con estilo andaluz
function createAndaluzEmbed(title, description, color = config.colors.primary) {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter({ text: '¡EPA! ¡Mario Andaluz a tu servicio, colega!' });
}

// Función para obtener frase aleatoria
function getRandomFrase(tipo = 'aleatorio') {
    const frases = config.frases[tipo] || config.frases.saludos;
    return frases[Math.floor(Math.random() * frases.length)];
}

// Función para formatear tiempo
function formatUptime(uptime) {
    const days = Math.floor(uptime / 86400000);
    const hours = Math.floor((uptime % 86400000) / 3600000);
    const minutes = Math.floor((uptime % 3600000) / 60000);
    const seconds = Math.floor((uptime % 60000) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
    config,
    createAndaluzEmbed,
    getRandomFrase,
    formatUptime
};
