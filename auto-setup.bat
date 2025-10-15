@echo off
REM Script súper automático para Mario Andaluz Bot en Windows
REM ¡EPA! Este script hace ABSOLUTAMENTE TODO automáticamente, colega

echo 🤖 Mario Andaluz Bot - Configuración Súper Automática
echo =====================================================
echo ¡EPA! Este script va a configurar TODO automáticamente, colega!
echo.

REM Verificar requisitos
echo 🔍 Verificando requisitos...

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo 💡 Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ No se encontró package.json
    echo 💡 Asegúrate de estar en el directorio correcto
    pause
    exit /b 1
)

echo ✅ Requisitos verificados correctamente

REM Instalar dependencias automáticamente
echo.
echo 📦 Instalando dependencias automáticamente...

if not exist "node_modules" (
    echo 💡 Instalando dependencias...
    npm install --silent
    
    if %errorlevel% equ 0 (
        echo ✅ Dependencias instaladas correctamente
    ) else (
        echo ❌ Error instalando dependencias
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencias ya instaladas
)

REM Configuración automática
echo.
echo 🔧 Configurando bot automáticamente...

REM Verificar si existe .env
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo 💡 Creando configuración automática...
    
    REM Crear archivo .env básico
    (
        echo # Configuración del Bot Mario Andaluz
        echo # ¡EPA! Variables de entorno configuradas automáticamente
        echo.
        echo # Discord Bot Configuration
        echo DISCORD_TOKEN=tu_token_del_bot_aqui
        echo CLIENT_ID=tu_client_id_aqui
        echo # GUILD_ID=tu_guild_id_aqui
        echo # OWNER_ID=tu_user_id_aqui
        echo.
        echo # AndaluGeeks API Configuration
        echo ANDALUGEEKS_API_KEY=tu_api_key_de_andalugeeks_aqui
        echo.
        echo # Bot Configuration
        echo PREFIX=!
        echo WEBHOOK_ENABLED=true
        echo WEBHOOK_DELETE_AFTER=5000
        echo TRANSCRIPTION_ENABLED=true
        echo TRANSCRIPTION_COOLDOWN=3000
        echo.
        echo # ¡EPA! ¡Configuración completada, colega!
    ) > .env
    
    echo ✅ Archivo .env creado
    echo ⚠️  Debes configurar las variables en .env antes de continuar
    
    echo.
    echo 🔑 Para obtener los tokens necesarios:
    echo    Discord Token: https://discord.com/developers/applications
    echo    AndaluGeeks API: https://andalugeeks.com/api
    echo.
    echo 💡 Edita el archivo .env con tus tokens y ejecuta este script de nuevo
    pause
    exit /b 1
)

REM Verificar configuración
echo 🔍 Verificando configuración...

REM Verificar variables en .env
findstr /C:"DISCORD_TOKEN=" .env >nul
if %errorlevel% neq 0 (
    echo ❌ DISCORD_TOKEN faltante
    goto :config_error
)

findstr /C:"DISCORD_TOKEN=tu_" .env >nul
if %errorlevel% equ 0 (
    echo ❌ DISCORD_TOKEN no configurado
    goto :config_error
)

findstr /C:"CLIENT_ID=" .env >nul
if %errorlevel% neq 0 (
    echo ❌ CLIENT_ID faltante
    goto :config_error
)

findstr /C:"CLIENT_ID=tu_" .env >nul
if %errorlevel% equ 0 (
    echo ❌ CLIENT_ID no configurado
    goto :config_error
)

findstr /C:"ANDALUGEEKS_API_KEY=" .env >nul
if %errorlevel% neq 0 (
    echo ❌ ANDALUGEEKS_API_KEY faltante
    goto :config_error
)

findstr /C:"ANDALUGEEKS_API_KEY=tu_" .env >nul
if %errorlevel% equ 0 (
    echo ❌ ANDALUGEEKS_API_KEY no configurado
    goto :config_error
)

echo ✅ Configuración verificada correctamente
goto :register_commands

:config_error
echo ❌ Variables faltantes o no configuradas
echo 💡 Edita el archivo .env con tus tokens
pause
exit /b 1

:register_commands
REM Registrar comandos automáticamente
echo.
echo 🔄 Registrando comandos slash automáticamente...

node deploy-commands.js >nul 2>&1

if %errorlevel% equ 0 (
    echo ✅ Comandos slash registrados correctamente
) else (
    echo ⚠️  Error registrando comandos (puede ser normal si ya están registrados)
)

REM Verificación final
echo.
echo 🎯 Verificación final...

REM Verificar que todo esté listo
set all_ready=true

if not exist ".env" (
    echo ❌ Archivo .env faltante
    set all_ready=false
)

if not exist "node_modules" (
    echo ❌ Dependencias faltantes
    set all_ready=false
)

if not exist "index.js" (
    echo ❌ Archivo principal faltante
    set all_ready=false
)

if "%all_ready%"=="true" (
    echo ✅ ¡EPA! ¡Todo está listo para iniciar!
    echo.
    echo 🚀 Para iniciar el bot:
    echo    npm start
    echo.
    echo 🎯 Comandos disponibles:
    echo    npm start          - Iniciar bot
    echo    npm run dev        - Modo desarrollo
    echo    npm run setup      - Reconfigurar
    echo    npm run deploy     - Registrar comandos
    echo.
    echo ¡EPA! ¡Que vaya bien con Mario Andaluz, colega! 🎯
) else (
    echo ❌ Configuración incompleta
    pause
    exit /b 1
)

pause
