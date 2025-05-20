export function init() {
    loadUserSettings();
    initSettingsEvents();
}

function loadUserSettings() {
    // Lấy cài đặt từ localStorage hoặc dùng mặc định
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {
        notifications: {
            messages: true,
            promotions: true
        },
        theme: 'light',
        language: 'vi'
    };
    
    // Áp dụng cài đặt
    document.getElementById('notifMessages').checked = settings.notifications.messages;
    document.getElementById('notifPromotions').checked = settings.notifications.promotions;
    
    // Chọn theme
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === settings.theme) {
            option.classList.add('active');
        }
    });
    
    // Chọn ngôn ngữ
    const langSelect = document.querySelector('.settings-page select');
    if (langSelect) {
        langSelect.value = settings.language;
    }
}

function initSettingsEvents() {
    // Lưu cài đặt khi thay đổi
    document.getElementById('notifMessages')?.addEventListener('change', saveSettings);
    document.getElementById('notifPromotions')?.addEventListener('change', saveSettings);
    
    // Chọn theme
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
            
            const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
            settings.theme = option.dataset.theme;
            localStorage.setItem('userSettings', JSON.stringify(settings));
            
            applyTheme(option.dataset.theme);
        });
    });
    
    // Thay đổi ngôn ngữ
    document.querySelector('.settings-page select')?.addEventListener('change', saveSettings);
    
    // Xóa tất cả dữ liệu
    document.getElementById('resetAllData')?.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa TẤT CẢ dữ liệu? Hành động này không thể hoàn tác.')) {
            localStorage.clear();
            alert('Đã xóa tất cả dữ liệu. Trang sẽ được tải lại.');
            window.location.reload();
        }
    });
}

function saveSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
    
    settings.notifications = {
        messages: document.getElementById('notifMessages').checked,
        promotions: document.getElementById('notifPromotions').checked
    };
    
    settings.language = document.querySelector('.settings-page select').value;
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Đã lưu cài đặt');
}

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    
    // Trong thực tế, bạn sẽ cần thêm CSS cho các theme
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#333333';
    }
}