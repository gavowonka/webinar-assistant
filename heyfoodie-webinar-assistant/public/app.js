// Generar ID único para la conversación
function generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Estado de la aplicación
const state = {
    conversationId: generateConversationId(),
    isLoading: false
};

// Elementos del DOM
const elements = {
    chatMessages: document.getElementById('chatMessages'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    resetBtn: document.getElementById('resetBtn'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    charCount: document.getElementById('charCount'),
    toast: document.getElementById('toast')
};

// Función para mostrar toast
function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Función para formatear texto con markdown básico
function formatMessage(text) {
    // Convertir ** a strong
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convertir saltos de línea dobles a párrafos
    text = text.split('\n\n').map(p => `<p>${p}</p>`).join('');
    
    // Convertir saltos de línea simples a <br>
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Función para agregar mensaje al chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'assistant-message'}`;
    
    const avatar = isUser ? '👤' : '🎯';
    const author = isUser ? 'Tú' : 'Webinar Master';
    const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${author}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">
                ${isUser ? content : formatMessage(content)}
            </div>
        </div>
    `;
    
    elements.chatMessages.appendChild(messageDiv);
    
    // Scroll automático al último mensaje
    setTimeout(() => {
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
}

// Función para enviar mensaje
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    
    if (!message || state.isLoading) return;
    
    // Agregar mensaje del usuario
    addMessage(message, true);
    
    // Limpiar input
    elements.messageInput.value = '';
    updateCharCount();
    
    // Mostrar indicador de carga
    state.isLoading = true;
    elements.sendBtn.disabled = true;
    elements.messageInput.disabled = true;
    elements.loadingIndicator.classList.add('active');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                conversationId: state.conversationId
            })
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        const data = await response.json();
        
        // Agregar respuesta del asistente
        addMessage(data.message, false);
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        
        // Agregar mensaje de error en el chat
        addMessage('Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.', false);
    } finally {
        // Ocultar indicador de carga
        state.isLoading = false;
        elements.sendBtn.disabled = false;
        elements.messageInput.disabled = false;
        elements.loadingIndicator.classList.remove('active');
        elements.messageInput.focus();
    }
}

// Función para resetear conversación
async function resetConversation() {
    if (!confirm('¿Estás seguro de que quieres iniciar una nueva conversación? Se perderá el historial actual.')) {
        return;
    }
    
    try {
        // Llamar al endpoint de reset
        await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationId: state.conversationId
            })
        });
        
        // Generar nuevo ID de conversación
        state.conversationId = generateConversationId();
        
        // Limpiar mensajes excepto el de bienvenida
        const welcomeMessage = elements.chatMessages.querySelector('.welcome-message');
        elements.chatMessages.innerHTML = '';
        if (welcomeMessage) {
            elements.chatMessages.appendChild(welcomeMessage);
        }
        
        showToast('Nueva conversación iniciada', 'success');
        elements.messageInput.focus();
        
    } catch (error) {
        console.error('Error al resetear:', error);
        showToast('Error al resetear la conversación', 'error');
    }
}

// Función para actualizar contador de caracteres
function updateCharCount() {
    const count = elements.messageInput.value.length;
    elements.charCount.textContent = count;
    
    if (count > 1800) {
        elements.charCount.style.color = '#ef4444';
    } else if (count > 1500) {
        elements.charCount.style.color = '#f59e0b';
    } else {
        elements.charCount.style.color = '';
    }
}

// Función para ajustar altura del textarea
function autoResizeTextarea() {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
}

// Event Listeners
elements.sendBtn.addEventListener('click', sendMessage);
elements.resetBtn.addEventListener('click', resetConversation);

elements.messageInput.addEventListener('input', () => {
    updateCharCount();
    autoResizeTextarea();
});

elements.messageInput.addEventListener('keydown', (e) => {
    // Enviar con Enter (sin Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Verificar estado del servidor al cargar
async function checkServerHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (!data.hasApiKey) {
            showToast('⚠️ API Key no configurada. Revisa la configuración del servidor.', 'error');
        }
    } catch (error) {
        console.error('Error al verificar estado del servidor:', error);
        showToast('Error al conectar con el servidor', 'error');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    checkServerHealth();
    elements.messageInput.focus();
    updateCharCount();
});

// Prevenir pérdida de datos al cerrar
window.addEventListener('beforeunload', (e) => {
    if (elements.chatMessages.children.length > 1) {
        e.preventDefault();
        e.returnValue = '';
    }
});
