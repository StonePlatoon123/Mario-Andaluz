const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`¡EPA! Mario Andaluz está conectao como ${client.user.tag}!`);
        
        // Establecer actividad del bot
        client.user.setActivity('hablando andaluz EPA', { type: ActivityType.Playing });
        
        // Cambiar actividad cada 30 segundos
        const activities = [
            { name: 'hablando andaluz EPA', type: ActivityType.Playing },
            { name: 'transcribiendo al andaluz', type: ActivityType.Listening },
            { name: 'ayudando a los colegas', type: ActivityType.Watching },
            { name: 'disfrutando de Andalucía', type: ActivityType.Playing },
            { name: 'echando una mano', type: ActivityType.Watching }
        ];
        
        let currentActivity = 0;
        setInterval(() => {
            const activity = activities[currentActivity];
            client.user.setActivity(activity.name, { type: activity.type });
            currentActivity = (currentActivity + 1) % activities.length;
        }, 30000);
        
        console.log('🎯 Actividades del bot configuradas');
        console.log(`📊 Conectado a ${client.guilds.cache.size} servidores`);
        console.log(`👥 Sirviendo a ${client.users.cache.size} usuarios`);
    },
};
