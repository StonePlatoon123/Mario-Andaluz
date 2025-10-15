@echo off
REM Script de inicio súper automático para Mario Andaluz Bot en Windows
REM ¡EPA! Script que hace TODO automáticamente, colega

echo 🤖 Mario Andaluz Bot - Inicio Automático
echo ========================================

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor, instala Node.js primero.
    echo 💡 Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor, instala npm primero.
    pause
    exit /b 1
)

REM Verificar si existe package.json
if not exist "package.json" (
    echo ❌ No se encontró package.json. Asegúrate de estar en el directorio correcto.
    pause
    exit /b 1
)

echo ✅ Node.js y npm detectados correctamente
echo 🔄 Iniciando configuración automática...

REM Ejecutar configuración automática
node auto-config.js

if %errorlevel% neq 0 (
    echo ❌ Error en la configuración automática
    echo 💡 Ejecuta 'npm run setup' para configurar manualmente
    pause
    exit /b 1
)

echo ✅ Configuración verificada
echo 🚀 Iniciando Mario Andaluz Bot...
echo ¡EPA! ¡El bot está arrancando, colega!
echo ========================================

REM Iniciar el bot
node index.js
pause
