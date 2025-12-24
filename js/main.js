/**
 * Modern Design Portfolio - 主要交互脚本
 * 包含导航、滚动动画、表单处理等功能
 */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initBackToTop();
    initNavbarScroll();
    initPortfolioCarousel();
});

/**
 * 导航栏功能初始化
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            updateActiveNavLink(link);
        });
    });
}

/**
 * 更新活动导航链接
 */
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 根据滚动位置更新活动导航链接
        updateActiveNavOnScroll();
        
        lastScroll = currentScroll;
    });
}

/**
 * 根据滚动位置更新活动导航链接
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * 平滑滚动初始化
 */
function initSmoothScroll() {
    // 确保所有锚点链接平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 忽略空锚点
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 滚动动画初始化
 */
function initScrollAnimations() {
    // 使用 Intersection Observer 实现滚动触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.portfolio-card, .about-text, .skills, .contact-item, .contact-form'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 为作品集卡片添加延迟动画
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * 联系表单处理
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 简单的表单验证
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showFormMessage('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟表单提交（实际应用中应连接到后端API）
            console.log('表单数据:', formData);
            
            // 显示成功消息
            showFormMessage('消息发送成功！我会尽快回复您。', 'success');
            
            // 重置表单
            contactForm.reset();
        });
    }
}

/**
 * 显示表单消息
 */
function showFormMessage(message, type) {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 12px;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2);' 
            : 'background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2);'
        }
    `;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        messageEl.style.transition = 'all 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

/**
 * 验证邮箱格式
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 返回顶部按钮初始化
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 技能条动画（当技能区域进入视口时触发）
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        // 强制重排
                        bar.offsetHeight;
                        bar.style.width = width;
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// 初始化技能条动画
document.addEventListener('DOMContentLoaded', initSkillBars);

/**
 * 作品集轮播功能初始化
 */
function initPortfolioCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicators = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !prevBtn || !nextBtn || !indicators) {
        return; // 如果元素不存在，退出
    }
    
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoPlayInterval = null;
    
    // 创建指示器
    function createIndicators() {
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(indicator);
        }
    }
    
    // 更新轮播位置
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // 更新指示器
        const indicatorElements = indicators.querySelectorAll('.carousel-indicator');
        indicatorElements.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // 更新按钮状态
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    // 上一张
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            resetAutoPlay();
        }
    }
    
    // 下一张
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
            resetAutoPlay();
        }
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0); // 循环到第一张
            }
        }, 10000); // 每10秒切换一次
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        startAutoPlay();
    }
    
    // 绑定事件
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        const portfolioSection = document.getElementById('portfolio');
        if (!portfolioSection) return;
        
        const rect = portfolioSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // 触摸滑动支持（移动端）
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // 向左滑动，显示下一张
            } else {
                prevSlide(); // 向右滑动，显示上一张
            }
        }
    }
    
    // 鼠标悬停时暂停自动播放
    const carouselContainer = carouselTrack.closest('.portfolio-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }
    
    // 初始化
    createIndicators();
    updateCarousel();
    startAutoPlay();
}

/**
 * 页面加载动画
 */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// 设置初始透明度
document.body.style.opacity = '0';

