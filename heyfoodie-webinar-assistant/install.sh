#!/bin/bash

echo "🎯 Instalación de HeyFoodie Webinar Master"
echo "=========================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado"
    echo "Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

echo "✅ Node.js versión: $(node --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "📝 Creando archivo de configuración..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo ""
    echo "⚠️  IMPORTANTE: Edita el archivo .env y agrega tu ANTHROPIC_API_KEY"
    echo ""
    echo "Para obtener tu API Key:"
    echo "1. Ve a https://console.anthropic.com/"
    echo "2. Crea una cuenta o inicia sesión"
    echo "3. Ve a Settings → API Keys"
    echo "4. Crea una nueva API Key"
    echo "5. Copia la key y pégala en el archivo .env"
    echo ""
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "🎉 Instalación completada!"
echo ""
echo "Próximos pasos:"
echo "1. Edita el archivo .env y agrega tu ANTHROPIC_API_KEY"
echo "2. Ejecuta: npm start"
echo "3. Abre http://localhost:3000 en tu navegador"
echo ""
