import { appendMessage } from './chat-container.js';
import { updateChatTitle } from './chat-header.js';

export async function loadInputArea() {
    const inputForm = document.getElementById('chat-input-form');
    const inputField = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');

    if (!inputForm || !inputField || !sendButton) return;

    // Auto-resize textarea
    inputField.addEventListener('input', () => {
        // Reset height to auto to get the correct scrollHeight
        inputField.style.height = 'auto';
        // Set new height based on scrollHeight
        inputField.style.height = inputField.scrollHeight + 'px';
        
        // Enable/disable send button
        sendButton.disabled = !inputField.value.trim();
    });

    // Handle form submission
    inputForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleMessageSend();
    });

    // Handle enter key
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessageSend();
        }
    });

    // Focus input field
    inputField.focus();
}

async function handleMessageSend() {
    const inputField = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const message = inputField.value.trim();
    
    if (!message) return;

    // Clear input and reset height
    inputField.value = '';
    inputField.style.height = 'auto';
    sendButton.disabled = true;

    // Add user message
    appendMessage({
        type: 'user',
        content: message,
        timestamp: Date.now()
    });

    try {
        // Show loading state
        appendMessage({
            type: 'bot',
            content: '<div class="typing-indicator"><span></span><span></span><span></span></div>',
            timestamp: Date.now()
        });

        // Simulate API call (replace with actual API call)
        const response = await simulateBotResponse(message);
        
        // Remove loading message
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer && chatContainer.lastChild) {
            chatContainer.removeChild(chatContainer.lastChild);
        }

        // Add bot response
        appendMessage({
            type: 'bot',
            content: response,
            timestamp: Date.now()
        });

        // Update chat title if it's the first message
        if (chatContainer && chatContainer.children.length === 2) {
            updateChatTitle(message.substring(0, 30) + (message.length > 30 ? '...' : ''));
        }
    } catch (error) {
        console.error('Error sending message:', error);
        appendMessage({
            type: 'error',
            content: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            timestamp: Date.now()
        });
    }
}

// Simulate bot response (replace with actual API call)
function simulateBotResponse(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Đây là phản hồi cho: "${message}"`);
        }, 1000);
    });
}