// 初始化AOS动画库
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 初始化轮播
    const carousel = new bootstrap.Carousel(document.getElementById('mainCarousel'), {
        interval: 5000,
        ride: true
    });

    // 轮播图切换时触发动画
    document.getElementById('mainCarousel').addEventListener('slide.bs.carousel', function () {
        const activeCaption = document.querySelector('.carousel-item.active .carousel-caption');
        if (activeCaption) {
            activeCaption.querySelectorAll('[data-aos]').forEach(element => {
                element.classList.remove('aos-animate');
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, 10);
            });
        }
    });

    // 项目过滤功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 过滤项目
            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 项目详情模态框
    const modal = document.getElementById('projectModal');
    const detailButtons = document.querySelectorAll('.view-details-btn');
    const closeModal = document.querySelector('.close-modal');

    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            showProjectDetails(card);
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // 点击模态框外部区域关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // 添加ESC键关闭功能
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // 初始化3D模型展示
    initProjectModels();

    // AI对话相关代码
    document.addEventListener('DOMContentLoaded', function() {
        // ... 现有的初始化代码 ...

        // 自动调整文本框高度
        const textarea = document.getElementById('userInput');
        if (textarea) {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }

        // 发送消息
        const sendBtn = document.querySelector('.send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        // 快捷操作按钮
        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (textarea) {
                    textarea.value = btn.textContent;
                    textarea.focus();
                }
            });
        });

        // 清空对话
        const clearBtn = document.querySelector('.clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const messages = document.getElementById('chatMessages');
                if (messages) {
                    if (confirm('确定要清空当前对话吗？')) {
                        messages.innerHTML = '';
                        addSystemMessage('对话已清空，有什么我可以帮你的？');
                    }
                }
            });
        }
    });

    // 发送消息函数
    function sendMessage() {
        const textarea = document.getElementById('userInput');
        const messages = document.getElementById('chatMessages');
        
        if (!textarea || !messages || !textarea.value.trim()) return;

        // 添加用户消息
        const userMessage = createMessageElement(textarea.value, true);
        messages.appendChild(userMessage);

        // 清空输入框
        textarea.value = '';
        textarea.style.height = 'auto';

        // 滚动到底部
        messages.scrollTop = messages.scrollHeight;

        // 模拟AI响应
        setTimeout(() => {
            const response = "这是一个模拟的AI响应消息...";
            const aiMessage = createMessageElement(response, false);
            messages.appendChild(aiMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }

    // 创建消息元素
    function createMessageElement(text, isUser) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        div.innerHTML = `
            ${isUser ? '' : '<div class="message-avatar"><i class="fas fa-robot"></i></div>'}
            <div class="message-content">
                <div class="message-text">${text}</div>
            </div>
            ${isUser ? '<div class="message-avatar"><i class="fas fa-user"></i></div>' : ''}
        `;
        
        return div;
    }

    // 添加系统消息
    function addSystemMessage(text) {
        const messages = document.getElementById('chatMessages');
        if (messages) {
            const systemMessage = createMessageElement(text, false);
            messages.appendChild(systemMessage);
            messages.scrollTop = messages.scrollHeight;
        }
    }
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.7)';
    }
});

// 显示项目详情
function showProjectDetails(card) {
    const modal = document.getElementById('projectModal');
    const title = modal.querySelector('.modal-info h2');
    const description = modal.querySelector('.project-description');
    const techStack = modal.querySelector('.tech-stack');
    const timeline = modal.querySelector('.timeline');
    const achievements = modal.querySelector('.achievements-list');

    // 获取项目数据（这里可以根据实际需求从后端获取）
    const projectData = {
        title: card.querySelector('h3').textContent,
        description: '详细的项目描述...',
        techStack: ['技术1', '技术2', '技术3'],
        timeline: [
            { date: '2023-01', event: '项目启动' },
            { date: '2023-03', event: '核心功能完成' },
            { date: '2023-06', event: '项目发布' }
        ],
        achievements: [
            '省级比赛一等奖',
            '发明专利2项',
            '软件著作权1项'
        ]
    };

    // 更新模态框内容
    title.textContent = projectData.title;
    description.textContent = projectData.description;
    techStack.innerHTML = projectData.techStack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    timeline.innerHTML = projectData.timeline
        .map(item => `
            <div class="timeline-item">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-content">${item.event}</div>
            </div>
        `).join('');
    achievements.innerHTML = projectData.achievements
        .map(achievement => `<li>${achievement}</li>`)
        .join('');
}

// 初始化3D模型展示
function initProjectModels() {
    // 这里可以使用Three.js加载和展示3D模型
    // 示例代码将在后续实现
} 