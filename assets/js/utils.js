// Lưu tin nhắn vào localStorage
export function saveMessage(message) {
    const messages = getMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Lấy danh sách tin nhắn từ localStorage
export function getMessages() {
    return JSON.parse(localStorage.getItem('messages') || '[]');
}

// Khởi tạo localStorage nếu chưa có
export function initLocalStorage() {
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', '[]');
    }
    if (!localStorage.getItem('userInfo')) {
        localStorage.setItem('userInfo', JSON.stringify({ username: 'Người dùng', plan: 'Free Plan' }));
    }
}

// Lấy thông tin user
export function getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo') || '{"username":"Người dùng","plan":"Free Plan"}');
}

// Đăng xuất user (xóa thông tin user và tin nhắn)
export function logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('messages');
    initLocalStorage();
}

// Xóa toàn bộ tin nhắn
export function clearChat() {
    localStorage.setItem('messages', '[]');
}

// Định dạng thời gian
export function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    
    const diff = now - date;
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays === 1) return 'Hôm qua';
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN');
}

// Tạo ID ngẫu nhiên
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}