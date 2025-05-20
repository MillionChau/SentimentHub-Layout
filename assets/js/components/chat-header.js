import { navigateTo } from '../router.js';

export async function loadChatHeader() {
    const headerContainer = document.getElementById('chat-header-container');
    const response = await fetch('components/chat-header.html');
    const html = await response.text();
    headerContainer.innerHTML = html;

    // Set initial title
    updateChatTitle('Shopee Assistant');

    // Mobile back button
    document.getElementById('mobile-back-btn')?.addEventListener('click', () => {
        navigateTo('home');
    });
}

export function updateChatTitle(title) {
    const titleElement = document.getElementById('chat-title');
    if (titleElement) {
        titleElement.textContent = title;
    }
}