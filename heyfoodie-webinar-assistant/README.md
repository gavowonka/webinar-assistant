# 🎯 HeyFoodie Webinar Master

Asistente web inteligente para crear webinars de alta conversión y anuncios efectivos, basado en los frameworks de **Russell Brunson** (Expert Secrets) y **Donald Miller** (StoryBrand).

## 🌟 Características

- 💬 Chat interactivo con Claude (Anthropic AI)
- 🎨 Interfaz moderna y responsive
- 📊 Guía paso a paso en 10 fases
- 🔄 Mantiene contexto de conversación
- 🎯 Adaptable a cualquier industria
- ⚡ Respuestas en tiempo real

## 🚀 Instalación Rápida

### Requisitos Previos

- Node.js 18+ instalado
- Una API Key de Anthropic ([obtener aquí](https://console.anthropic.com/))

### Paso 1: Clonar o Descargar

```bash
# Si tienes Git instalado
git clone <tu-repositorio>
cd heyfoodie-webinar-assistant

# O simplemente descarga y descomprime los archivos
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` y agrega tu API Key de Anthropic:
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxx...
PORT=3000
```

### Paso 4: Iniciar el Servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
heyfoodie-webinar-assistant/
├── server.js                  # Servidor backend Express
├── package.json              # Dependencias
├── assistant-knowledge.json  # Conocimiento del asistente
├── .env                      # Variables de entorno (no subir a Git)
├── .env.example             # Ejemplo de configuración
├── .gitignore               # Archivos a ignorar en Git
├── README.md                # Este archivo
└── public/                  # Frontend
    ├── index.html          # HTML principal
    ├── styles.css          # Estilos CSS
    └── app.js              # Lógica JavaScript
```

## 🌐 Deployment

### Opción 1: Vercel (Recomendado - Gratis)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Desde el directorio del proyecto:
```bash
vercel
```

3. Sigue las instrucciones y configura la variable de entorno:
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega: `ANTHROPIC_API_KEY` con tu API key

4. Tu app estará disponible en: `https://tu-proyecto.vercel.app`

### Opción 2: Render.com (Gratis)

1. Crea cuenta en [Render.com](https://render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Agrega `ANTHROPIC_API_KEY`
5. Click en "Create Web Service"

### Opción 3: Railway.app (Gratis con créditos)

1. Crea cuenta en [Railway.app](https://railway.app)
2. Click en "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repositorio
4. Agrega variable de entorno: `ANTHROPIC_API_KEY`
5. Railway detectará automáticamente que es una app Node.js

### Opción 4: Tu Propio Servidor (VPS)

Si tienes un servidor Linux (DigitalOcean, Linode, AWS EC2, etc.):

```bash
# 1. Conectar por SSH
ssh usuario@tu-servidor

# 2. Instalar Node.js (si no está instalado)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clonar el proyecto
git clone <tu-repo>
cd heyfoodie-webinar-assistant

# 4. Instalar dependencias
npm install

# 5. Configurar .env
nano .env
# Pega tu ANTHROPIC_API_KEY y guarda

# 6. Instalar PM2 (para mantener la app corriendo)
sudo npm install -g pm2

# 7. Iniciar la app
pm2 start server.js --name "webinar-assistant"

# 8. Configurar PM2 para auto-inicio
pm2 startup
pm2 save

# 9. (Opcional) Configurar Nginx como proxy reverso
sudo apt install nginx
# Configurar Nginx para apuntar al puerto 3000
```

Configuración básica de Nginx (`/etc/nginx/sites-available/webinar-assistant`):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Opción 5: Replit (Más Simple)

1. Ve a [Replit.com](https://replit.com)
2. Click en "Create Repl"
3. Selecciona "Import from GitHub"
4. Pega la URL de tu repositorio
5. En "Secrets" (ícono de candado), agrega:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Tu API key
6. Click en "Run"

## 🔧 Configuración Avanzada

### Cambiar el Puerto

Edita `.env`:
```env
PORT=8080
```

### Limitar Historial de Conversación

Edita `server.js`, línea ~180:
```javascript
// Cambiar de 50 a tu límite deseado
if (conversation.length > 50) {
```

### Personalizar Mensajes

Edita `public/index.html` para cambiar el mensaje de bienvenida.

### Modificar Estilos

Edita `public/styles.css` para personalizar colores, fuentes, etc.

## 📊 API Endpoints

### POST `/api/chat`
Enviar mensaje al asistente.

**Body:**
```json
{
  "message": "Tengo un gimnasio y quiero crear un webinar",
  "conversationId": "conv_123456"
}
```

**Response:**
```json
{
  "message": "¡Perfecto! Un gimnasio es un excelente negocio...",
  "conversationId": "conv_123456"
}
```

### POST `/api/reset`
Resetear conversación.

**Body:**
```json
{
  "conversationId": "conv_123456"
}
```

### GET `/api/health`
Verificar estado del servidor.

**Response:**
```json
{
  "status": "ok",
  "hasApiKey": true,
  "activeConversations": 3
}
```

## 🔒 Seguridad

- ✅ Nunca subas el archivo `.env` a GitHub
- ✅ Usa variables de entorno para API keys
- ✅ Considera agregar rate limiting en producción
- ✅ Implementa autenticación si es para uso privado

## 🐛 Solución de Problemas

### Error: "ANTHROPIC_API_KEY not found"
- Verifica que el archivo `.env` existe
- Asegúrate que tiene el formato correcto: `ANTHROPIC_API_KEY=sk-ant-...`
- Reinicia el servidor después de crear/editar `.env`

### Error: "Cannot connect to server"
- Verifica que el puerto no esté ocupado
- Revisa que Node.js esté instalado: `node --version`
- Revisa los logs del servidor para más detalles

### El chat no responde
- Abre la consola del navegador (F12) para ver errores
- Verifica que el backend esté corriendo
- Revisa que tu API Key sea válida

### Problemas con Vercel/Render
- Asegúrate que agregaste `ANTHROPIC_API_KEY` en las variables de entorno
- Verifica que el build command sea `npm install`
- Verifica que el start command sea `npm start`

## 💡 Consejos de Uso

1. **Primera Vez:** Siempre empieza diciendo qué tipo de negocio tienes
2. **Sé Específico:** Mientras más detalles des, mejores serán las recomendaciones
3. **Valida Cada Paso:** El asistente te guiará fase por fase, no te saltes pasos
4. **Guarda tus Respuestas:** Copia las ideas importantes a un documento
5. **Nueva Conversación:** Usa el botón "Nueva conversación" para empezar de cero

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Soporte

Si tienes problemas o preguntas:
1. Revisa la sección de "Solución de Problemas"
2. Verifica los logs del servidor
3. Contacta al administrador del proyecto

## 🎓 Créditos

Basado en los frameworks de:
- **Russell Brunson** - Expert Secrets, Perfect Webinar
- **Donald Miller** - StoryBrand Framework
- **Pepe Sevilla** - Estructura 3-3-3

Powered by **Anthropic Claude** 🚀
