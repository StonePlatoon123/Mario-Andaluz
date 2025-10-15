const fs = require('fs');
const path = require('path');

// Sistema de configuración automática súper inteligente
class AutoConfig {
    constructor() {
        this.colors = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m'
        };
    }

    // Función para imprimir con colores
    print(color, text) {
        console.log(`${color}${text}${this.colors.reset}`);
    }

    // Verificar si existe archivo .env
    checkEnvFile() {
        return fs.existsSync('.env');
    }

    // Verificar configuración completa
    verifyConfiguration() {
        if (!this.checkEnvFile()) {
            return { valid: false, missing: ['archivo .env'] };
        }

        const envContent = fs.readFileSync('.env', 'utf8');
        const requiredVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
        const missingVars = [];

        for (const varName of requiredVars) {
            if (!envContent.includes(`${varName}=`) || 
                envContent.includes(`${varName}=tu_`) ||
                envContent.includes(`${varName}=your_`)) {
                missingVars.push(varName);
            }
        }

        return {
            valid: missingVars.length === 0,
            missing: missingVars
        };
    }

    // Verificar dependencias
    checkDependencies() {
        return fs.existsSync('node_modules');
    }

    // Verificar comandos registrados
    checkCommandsRegistered() {
        // Esta función verificaría si los comandos están registrados
        // Por simplicidad, asumimos que están registrados si existe el archivo deploy-commands.js
        return fs.existsSync('deploy-commands.js');
    }

    // Crear configuración automática
    async createAutoConfig() {
        this.print(this.colors.cyan, '\n🤖 Mario Andaluz Bot - Configuración Automática');
        this.print(this.colors.yellow, '===============================================');
        this.print(this.colors.green, '¡EPA! Detectando configuración automáticamente, colega!\n');

        const config = {
            envFile: this.checkEnvFile(),
            configValid: false,
            dependencies: this.checkDependencies(),
            commands: this.checkCommandsRegistered()
        };

        // Verificar configuración
        if (config.envFile) {
            const verification = this.verifyConfiguration();
            config.configValid = verification.valid;
            config.missingVars = verification.missing;
        }

        // Mostrar estado
        this.print(this.colors.blue, '📊 Estado de la configuración:');
        this.print(config.envFile ? this.colors.green : this.colors.red, 
                  `  ${config.envFile ? '✅' : '❌'} Archivo .env`);
        
        if (config.envFile) {
            this.print(config.configValid ? this.colors.green : this.colors.red,
                      `  ${config.configValid ? '✅' : '❌'} Configuración válida`);
            
            if (!config.configValid && config.missingVars) {
                this.print(this.colors.red, `  ⚠️  Variables faltantes: ${config.missingVars.join(', ')}`);
            }
        }

        this.print(config.dependencies ? this.colors.green : this.colors.red,
                  `  ${config.dependencies ? '✅' : '❌'} Dependencias instaladas`);
        
        this.print(config.commands ? this.colors.green : this.colors.red,
                  `  ${config.commands ? '✅' : '❌'} Comandos disponibles`);

        return config;
    }

    // Ejecutar configuración automática
    async runAutoSetup() {
        const config = await this.createAutoConfig();

        // Si todo está bien configurado
        if (config.envFile && config.configValid && config.dependencies && config.commands) {
            this.print(this.colors.green, '\n🎉 ¡EPA! ¡Todo está perfectamente configurado!');
            this.print(this.colors.cyan, '🚀 El bot está listo para iniciar');
            return true;
        }

        // Si falta algo, mostrar instrucciones
        this.print(this.colors.yellow, '\n⚠️  Configuración incompleta detectada');
        
        if (!config.envFile || !config.configValid) {
            this.print(this.colors.cyan, '🔧 Para configurar automáticamente:');
            this.print(this.colors.white, '   npm run setup');
        }
        
        if (!config.dependencies) {
            this.print(this.colors.cyan, '📦 Para instalar dependencias:');
            this.print(this.colors.white, '   npm install');
        }

        this.print(this.colors.cyan, '\n💡 O ejecuta todo automáticamente:');
        this.print(this.colors.white, '   npm run auto-start');

        return false;
    }

    // Mostrar ayuda completa
    showCompleteHelp() {
        this.print(this.colors.cyan, '\n🎯 Mario Andaluz Bot - Ayuda Completa');
        this.print(this.colors.yellow, '====================================');
        this.print(this.colors.green, '¡EPA! Aquí tienes toda la información, colega!\n');

        this.print(this.colors.blue, '🚀 Comandos disponibles:');
        this.print(this.colors.white, '  npm start          - Iniciar el bot (configuración automática)');
        this.print(this.colors.white, '  npm run auto-start - Configurar e iniciar todo automáticamente');
        this.print(this.colors.white, '  npm run setup      - Solo configuración automática');
        this.print(this.colors.white, '  npm run deploy     - Solo registrar comandos');
        this.print(this.colors.white, '  npm run dev        - Modo desarrollo (con auto-reload)');
        this.print(this.colors.white, '  npm run install-deps - Solo instalar dependencias\n');

        this.print(this.colors.blue, '🔑 Cómo obtener tokens:');
        this.print(this.colors.white, '  Discord Token: https://discord.com/developers/applications');
        this.print(this.colors.white, '  AndaluGeeks API: https://andalugeeks.com/api\n');

        this.print(this.colors.blue, '📁 Archivos importantes:');
        this.print(this.colors.white, '  .env               - Variables de entorno');
        this.print(this.colors.white, '  config.env.example  - Plantilla de configuración');
        this.print(this.colors.white, '  setup.js           - Script de configuración automática');
        this.print(this.colors.white, '  index.js           - Archivo principal del bot\n');

        this.print(this.colors.green, '¡EPA! ¡Que vaya bien con Mario Andaluz, colega! 🎯');
    }
}

// Función principal para configuración automática
async function main() {
    const autoConfig = new AutoConfig();
    
    // Verificar argumentos
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        autoConfig.showCompleteHelp();
        return;
    }
    
    // Ejecutar configuración automática
    const success = await autoConfig.runAutoSetup();
    
    if (!success) {
        process.exit(1);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Error fatal:', error.message);
        process.exit(1);
    });
}

module.exports = AutoConfig;
