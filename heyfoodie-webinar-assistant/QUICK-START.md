# 🚀 INICIO RÁPIDO - 3 PASOS

## ⚡ Opción A: En Tu Computadora (Local)

```bash
# Paso 1: Instalar dependencias
npm install

# Paso 2: Configurar API Key
# Edita el archivo .env y agrega:
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui

# Paso 3: Iniciar servidor
npm start

# ¡Listo! Abre: http://localhost:3000
```

---

## 🌐 Opción B: En Internet (Vercel - Gratis)

1. **Sube el código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Deploy en Vercel:**
   - Ve a https://vercel.com
   - Click en "Import Project"
   - Selecciona tu repositorio
   - Agrega variable de entorno: `ANTHROPIC_API_KEY`
   - Click en "Deploy"

3. **¡Listo!** Tu app estará en: `https://tu-proyecto.vercel.app`

---

## 🔑 Conseguir API Key de Anthropic

1. Ve a: https://console.anthropic.com/
2. Crea cuenta o inicia sesión
3. Ve a "Settings" → "API Keys"
4. Click en "Create Key"
5. Copia la key (empieza con `sk-ant-api03-`)
6. Pégala en tu archivo `.env`

**⚠️ IMPORTANTE:** 
- Guarda tu API key en lugar seguro
- Nunca la compartas públicamente
- Nunca la subas a GitHub (el archivo .env está en .gitignore)

---

## 📂 Archivos Importantes

```
📁 heyfoodie-webinar-assistant/
├── 📄 server.js              ← Servidor backend
├── 📄 package.json           ← Dependencias
├── 📄 .env                   ← TU API KEY AQUÍ (crear desde .env.example)
├── 📄 assistant-knowledge.json ← Conocimiento del asistente
│
├── 📁 public/                ← Frontend
│   ├── index.html           
│   ├── styles.css           
│   └── app.js               
│
├── 📄 README.md             ← Documentación completa
├── 📄 DEPLOYMENT.md         ← Guías de deployment
└── 📄 QUICK-START.md        ← Este archivo
```

---

## ✅ Checklist Pre-Lanzamiento

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] API Key de Anthropic obtenida
- [ ] Archivo `.env` creado y configurado
- [ ] Servidor funciona localmente (`npm start`)
- [ ] Chat responde correctamente

---

## 🐛 Si Algo No Funciona

### El servidor no inicia:
```bash
# Verifica que Node.js está instalado
node --version

# Reinstala dependencias
rm -rf node_modules
npm install

# Verifica que .env existe
ls -la | grep .env
```

### El chat no responde:
1. Abre consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que `ANTHROPIC_API_KEY` esté en `.env`
4. Verifica que tu API key sea válida en https://console.anthropic.com/

### Error "API Key not configured":
```bash
# Verifica que .env tiene el formato correcto:
cat .env

# Debe mostrar:
# ANTHROPIC_API_KEY=sk-ant-api03-xxx...
# PORT=3000
```

---

## 📊 Verificar que Todo Funciona

1. **Backend:** Abre http://localhost:3000/api/health
   
   Deberías ver:
   ```json
   {
     "status": "ok",
     "hasApiKey": true,
     "activeConversations": 0
   }
   ```

2. **Frontend:** Abre http://localhost:3000
   - Deberías ver la interfaz del chat
   - Escribe "Hola" y envía
   - El asistente debe responder en ~3-5 segundos

---

## 🎯 Primer Uso

1. Abre la aplicación
2. El asistente te preguntará: "¿Qué tipo de negocio tienes?"
3. Responde con tu industria (ej: "Tengo un gimnasio")
4. Sigue las preguntas del asistente
5. El te guiará en 10 fases para crear tu webinar

---

## 💡 Consejos

- **Sé específico** con tu industria y negocio
- **Responde honestamente** a las preguntas del asistente
- **No te saltes pasos** - cada fase es importante
- **Guarda las respuestas** importantes en un documento
- **Usa "Nueva conversación"** para empezar de cero

---

## 📚 Más Información

- **Documentación completa:** README.md
- **Guías de deployment:** DEPLOYMENT.md
- **Estructura del proyecto:** README.md > Estructura
- **API Endpoints:** README.md > API Endpoints

---

## 🆘 Soporte

¿Problemas? Verifica:
1. Los logs del servidor (en la terminal donde corriste `npm start`)
2. La consola del navegador (F12 → Console)
3. Que tu API key sea válida
4. La sección "Solución de Problemas" en README.md

---

**¡Listo para empezar! 🚀**

Ejecuta `npm start` y abre http://localhost:3000
