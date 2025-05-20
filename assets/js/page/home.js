import { addMessage, showTypingIndicator, removeTypingIndicator } from '../components/chat-container.js';

export function init() {
    // Load welcome message
    loadWelcomeMessage();
    
    // Xử lý các câu hỏi nhanh
    document.querySelectorAll('.quick-question').forEach(question => {
        question.addEventListener('click', () => {
            const text = question.textContent;
            sendUserMessage(text);
        });
    });
    
    // Khởi tạo chat container
    initChatContainer();
}

function loadWelcomeMessage() {
    // Thêm tin nhắn chào mừng nếu chưa có tin nhắn nào
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer && chatContainer.children.length === 0) {
        addMessage('Xin chào! Tôi là trợ lý ảo Shopee. Tôi có thể giúp gì cho bạn hôm nay?', 'bot');
    }
}

function sendUserMessage(text) {
    addMessage(text, 'user');
    
    showTypingIndicator();
    
    // Simulate bot response
    setTimeout(() => {
        removeTypingIndicator();
        
        const responses = {
            "Kiểm tra đơn hàng của tôi": "Vui lòng cung cấp mã đơn hàng hoặc số điện thoại đặt hàng.",
            "Tìm sản phẩm điện thoại": "Bạn đang tìm điện thoại hãng nào và ngân sách khoảng bao nhiêu?",
            "Chính sách đổi trả": "Bạn có thể đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm còn nguyên seal và hóa đơn.",
            "Khuyến mãi hiện có": "Hiện đang có chương trình giảm giá 50% cho nhiều sản phẩm. Bạn quan tâm đến danh mục nào?"
        };
        
        const response = responses[text] || "Tôi có thể giúp gì thêm cho bạn?";
        addMessage(response, 'bot');
    }, 1000);
}

function initChatContainer() {
    // Thêm các sự kiện cho chat container nếu cần
}