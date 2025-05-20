import { saveMessage, getMessages } from '../utils.js';

export async function loadChatContainer() {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    // Load existing messages
    const messages = getMessages();
    messages.forEach(message => {
        appendMessage(message);
    });

    // Scroll to bottom
    scrollToBottom();
}

export function appendMessage(message) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.type} fade-in`;
    
    const content = `
        <div class="message-content">
            ${message.content}
        </div>
        <div class="message-time">
            ${new Date(message.timestamp).toLocaleTimeString()}
        </div>
    `;
    
    messageElement.innerHTML = content;
    chatContainer.appendChild(messageElement);
    
    // Save message
    saveMessage(message);
    
    // Scroll to bottom
    scrollToBottom();
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

export function clearChatContainer() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatContainer.innerHTML = '';
    }
}

export function addMessage(content, sender) {
    const container = document.getElementById('chatContainer');
    const template = document.getElementById('message-template');
    
    const clone = template.content.cloneNode(true);
    const messageDiv = clone.querySelector('.message');
    messageDiv.classList.add(`${sender}-message`);
    
    const contentDiv = clone.querySelector('.message-content');
    contentDiv.textContent = content;
    
    const timeDiv = clone.querySelector('.message-time');
    timeDiv.textContent = new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    container.appendChild(clone);
    container.scrollTop = container.scrollHeight;
}

export function showTypingIndicator() {
    const container = document.getElementById('chatContainer');
    const template = document.getElementById('typing-indicator-template');
    
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
    container.scrollTop = container.scrollHeight;
}

export function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}