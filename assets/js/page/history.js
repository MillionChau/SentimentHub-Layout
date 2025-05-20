import { formatTime } from '../utils.js';

export function init() {
    loadHistoryItems();
    initHistoryEvents();
}

function loadHistoryItems() {
    const historyList = document.getElementById('historyList');
    const noHistory = document.getElementById('noHistory');
    
    // Lấy dữ liệu từ localStorage
    const historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    if (historyData.length === 0) {
        historyList.style.display = 'none';
        noHistory.style.display = 'block';
        return;
    }
    
    noHistory.style.display = 'none';
    historyList.style.display = 'block';
    historyList.innerHTML = '';
    
    // Sắp xếp theo thời gian mới nhất
    const sortedHistory = [...historyData].sort((a, b) => b.timestamp - a.timestamp);
    
    sortedHistory.forEach(item => {
        const template = document.getElementById('history-item-template');
        const clone = template.content.cloneNode(true);
        
        const historyItem = clone.querySelector('.history-item');
        historyItem.dataset.id = item.id;
        
        clone.querySelector('.history-title').textContent = item.title;
        clone.querySelector('.history-preview').textContent = item.preview;
        clone.querySelector('.history-time').textContent = formatTime(item.timestamp);
        
        historyList.appendChild(clone);
    });
}

function initHistoryEvents() {
    // Xóa tất cả lịch sử
    document.getElementById('clear-all-history')?.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện?')) {
            localStorage.removeItem('chatHistory');
            loadHistoryItems();
        }
    });
    
    // Xử lý các nút trên mỗi item
    document.addEventListener('click', (e) => {
        const historyItem = e.target.closest('.history-item');
        if (!historyItem) return;
        
        const itemId = historyItem.dataset.id;
        
        // Nút mở lại
        if (e.target.closest('.restore-btn')) {
            restoreChat(itemId);
        }
        
        // Nút xóa
        if (e.target.closest('.delete-btn')) {
            deleteHistoryItem(itemId);
        }
    });
}

function restoreChat(itemId) {
    const historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const chat = historyData.find(item => item.id === itemId);
    
    if (chat) {
        // Chuyển đến trang chat và load lại cuộc trò chuyện
        navigateTo('home');
        
        // Xóa chat hiện tại
        document.getElementById('chatContainer').innerHTML = '';
        
        // Thêm lại các tin nhắn
        chat.messages.forEach(msg => {
            addMessage(msg.content, msg.sender);
        });
    }
}

function deleteHistoryItem(itemId) {
    if (confirm('Bạn có chắc muốn xóa cuộc trò chuyện này khỏi lịch sử?')) {
        let historyData = JSON.parse(localStorage.getItem('chatHistory')) || [];
        historyData = historyData.filter(item => item.id !== itemId);
        localStorage.setItem('chatHistory', JSON.stringify(historyData));
        loadHistoryItems();
    }
}