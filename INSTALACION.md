# 🚀 Instalación Rápida - Mario Andaluz Bot

## ⚡ Instalación en 5 minutos

### 1. 📋 Requisitos Previos
- Node.js 18+ instalado
- Una aplicación de Discord creada
- API key de AndaluGeeks

### 2. 🔧 Configuración Rápida

#### Paso 1: Clonar e instalar
```bash
git clone https://github.com/tu-usuario/mario-andaluz-bot.git
cd mario-andaluz-bot
npm install
```

#### Paso 2: Configurar variables
```bash
# Copiar archivo de configuración
cp config.env.example .env

# Editar .env con tus datos
nano .env  # o usa tu editor favorito
```

#### Paso 3: Configurar .env
```env
DISCORD_TOKEN=tu_token_del_bot_aqui
CLIENT_ID=tu_client_id_aqui
GUILD_ID=tu_guild_id_aqui
ANDALUGEEKS_API_KEY=tu_api_key_de_andalugeeks_aqui
OWNER_ID=tu_user_id_aqui
```

#### Paso 4: Registrar comandos
```bash
node deploy-commands.js
```

#### Paso 5: Iniciar bot
```bash
npm start
```

### 3. 🎯 Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `/transcribir` | Convierte texto al andaluz EPA |
| `/saludo` | Saludo personalizado |
| `/frases` | Frases típicas andaluzas |
| `/info` | Información del bot |
| `/admin` | Comandos de administración |

### 4. 🔑 Obtener Tokens

#### Discord Bot Token:
1. Ve a https://discord.com/developers/applications
2. Crea una nueva aplicación
3. Ve a "Bot" → "Token" → Copia el token

#### Client ID:
1. En la misma página de Discord Developer
2. Ve a "General Information" → Copia "Application ID"

#### AndaluGeeks API Key:
1. Ve a https://andalugeeks.com/api
2. Regístrate y obtén tu API key
3. Asegúrate de tener permisos de transcripción

### 5. 🚨 Solución de Problemas Comunes

#### Error: "Invalid token"
- Verifica que el token sea correcto
- Asegúrate de que el bot esté habilitado

#### Error: "Missing permissions"
- Invita el bot con permisos de administrador
- O configura permisos manualmente

#### Error: "API key invalid"
- Verifica tu API key de AndaluGeeks
- Comprueba que tengas créditos disponibles

### 6. 🎉 ¡Listo!

Si todo está configurado correctamente, verás:
```
✅ ¡EPA! Mario Andaluz está conectao como Mario Andaluz#1234!
🎯 Actividades del bot configuradas
📊 Conectado a 1 servidores
👥 Sirviendo a 150 usuarios
```

### 7. 🔧 Comandos de Desarrollo

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Ver logs detallados
DEBUG=* npm start

# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install
```

### 8. 📞 Soporte

Si tienes problemas:
1. Revisa los logs del bot
2. Verifica la configuración
3. Consulta el README completo
4. Abre un issue en GitHub

---

¡EPA! ¡Que vaya bien con Mario Andaluz, colega! 🎯
