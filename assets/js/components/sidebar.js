import { navigateTo } from '../router.js';

export function loadSidebar() {
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('sidebar-container').innerHTML = html;
            initSidebarEvents();
        });
}

function initSidebarEvents() {
    // Xử lý đăng xuất
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            // Xử lý đăng xuất ở đây
            alert('Đã đăng xuất');
        }
    });
    
    // Load user info
    loadUserInfo();
}

function loadUserInfo() {
    // Trong thực tế, bạn sẽ lấy thông tin từ API hoặc localStorage
    const username = 'Người dùng';
    const plan = 'Free Plan';
    
    document.getElementById('sidebar-username').textContent = username;
    document.getElementById('sidebar-plan').textContent = plan;
}