const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Función para imprimir con colores
function print(color, text) {
    console.log(`${color}${text}${colors.reset}`);
}

// Función para crear interfaz de lectura
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// Función para hacer pregunta
function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// Función para verificar si existe archivo .env
function checkEnvFile() {
    return fs.existsSync('.env');
}

// Función para crear archivo .env automáticamente
async function createEnvFile() {
    print(colors.cyan, '\nMario Andaluz Bot - Configuración Automática');
    print(colors.yellow, '===============================================');
    print(colors.green, '¡EPA! Vamos a configurar tu bot automáticamente, colega!\n');

    const rl = createInterface();

    try {
        // Verificar si ya existe .env
        if (checkEnvFile()) {
            print(colors.yellow, 'Ya existe un archivo .env');
            print(colors.cyan, 'Ubicación: .env');
            const overwrite = await askQuestion(rl, '¿Quieres sobrescribirlo? (y/n): ');
            if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
                print(colors.green, 'Manteniendo configuración existente');
                rl.close();
                return true;
            }
        }

        print(colors.blue, 'Configurando variables de entorno...\n');

        // Solicitar información del usuario
        const discordToken = await askQuestion(rl, 'Token del bot de Discord: ');
        const clientId = await askQuestion(rl, 'Client ID de Discord: ');
        const guildId = await askQuestion(rl, 'Guild ID (opcional, presiona Enter para omitir): ');
        const ownerId = await askQuestion(rl, 'Owner ID (opcional, presiona Enter para omitir): ');

        // Crear contenido del archivo .env
        const envContent = `# Configuración del Bot Mario Andaluz
# ¡EPA! Variables de entorno configuradas automáticamente

# Discord Bot Configuration
DISCORD_TOKEN=${discordToken}
CLIENT_ID=${clientId}
${guildId ? `GUILD_ID=${guildId}` : '# GUILD_ID=tu_guild_id_aqui'}
${ownerId ? `OWNER_ID=${ownerId}` : '# OWNER_ID=tu_user_id_aqui'}

# Bot Configuration
PREFIX=!
WEBHOOK_ENABLED=true
WEBHOOK_DELETE_AFTER=5000
TRANSCRIPTION_ENABLED=true
TRANSCRIPTION_COOLDOWN=3000

# ¡EPA! ¡Configuración completada, colega!
# El sistema EPA funciona completamente local, sin API externa
`;

        // Escribir archivo .env
        fs.writeFileSync('.env', envContent);

        print(colors.green, '\nArchivo .env creado correctamente');
        print(colors.cyan, 'Ubicación: .env');
        
        rl.close();
        return true;

    } catch (error) {
        print(colors.red, `❌ Error creando archivo .env: ${error.message}`);
        rl.close();
        return false;
    }
}

// Función para verificar dependencias
function checkDependencies() {
    print(colors.blue, '\n📦 Verificando dependencias...');
    
    if (!fs.existsSync('node_modules')) {
        print(colors.yellow, 'Dependencias no instaladas');
        print(colors.cyan, 'Instalando dependencias automáticamente...');
        
        const { execSync } = require('child_process');
        try {
            execSync('npm install', { stdio: 'inherit' });
            print(colors.green, 'Dependencias instaladas correctamente');
            return true;
        } catch (error) {
            print(colors.red, `Error instalando dependencias: ${error.message}`);
            return false;
        }
    } else {
        print(colors.green, 'Dependencias ya instaladas');
        return true;
    }
}

// Función para registrar comandos automáticamente
function registerCommands() {
    print(colors.blue, '\nRegistrando comandos slash...');
    
    try {
        const { execSync } = require('child_process');
        execSync('node deploy-commands.js', { stdio: 'inherit' });
        print(colors.green, 'Comandos slash registrados correctamente');
        return true;
    } catch (error) {
        print(colors.red, `Error registrando comandos: ${error.message}`);
        return false;
    }
}

