# 🚀 Guía Rápida de Deployment

## ⚡ Opción 1: Vercel (5 minutos - Gratis)

### Desde la interfaz web de Vercel:

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Click en "Add New" → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es una app Node.js
5. En "Environment Variables", agrega:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-xxx...` (tu API key)
6. Click en "Deploy"
7. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

### Desde la línea de comandos:

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desde el directorio del proyecto
vercel

# 3. Sigue las instrucciones
# 4. Configura variables de entorno en vercel.com/dashboard
```

---

## 🎨 Opción 2: Render.com (10 minutos - Gratis)

1. Crea cuenta en [render.com](https://render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub o GitLab
4. Configuración:
   ```
   Name: heyfoodie-webinar-assistant
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. En "Environment Variables":
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Tu API key de Anthropic
6. Click en "Create Web Service"
7. Espera 2-3 minutos a que termine el build
8. ¡Listo! Tu app estará en `https://tu-servicio.onrender.com`

---

## 🚂 Opción 3: Railway.app (7 minutos - Gratis con créditos)

1. Ve a [railway.app](https://railway.app) y crea cuenta
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Elige tu repositorio
5. Railway detecta automáticamente Node.js
6. Click en tu proyecto → Variables
7. Agrega variable:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Tu API key
8. Railway hará deploy automáticamente
9. Click en "Settings" → "Generate Domain"
10. ¡Listo! Tu app estará en `https://tu-proyecto.up.railway.app`

---

## 🎪 Opción 4: Replit (3 minutos - Gratis)

### Método 1: Importar desde GitHub

1. Ve a [replit.com](https://replit.com)
2. Click en "+ Create"
3. "Import from GitHub"
4. Pega la URL de tu repositorio
5. Click en "Import from GitHub"
6. En la barra lateral, click en el ícono de candado (Secrets)
7. Agrega:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Tu API key
8. Click en "Run"
9. Replit te dará una URL automática

### Método 2: Crear desde cero

1. Click en "+ Create" → "Node.js"
2. Arrastra y suelta todos los archivos del proyecto
3. Agrega secret `ANTHROPIC_API_KEY`
4. Click en "Run"

---

## 🖥️ Opción 5: Servidor Propio (Ubuntu/Debian)

### Instalación en VPS:

```bash
# 1. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Instalar Git (si no está instalado)
sudo apt install git -y

# 4. Clonar repositorio
git clone <tu-repositorio-github>
cd heyfoodie-webinar-assistant

# 5. Instalar dependencias
npm install

# 6. Crear archivo .env
nano .env
# Pega esto y reemplaza con tu API key:
# ANTHROPIC_API_KEY=sk-ant-api03-xxx...
# PORT=3000
# Guarda con Ctrl+X, luego Y, luego Enter

# 7. Instalar PM2 (process manager)
sudo npm install -g pm2

# 8. Iniciar aplicación
pm2 start server.js --name webinar-assistant

# 9. Ver logs
pm2 logs

# 10. Configurar auto-inicio
pm2 startup
pm2 save

# 11. Tu app corre en http://tu-ip:3000
```

### Configurar dominio con Nginx:

```bash
# 1. Instalar Nginx
sudo apt install nginx -y

# 2. Crear configuración
sudo nano /etc/nginx/sites-available/webinar-assistant

# 3. Pega esta configuración:
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# 4. Activar sitio
sudo ln -s /etc/nginx/sites-available/webinar-assistant /etc/nginx/sites-enabled/

# 5. Probar configuración
sudo nginx -t

# 6. Reiniciar Nginx
sudo systemctl restart nginx

# 7. (Opcional) Instalar certificado SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

---

## 📱 Opción 6: Netlify + Netlify Functions (Alternativa)

⚠️ **Nota:** Netlify requiere adaptar el proyecto para usar Netlify Functions

1. Instalar Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Desde el proyecto:
```bash
netlify init
```

3. Configurar variables de entorno en Netlify Dashboard

4. Deploy:
```bash
netlify deploy --prod
```

---

## 🐳 Opción 7: Docker (Avanzado)

### Crear Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Crear docker-compose.yml:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    restart: unless-stopped
```

### Usar:

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## 🔍 Verificar que Todo Funciona

Después de hacer deploy en cualquier plataforma, visita:

```
https://tu-app.vercel.app/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "hasApiKey": true,
  "activeConversations": 0
}
```

Si `hasApiKey` es `false`, revisa que configuraste correctamente la variable de entorno `ANTHROPIC_API_KEY`.

---

## 💰 Costos Estimados

| Plataforma | Costo Mensual | Límites Gratis |
|------------|---------------|----------------|
| Vercel     | $0 - $20      | 100GB bandwidth |
| Render     | $0 - $7       | 750 hrs/mes |
| Railway    | $0 - $5       | $5 créditos/mes |
| Replit     | $0 - $7       | Limitado uso CPU |
| VPS        | $5 - $10      | Sin límites |

**Nota:** El costo principal será el uso de la API de Anthropic (por tokens usados).

---

## 🆘 Problemas Comunes

### Error: "API Key not configured"
- Verifica que agregaste `ANTHROPIC_API_KEY` en las variables de entorno
- En plataformas web, busca "Environment Variables" o "Secrets"
- El valor debe empezar con `sk-ant-api03-`

### Error 500 al enviar mensaje
- Revisa los logs del servidor
- Verifica que tu API key sea válida
- Asegúrate que tienes créditos en tu cuenta de Anthropic

### App no carga
- Verifica que el build terminó exitosamente
- Revisa los logs de la plataforma
- Asegúrate que el comando de inicio es `npm start`

---

## 📊 Monitoreo

Después de deployment, monitorea:
- **Uptime:** ¿La app está siempre disponible?
- **Response Time:** ¿Respuestas rápidas?
- **Errors:** Revisa logs regularmente
- **API Usage:** Controla gasto en Anthropic console

---

¿Preguntas? Revisa el README.md principal para más detalles.
