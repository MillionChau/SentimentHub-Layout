import { loadSidebar } from './components/sidebar.js';
import { loadChatHeader } from './components/chat-header.js';
import { loadChatContainer } from './components/chat-container.js';
import { loadInputArea } from './components/input-area.js';
import { navigateTo } from './router.js';
import { initLocalStorage } from './utils.js';

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Khởi tạo localStorage nếu chưa có
        initLocalStorage();
        
        // Load các components
        await loadSidebar();
        await loadChatHeader();
        await loadChatContainer();
        await loadInputArea();
        
        // Mặc định load trang home
        navigateTo('home');
        
        // Xử lý toggle sidebar trên mobile
        const toggleSidebar = document.getElementById('toggleSidebar');
        if (toggleSidebar) {
            toggleSidebar.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('active');
                }
            });
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});