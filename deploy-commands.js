const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];

// Cargar comandos
const commandsPath = path.join(__dirname, 'slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`✅ Comando registrado: ${command.data.name}`);
    } else {
        console.log(`⚠️ El comando en ${filePath} no tiene las propiedades requeridas.`);
    }
}

// Crear instancia REST
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Registrar comandos
(async () => {
    try {
        console.log(`🔄 Registrando ${commands.length} comandos slash...`);

        let data;
        
        if (process.env.GUILD_ID) {
            // Registro en servidor específico (desarrollo)
            data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
            );
            console.log(`✅ Comandos registrados en servidor específico: ${data.length}`);
        } else {
            // Registro global
            data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
            console.log(`✅ Comandos registrados globalmente: ${data.length}`);
        }

        console.log('🎯 ¡Todos los comandos han sido registrados correctamente!');
        
    } catch (error) {
        console.error('❌ Error registrando comandos:', error);
    }
})();
