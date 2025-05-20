export async function navigateTo(page) {
    try {
        // Load nội dung trang
        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        
        // Hiển thị nội dung trang
        document.getElementById('page-container').innerHTML = html;
        
        // Cập nhật tiêu đề chat
        updateChatTitle(page);
        
        // Load JS tương ứng nếu có
        try {
            const module = await import(`./pages/${page}.js`);
            if (module.init) module.init();
        } catch (e) {
            console.log(`No JS for ${page} page`);
        }
        
        // Cập nhật active state trong sidebar
        updateSidebarActive(page);
        
        // Đóng sidebar trên mobile
        if (window.innerWidth < 992) {
            document.getElementById('sidebar').classList.remove('active');
        }
    } catch (e) {
        console.error(`Error loading page: ${page}`, e);
        showErrorPage();
    }
}

function updateChatTitle(page) {
    const titles = {
        'home': 'Shopee Assistant',
        'history': 'Lịch sử trò chuyện',
        'saved': 'Tin nhắn đã lưu',
        'settings': 'Cài đặt',
        'about': 'Về chúng tôi'
    };
    
    const titleElement = document.getElementById('chat-title');
    if (titleElement && titles[page]) {
        titleElement.textContent = titles[page];
    }
}

function updateSidebarActive(page) {
    document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
}

function showErrorPage() {
    document.getElementById('page-container').innerHTML = `
        <div class="error-page">
            <div class="error-content text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h3>Đã xảy ra lỗi</h3>
                <p class="text-muted">Không thể tải trang. Vui lòng thử lại sau.</p>
                <button class="btn btn-primary mt-3" id="reload-page">
                    <i class="fas fa-sync-alt me-2"></i>Tải lại trang
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('reload-page')?.addEventListener('click', () => {
        window.location.reload();
    });
}

// Xử lý click trên các link trong sidebar
document.addEventListener('click', (e) => {
    if (e.target.closest('.sidebar-menu .nav-link')) {
        e.preventDefault();
        const page = e.target.closest('.nav-link').dataset.page;
        navigateTo(page);
    }
});