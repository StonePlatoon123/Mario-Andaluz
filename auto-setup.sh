#!/bin/bash

# Script súper automático para Mario Andaluz Bot
# ¡EPA! Este script hace ABSOLUTAMENTE TODO automáticamente, colega

echo "🤖 Mario Andaluz Bot - Configuración Súper Automática"
echo "====================================================="
echo "¡EPA! Este script va a configurar TODO automáticamente, colega!"
echo ""

# Función para imprimir con colores
print_status() {
    echo -e "\033[32m✅ $1\033[0m"
}

print_error() {
    echo -e "\033[31m❌ $1\033[0m"
}

print_warning() {
    echo -e "\033[33m⚠️  $1\033[0m"
}

print_info() {
    echo -e "\033[36m💡 $1\033[0m"
}

# Verificar requisitos
echo "🔍 Verificando requisitos..."

if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    print_info "Descarga desde: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi

if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json"
    print_info "Asegúrate de estar en el directorio correcto"
    exit 1
fi

print_status "Requisitos verificados correctamente"

# Instalar dependencias automáticamente
echo ""
echo "📦 Instalando dependencias automáticamente..."

if [ ! -d "node_modules" ]; then
    print_info "Instalando dependencias..."
    npm install --silent
    
    if [ $? -eq 0 ]; then
        print_status "Dependencias instaladas correctamente"
    else
        print_error "Error instalando dependencias"
        exit 1
    fi
else
    print_status "Dependencias ya instaladas"
fi

# Configuración automática
echo ""
echo "🔧 Configurando bot automáticamente..."

# Verificar si existe .env
if [ ! -f ".env" ]; then
    print_warning "Archivo .env no encontrado"
    print_info "Creando configuración automática..."
    
    # Crear archivo .env básico
    cat > .env << EOF
# Configuración del Bot Mario Andaluz
# ¡EPA! Variables de entorno configuradas automáticamente

# Discord Bot Configuration
DISCORD_TOKEN=tu_token_del_bot_aqui
CLIENT_ID=tu_client_id_aqui
# GUILD_ID=tu_guild_id_aqui
# OWNER_ID=tu_user_id_aqui

# AndaluGeeks API Configuration
ANDALUGEEKS_API_KEY=tu_api_key_de_andalugeeks_aqui

# Bot Configuration
PREFIX=!
WEBHOOK_ENABLED=true
WEBHOOK_DELETE_AFTER=5000
TRANSCRIPTION_ENABLED=true
TRANSCRIPTION_COOLDOWN=3000

# ¡EPA! ¡Configuración completada, colega!
EOF
    
    print_status "Archivo .env creado"
    print_warning "Debes configurar las variables en .env antes de continuar"
    
    echo ""
    echo "🔑 Para obtener los tokens necesarios:"
    echo "   Discord Token: https://discord.com/developers/applications"
    echo "   AndaluGeeks API: https://andalugeeks.com/api"
    echo ""
    echo "💡 Edita el archivo .env con tus tokens y ejecuta este script de nuevo"
    exit 1
fi

# Verificar configuración
echo "🔍 Verificando configuración..."

# Leer archivo .env y verificar variables
env_content=$(cat .env)
missing_vars=()

if ! echo "$env_content" | grep -q "DISCORD_TOKEN=" || echo "$env_content" | grep -q "DISCORD_TOKEN=tu_"; then
    missing_vars+=("DISCORD_TOKEN")
fi

if ! echo "$env_content" | grep -q "CLIENT_ID=" || echo "$env_content" | grep -q "CLIENT_ID=tu_"; then
    missing_vars+=("CLIENT_ID")
fi

if ! echo "$env_content" | grep -q "ANDALUGEEKS_API_KEY=" || echo "$env_content" | grep -q "ANDALUGEEKS_API_KEY=tu_"; then
    missing_vars+=("ANDALUGEEKS_API_KEY")
fi

if [ ${#missing_vars[@]} -gt 0 ]; then
    print_error "Variables faltantes: ${missing_vars[*]}"
    print_info "Edita el archivo .env con tus tokens"
    exit 1
fi

print_status "Configuración verificada correctamente"

# Registrar comandos automáticamente
echo ""
echo "🔄 Registrando comandos slash automáticamente..."

node deploy-commands.js > /dev/null 2>&1

if [ $? -eq 0 ]; then
    print_status "Comandos slash registrados correctamente"
else
    print_warning "Error registrando comandos (puede ser normal si ya están registrados)"
fi

# Verificación final
echo ""
echo "🎯 Verificación final..."

# Verificar que todo esté listo
all_ready=true

if [ ! -f ".env" ]; then
    print_error "Archivo .env faltante"
    all_ready=false
fi

if [ ! -d "node_modules" ]; then
    print_error "Dependencias faltantes"
    all_ready=false
fi

if [ ! -f "index.js" ]; then
    print_error "Archivo principal faltante"
    all_ready=false
fi

if [ "$all_ready" = true ]; then
    print_status "¡EPA! ¡Todo está listo para iniciar!"
    echo ""
    echo "🚀 Para iniciar el bot:"
    echo "   npm start"
    echo ""
    echo "🎯 Comandos disponibles:"
    echo "   npm start          - Iniciar bot"
    echo "   npm run dev        - Modo desarrollo"
    echo "   npm run setup      - Reconfigurar"
    echo "   npm run deploy     - Registrar comandos"
    echo ""
    echo "¡EPA! ¡Que vaya bien con Mario Andaluz, colega! 🎯"
else
    print_error "Configuración incompleta"
    exit 1
fi