// Función para verificar configuración
function verifyConfiguration() {
    print(colors.blue, '\nVerificando configuración...');
    
    if (!checkEnvFile()) {
        print(colors.red, 'Archivo .env no encontrado');
        return false;
    }

    // Leer archivo .env
    const envContent = fs.readFileSync('.env', 'utf8');
    
    const requiredVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
    const missingVars = [];

    for (const varName of requiredVars) {
        if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=tu_`)) {
            missingVars.push(varName);
        }
    }

    if (missingVars.length > 0) {
        print(colors.red, `Variables faltantes: ${missingVars.join(', ')}`);
        return false;
    }

    print(colors.green, 'Configuración verificada correctamente');
    return true;
}

// Función para mostrar información de ayuda
function showHelp() {
    print(colors.cyan, '\nMario Andaluz Bot - Información de Ayuda');
    print(colors.yellow, '==========================================');
    print(colors.green, '¡EPA! Aquí tienes la información que necesitas, colega!\n');
    
    print(colors.blue, 'Cómo obtener el Token de Discord:');
    print(colors.white, '1. Ve a https://discord.com/developers/applications');
    print(colors.white, '2. Crea una nueva aplicación');
    print(colors.white, '3. Ve a "Bot" → "Token" → Copia el token\n');
    
    print(colors.blue, 'Cómo obtener el Client ID:');
    print(colors.white, '1. En la misma página de Discord Developer');
    print(colors.white, '2. Ve a "General Information" → Copia "Application ID"\n');
    
    print(colors.blue, 'Cómo obtener la API Key de AndaluGeeks:');
    print(colors.white, '1. Ve a https://andalugeeks.com/api');
    print(colors.white, '2. Regístrate y obtén tu API key');
    print(colors.white, '3. Asegúrate de tener permisos de transcripción\n');
    
    print(colors.blue, 'Guild ID (opcional):');
    print(colors.white, '1. Habilita "Modo desarrollador" en Discord');
    print(colors.white, '2. Click derecho en tu servidor → "Copiar ID"\n');
    
    print(colors.blue, 'Owner ID (opcional):');
    print(colors.white, '1. Habilita "Modo desarrollador" en Discord');
    print(colors.white, '2. Click derecho en tu perfil → "Copiar ID"\n');
}

// Función principal
async function main() {
    print(colors.cyan, 'Mario Andaluz Bot - Setup Automático');
    print(colors.yellow, '=====================================');
    print(colors.green, '¡EPA! Configurando todo automáticamente, colega!\n');

    // Verificar si ya está configurado
    if (checkEnvFile() && verifyConfiguration()) {
        print(colors.green, 'El bot ya está configurado correctamente');
        
        // Verificar dependencias
        if (!checkDependencies()) {
            process.exit(1);
        }
        
        // Registrar comandos
        if (!registerCommands()) {
            process.exit(1);
        }
        
        print(colors.green, '\n¡Todo listo! Ejecuta "npm start" para iniciar el bot');
        return;
    }

    // Mostrar ayuda si es necesario
    const args = process.argv.slice(2);
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }

    // Configurar automáticamente
    print(colors.yellow, 'Configuración incompleta detectada');
    print(colors.cyan, 'Iniciando configuración automática...\n');

    // Crear archivo .env
    if (!await createEnvFile()) {
        print(colors.red, 'Error en la configuración');
        process.exit(1);
    }

    // Verificar dependencias
    if (!checkDependencies()) {
        process.exit(1);
    }

    // Registrar comandos
    if (!registerCommands()) {
        process.exit(1);
    }

    // Verificar configuración final
    if (!verifyConfiguration()) {
        print(colors.red, 'Configuración incompleta');
        print(colors.yellow, 'Ejecuta "npm run setup" para reconfigurar');
        process.exit(1);
    }

    print(colors.green, '\n¡EPA! ¡Configuración completada exitosamente!');
    print(colors.cyan, 'El bot está listo para iniciar');
    print(colors.yellow, 'Ejecuta "npm start" para iniciar Mario Andaluz');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(error => {
        print(colors.red, `Error fatal: ${error.message}`);
        process.exit(1);
    });
}

module.exports = { main, createEnvFile, checkDependencies, registerCommands, verifyConfiguration };
