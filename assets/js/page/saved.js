import { formatTime } from '../utils.js';

export function init() {
    loadSavedItems();
    initSavedEvents();
}

function loadSavedItems() {
    const savedList = document.getElementById('savedList');
    const noSaved = document.getElementById('noSaved');
    
    // Lấy dữ liệu từ localStorage
    const savedData = JSON.parse(localStorage.getItem('savedMessages')) || [];
    
    if (savedData.length === 0) {
        savedList.style.display = 'none';
        noSaved.style.display = 'block';
        return;
    }
    
    noSaved.style.display = 'none';
    savedList.style.display = 'block';
    savedList.innerHTML = '';
    
    // Sắp xếp theo thời gian mới nhất
    const sortedSaved = [...savedData].sort((a, b) => b.timestamp - a.timestamp);
    
    sortedSaved.forEach(item => {
        const template = document.getElementById('saved-item-template');
        const clone = template.content.cloneNode(true);
        
        const savedItem = clone.querySelector('.saved-item');
        savedItem.dataset.id = item.id;
        
        clone.querySelector('.saved-title').textContent = item.title;
        clone.querySelector('.saved-content').textContent = item.content;
        clone.querySelector('.saved-date').textContent = formatTime(item.timestamp);
        
        savedList.appendChild(clone);
    });
}

function initSavedEvents() {
    // Sắp xếp
    document.querySelectorAll('[data-sort]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sortType = e.target.dataset.sort;
            sortSavedItems(sortType);
        });
    });
    
    // Xử lý các nút trên mỗi item
    document.addEventListener('click', (e) => {
        const savedItem = e.target.closest('.saved-item');
        if (!savedItem) return;
        
        const itemId = savedItem.dataset.id;
        
        // Nút xem
        if (e.target.closest('.view-btn')) {
            viewSavedMessage(itemId);
        }
        
        // Nút bỏ lưu
        if (e.target.closest('.unsave-btn')) {
            unsaveMessage(itemId);
        }
    });
}

function sortSavedItems(sortType) {
    let savedData = JSON.parse(localStorage.getItem('savedMessages')) || [];
    
    switch (sortType) {
        case 'newest':
            savedData.sort((a, b) => b.timestamp - a.timestamp);
            break;
        case 'oldest':
            savedData.sort((a, b) => a.timestamp - b.timestamp);
            break;
        case 'alphabet':
            savedData.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    
    localStorage.setItem('savedMessages', JSON.stringify(savedData));
    loadSavedItems();
}

function viewSavedMessage(itemId) {
    const savedData = JSON.parse(localStorage.getItem('savedMessages')) || [];
    const message = savedData.find(item => item.id === itemId);
    
    if (message) {
        alert(`Tin nhắn đã lưu:\n\n${message.title}\n\n${message.content}`);
    }
}

function unsaveMessage(itemId) {
    if (confirm('Bạn có chắc muốn bỏ lưu tin nhắn này?')) {
        let savedData = JSON.parse(localStorage.getItem('savedMessages')) || [];
        savedData = savedData.filter(item => item.id !== itemId);
        localStorage.setItem('savedMessages', JSON.stringify(savedData));
        loadSavedItems();
    }
}