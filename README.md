# Mario Andaluz - Bot de Discord EPA

¡EPA! Soy Mario Andaluz, un bot de Discord súper completo que habla andaluz EPA y tiene funcionalidades increíbles para hacer tu servidor más divertido y auténtico.

## Características Principales

### Transcripción al Andaluz EPA
- **Comando `/transcribir`**: Convierte cualquier texto al andaluz EPA usando sistema local
- **Sistema de webhooks**: Las transcripciones se envían como webhooks simulando al usuario
- **Sin dependencias externas**: Funciona completamente local sin API externa

### Respuestas Automáticas
- Responde automáticamente a saludos y menciones
- Frases típicas y expresiones locales
- Sistema de cooldown para evitar spam

### Sistema de Bienvenida
- Mensajes de bienvenida automáticos en andaluz
- Embeds personalizados con información útil
- Mensajes directos a nuevos usuarios
- Configuración flexible de canales

### Comandos Súper Completos
- `/transcribir` - Transcripción al andaluz EPA
- `/saludo` - Saludo personalizado
- `/frases` - Frases típicas andaluzas
- `/info` - Información del bot
- `/admin` - Comandos de administración
- `/utilidades` - Herramientas útiles

## Instalación Súper Automática

### Instalación en 1 comando (¡EPA!)
```bash
npm start
```

**¡Eso es todo!** El bot se configura automáticamente y te guía paso a paso.

### Instalación Manual (si prefieres control total)

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/mario-andaluz-bot.git
cd mario-andaluz-bot
```

#### 2. Configuración automática
```bash
npm run setup
```

#### 3. Iniciar el bot
```bash
npm start
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | **Inicio automático** - Configura e inicia todo |
| `npm run auto-start` | Configuración completa automática |
| `npm run setup` | Solo configuración interactiva |
| `npm run deploy` | Solo registrar comandos |
| `npm run dev` | Modo desarrollo (con auto-reload) |
| `npm run install-deps` | Solo instalar dependencias |

### Configuración Automática

El bot detecta automáticamente si falta algo y te guía:

1. **Variables de entorno**: Te pregunta por los tokens necesarios
2. **Dependencias**: Las instala automáticamente
3. **Comandos**: Los registra automáticamente
4. **Verificación**: Comprueba que todo esté correcto

### Variables Necesarias

El sistema te pedirá automáticamente:

- **DISCORD_TOKEN**: Token del bot de Discord
- **CLIENT_ID**: ID de la aplicación de Discord  
- **GUILD_ID**: ID del servidor (opcional)
- **OWNER_ID**: ID del propietario (opcional)

**¡EPA! Ya no necesitas API key externa, colega!** El sistema EPA funciona completamente local.

## Configuración

### Variables de Entorno Requeridas

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `DISCORD_TOKEN` | Token del bot de Discord | ✅ |
| `CLIENT_ID` | ID de la aplicación de Discord | ✅ |
| `GUILD_ID` | ID del servidor (opcional, para desarrollo) | ❌ |
| `ANDALUGEEKS_API_KEY` | API key de AndaluGeeks | ✅ |
| `OWNER_ID` | ID del propietario del bot | ❌ |

### Configuración Opcional

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `WEBHOOK_ENABLED` | Habilitar sistema de webhooks | `true` |
| `WEBHOOK_DELETE_AFTER` | Tiempo antes de eliminar webhook (ms) | `5000` |
| `TRANSCRIPTION_ENABLED` | Habilitar transcripción | `true` |
| `TRANSCRIPTION_COOLDOWN` | Cooldown entre transcripciones (ms) | `3000` |

## Comandos Disponibles

### Comandos Principales

#### `/transcribir`
Transcribe texto al andaluz EPA usando la API de AndaluGeeks.

**Opciones:**
- `texto` (requerido): Texto a transcribir
- `webhook` (opcional): Enviar como webhook (por defecto: true)

**Ejemplo:**
```
/transcribir texto:"Hola, ¿cómo estás?" webhook:true
```

#### `/saludo`
Saludo personalizado en andaluz.

**Opciones:**
- `nombre` (opcional): Nombre para el saludo

#### `/frases`
Frases típicas andaluzas.

**Opciones:**
- `tipo`: Tipo de frase (saludos, despedidas, expresiones, aleatorio)

#### `/info`
Información completa del bot y sus funcionalidades.

### Comandos de Administración

#### `/admin`
Comandos de administración (requiere permisos de administrador).

**Subcomandos:**
- `stats`: Estadísticas del bot
- `reload`: Recargar comandos
- `webhook`: Gestionar webhooks

### Comandos de Utilidades

#### `/utilidades`
Herramientas útiles del bot.

**Subcomandos:**
- `ping`: Comprobar latencia
- `avatar`: Ver avatar de usuario
- `servidor`: Información del servidor

## Personalización

### Modificar Respuestas Automáticas
Edita el archivo `config.js` para personalizar las respuestas automáticas:

```javascript
autoResponses: {
    responses: [
        { trigger: /hola|hello|hi/i, response: '¡EPA! ¿Qué tal, colega?' },
        // Añade más respuestas aquí
    ]
}
```

### Añadir Nuevas Frases
Modifica la sección `frases` en `config.js`:

```javascript
frases: {
    saludos: [
        '¡EPA! ¿Qué tal, colega?',
        // Añade más saludos aquí
    ]
}
```

## Permisos Requeridos

El bot necesita los siguientes permisos:

- **Enviar mensajes**
- **Usar comandos slash**
- **Gestionar webhooks**
- **Leer historial de mensajes**
- **Ver canales**
- **Conectar al servidor**

## Solución de Problemas

### Error de API Key
Si obtienes errores de autenticación con AndaluGeeks:
1. Verifica que tu API key sea correcta
2. Asegúrate de que la API key tenga permisos de transcripción
3. Revisa los límites de tu plan de API

### Comandos no aparecen
1. Ejecuta `node deploy-commands.js`
2. Verifica que el bot tenga permisos de aplicación
3. Espera unos minutos para la propagación global

### Webhooks no funcionan
1. Verifica que el bot tenga permisos de gestión de webhooks
2. Comprueba que no haya límites de webhooks en el servidor
3. Revisa los logs del bot para errores específicos

## Estadísticas

El bot incluye un sistema de estadísticas completo:
- Número de servidores
- Número de usuarios
- Latencia del bot
- Uso de memoria
- Tiempo de actividad
- Número de comandos

## Contribuir

¡EPA! Si quieres contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Roadmap

### Próximas Funcionalidades
- [ ] Integración con APIs
- [ ] Comandos de moderación avanzados
- [ ] Dashboard web para configuración

### Mejoras Planificadas
- [ ] Optimización de rendimiento
- [ ] Mejor sistema de logs
- [ ] Más personalización
- [ ] Integración con bases de datos

## Soporte

Si tienes problemas o preguntas:

1. **Discord**: Únete a nuestro servidor de soporte
2. **GitHub Issues**: Reporta bugs o solicita features
3. **Email**: stoneplatoon123@gmail.com

## Agradecimientos

- **AndaluGeeks**: Por la increíble API de transcripción
- **Discord.js**: Por el framework de Discord
- **Comunidad Andaluza**: Por la inspiración y el apoyo

---

¡EPA! ¡Que vaya bien con Mario Andaluz! 

*Desarrollado con ❤️ en Andalucía*
