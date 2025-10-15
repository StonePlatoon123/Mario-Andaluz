#!/bin/bash

# Script de inicio súper automático para Mario Andaluz Bot
# ¡EPA! Script que hace TODO automáticamente

echo "🤖 Mario Andaluz Bot - Inicio Automático"
echo "========================================"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js no está instalado. Por favor, instala Node.js primero."
    echo "Descarga desde: https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "npm no está instalado. Por favor, instala npm primero."
    exit 1
fi

# Verificar si existe package.json
if [ ! -f "package.json" ]; then
    echo "No se encontró package.json. Asegúrate de estar en el directorio correcto."
    exit 1
fi

echo "Node.js y npm detectados correctamente"
echo "Iniciando configuración automática..."

# Ejecutar configuración automática
node auto-config.js

if [ $? -ne 0 ]; then
    echo "Error en la configuración automática"
    echo "Ejecuta 'npm run setup' para configurar manualmente"
    exit 1
fi

echo "Configuración verificada"
echo "Iniciando Mario Andaluz Bot..."
echo "¡EPA! ¡El bot está arrancando!"
echo "========================================"

# Iniciar el bot
node index.js
