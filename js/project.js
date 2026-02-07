/**
 * 作品详情页脚本
 * 根据URL参数加载对应的作品数据
 */

// 游戏项目数据
const projectsData = {
    1: {
        title: '魔女的棋局',
        subtitle: '数据与架构导向的策略游戏，核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑',
        category: '策略解谜',
        date: '2025年',
        role: '主程，后端数据层开发',
        tools: 'Unity, C#, ScriptableObject, JSON',
        tags: ['策略解谜', '2D', '数据驱动', '魔塔类'],
        description: `
            <p>《魔女的棋局》是一款数据与架构导向的策略解谜游戏，核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑。作为开拓芯2025参赛作品，项目展现了数据驱动设计的完整实践。</p>
            
            <h2>技术架构</h2>
            <p>项目采用Unity引擎开发，使用C#作为主要编程语言。核心设计理念是将游戏数据与代码逻辑分离，通过数据资产系统实现策划与开发的解耦，提升工作流效率。</p>
            
            <h2>ScriptableObject数据架构</h2>
            <p>使用Unity的ScriptableObject创建模块化的角色、物品、关卡数据资产。每个数据资产都是独立的可编程对象，包含完整的属性定义和配置信息。这种设计实现了策划案与代码的完全解耦，策划人员可以直接在Unity编辑器中创建和修改游戏数据，无需修改代码即可调整游戏平衡性。</p>
            
            <h2>JSON序列化存档系统</h2>
            <p>实现基于JSON的完整游戏状态序列化与反序列化系统。系统能够保存和加载复杂的玩家进度数据，包括角色状态、物品库存、关卡进度等。通过自定义序列化接口，确保所有关键游戏对象都能正确转换为JSON格式并完整恢复。</p>
            
            <h2>外部化对话与地图系统</h2>
            <p>将游戏内的对话树与关卡地图数据剥离为独立文件（JSON格式），并通过编辑器工具进行打包、加载与管理。这种设计便于内容迭代与本地化拓展，支持多语言切换和动态内容更新，无需重新编译游戏即可更新游戏内容。</p>
        `,
        heroType: 'bilibili',
        heroMedia: {
            type: 'bilibili',
            bvid: 'BV1T65LzGEhS',
            placeholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        gallery: [
            {
                src: 'images/mn_main.png',
                alt: '游戏主界面',
                fullWidth: false
            },
            {
                src: 'images/mn_game.png',
                alt: '数据资产系统',
                fullWidth: false
            },
            {
                src: 'images/mn_game2.png',
                alt: '关卡地图系统',
                fullWidth: false
            },
            {
                src: 'images/mn_gal.png',
                alt: '游戏内对话系统',
                fullWidth: false
            },
            {
                src: 'images/mn_shop.png',
                alt: '游戏内商店系统',
                fullWidth: false
            },
            {
                src: 'images/mn_save.png',
                alt: '游戏内存档系统',
                fullWidth: false
            }
        ],
        highlights: [
            {
                icon: '📦',
                title: 'ScriptableObject架构',
                description: '模块化数据资产系统，实现策划与代码解耦'
            },
            {
                icon: '💾',
                title: 'JSON存档系统',
                description: '完整的游戏状态序列化与反序列化实现'
            },
            {
                icon: '🌐',
                title: '外部化内容系统',
                description: '对话与地图数据外部化，支持内容迭代与本地化'
            }
        ],
        links: {
            github: 'https://github.com/Zhangkm233/DevilTower', // GitHub仓库链接
            download: 'https://pan.baidu.com/s/1oiyPDEEGWtAw8r0lfEHe-g?pwd=y1tm' // 下载链接
        }
    },
    2: {
        title: '约德尔卓德大冒险',
        subtitle: '融合Roguelike随机性与祖玛玩法，注重通过面向对象的设计和灵活的路径系统来构建可扩展的战斗体验',
        category: 'Roguelike',
        date: '2024年',
        role: '主程，后端数据层开发',
        tools: 'Unity, C#, Spline系统',
        tags: ['Roguelike', '祖玛核心玩法', '3D', '程序化'],
        description: `
            <p>《约德尔卓德大冒险》是一款融合Roguelike随机性与祖玛核心玩法的2D手机游戏。项目注重通过面向对象的设计和灵活的路径系统来构建可扩展的战斗体验，展现了程序化生成与面向对象设计的结合。</p>
            
            <h2>技术架构</h2>
            <p>项目使用Unity引擎开发，采用C#面向对象编程。核心设计理念是通过继承与多态实现灵活的游戏对象系统，通过Spline曲线系统实现复杂的敌人移动路径。</p>
            
            <h2>继承与多态设计</h2>
            <p>构建了球体类型的基类与多种派生类（如爆炸球、减速球、穿透球等）。基类定义了通用的碰撞检测、移动逻辑和生命周期管理，派生类通过重写虚方法实现特定的技能效果。通过多态处理碰撞与技能效果，降低了代码耦合度，便于扩展新的球体类型。</p>
            
            <h2>Spline曲线路径系统</h2>
            <p>利用Unity的Spline工具或自定义Spline系统为敌人生成和编辑平滑、复杂的移动路径。系统支持在编辑器中可视化编辑路径，支持多种路径类型（直线、曲线、循环等）。敌人在运行时沿Spline路径移动，实现了灵活的关卡设计和丰富的视觉表现。</p>
            
            <h2>Rogue式商店与升级系统</h2>
            <p>设计并实现了随机关卡中的商店模块，包含随机物品刷新、玩家资源结算与永久/临时升级的数据逻辑。系统通过权重表控制物品刷新概率，通过事件系统处理升级效果，支持多种升级类型（属性提升、技能解锁、被动效果等）。</p>
        `,
        heroType: 'image',
        heroMedia: {
            type: 'image',
            src: 'images/yde_main.png', 
            placeholder: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        gallery: [
            {
                src: 'images/yde_game1.png',
                alt: '游戏战斗场景',
                fullWidth: false
            },
            {
                src: 'images/yde_game2.png',
                alt: 'Spline路径系统',
                fullWidth: false
            },
            {
                src: 'images/yde_shop.png',
                alt: '商店与升级系统',
                fullWidth: true
            }
        ],
        highlights: [
            {
                icon: '🔷',
                title: '面向对象设计',
                description: '继承与多态实现可扩展的球体类型系统'
            },
            {
                icon: '🛤️',
                title: 'Spline路径系统',
                description: '灵活的敌人移动路径编辑与生成'
            },
            {
                icon: '🏪',
                title: 'Rogue式系统',
                description: '随机商店与升级系统的完整实现'
            }
        ],
        links: {
            github: '', // GitHub仓库链接
            download: 'https://share.weiyun.com/7717CpAQ' // 下载链接
        }
    },
    3: {
        title: '泡泡蛙',
        subtitle: '在严格时间限制下完成的平台跳跃游戏，聚焦于性能优化与系统弹性的快速实现',
        category: 'Game Jam',
        date: '2025年',
        role: '主程，后端数据层开发',
        tools: 'Unity, C#',
        tags: ['Game Jam', '2D平台跳跃', '快速原型','对象池系统'],
        description: `
            <p>《泡泡蛙》是在Game Jam限时开发环境下完成的2D平台跳跃游戏。项目聚焦于快速实现符合题目的核心玩法，展现了在时间压力下如何构建稳定、高效的游戏系统。</p>
            
            <h2>开发背景</h2>
            <p>Game Jam开发环境要求在极短时间内完成可玩的游戏原型。这要求开发者必须快速做出技术决策，优先实现核心功能，同时确保代码质量和系统稳定性。</p>
            
            <h2>快速迭代与优化</h2>
            <p>在有限时间内，通过模块化设计和代码复用，快速实现了核心玩法、UI系统、音效管理等完整功能。通过性能分析工具识别性能瓶颈，针对性地进行优化，确保游戏在目标平台上流畅运行。</p>
        
            <h2>对象池优化</h2>
            <p>为高频生成/销毁的游戏对象实现对象池管理系统。系统预先创建对象池，在需要时从池中获取对象，使用完毕后归还池中，避免频繁的内存分配与GC（垃圾回收）压力。通过对象池，有效控制了运行时内存分配，保障了游戏流畅性，即使在低端设备上也能稳定运行。</p>
        `,
        heroType: 'bilibili',
        heroMedia: {
            type: 'bilibili',
            bvid: 'BV1gjwrecEed',
            placeholder: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        gallery: [
            {
                src: 'images/ppw_main.png',
                alt: '游戏场景',
                fullWidth: false
            },
            {
                src: 'images/ppw_game.png',
                alt: '能力系统',
                fullWidth: false
            },
            {
                src: 'images/ppw_story.png',
                alt: '游戏intro',
                fullWidth: true
            }
        ],
        highlights: [
            {
                icon: '🔄',
                title: '快速原型',
                description: '在时间限制下实现符合题目的核心玩法'
            }
        ],
        links: {
            github: '', // GitHub仓库链接
            download: 'https://www.123684.com/s/iIlKVv-O0Ivd' // 下载链接
        }
    },
    4: {
        title: '棋兵弈阵',
        subtitle: '一款在Game Jam限时开发中完成的2D棋类游戏，核心在于通过ScriptableObject构建了一套灵活的技能效果系统，并利用程序化生成与寻路算法来创造动态的游戏体验',
        category: '棋类策略',
        date: '2025年',
        role: '后端数据层开发',
        tools: 'Unity, C#, ScriptableObject, A*算法',
        tags: ['CIGA Game Jam', '2D', '棋类策略', '数据驱动', '算法生成', '限时开发'],
        description: `
            <p>《棋兵弈阵》是一款在CIGA Game Jam限时开发中完成的2D棋类策略游戏。项目展现了快速原型与系统架构能力的完美结合，在严格时间限制下，通过良好的架构设计（ScriptableObject接口）和稳定的算法（A*）高效实现了核心玩法。</p>
            
            <h2>项目背景</h2>
            <p>Game Jam开发环境要求在极短时间内完成可玩的游戏原型。本项目在时间压力下，通过数据驱动设计和核心算法的结合，快速构建了一个具有深度策略性的棋类游戏系统。</p>
            
            <h2>基于ScriptableObject的模块化效果系统</h2>
            <p>使用Unity的ScriptableObject为每个棋子技能创建独立的数据资产。设计了一套统一的IEffect接口或基类，为策划提供了"即插即用"的效果制作流程。这种架构设计使得无需修改核心代码即可创建新技能，极大加速了玩法迭代速度。每个技能效果都是独立的ScriptableObject资产，包含效果类型、持续时间、作用范围等配置信息，通过统一的接口进行调用和执行。</p>
            
            <h2>程序化关卡元素生成</h2>
            <p>实现算法在棋盘上随机生成有意义的障碍物布局，确保每局游戏的独特性和策略深度，而不仅仅是完全随机。生成算法考虑了障碍物的分布密度、位置关系、以及它们对游戏策略的影响，确保生成的关卡既具有随机性，又保持策略平衡。通过权重系统和约束条件，算法能够生成既有趣又具有挑战性的关卡布局。</p>
            
            <h2>智能敌人寻路系统</h2>
            <p>在棋盘的网格化数据结构上，集成A*（A-Star）寻路算法，驱动敌人棋子根据实时棋盘状态进行智能移动和决策，构成对玩家的核心挑战。A*算法能够高效地找到从起点到终点的最优路径，同时考虑障碍物、其他棋子位置等动态因素。敌人AI通过评估棋盘状态，选择最优的移动策略，为玩家提供具有挑战性的对手。</p>
            
            <h2>架构优势</h2>
            <p>项目展现了在时间限制下如何通过良好的架构设计实现高效开发。ScriptableObject接口系统使得技能扩展变得简单快捷，而A*算法的稳定实现确保了核心玩法的可靠性。这种"架构+算法"的组合，使得项目在Game Jam的严格时间限制下，依然能够实现高质量的核心功能。</p>
        `,
        heroType: 'bilibili',
        heroMedia: {
            type: 'bilibili',
            bvid: 'BV1VZ3wzrE7F',
            placeholder: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
        },
        gallery: [
            {
                src: 'images/qbyz_main.png',
                alt: '游戏主界面',
                fullWidth: false
            },
            {
                src: 'images/qbyz_game.png',
                alt: 'ScriptableObject效果系统',
                fullWidth: false
            },
            {
                src: 'images/qbyz_game2.png',
                alt: 'A*寻路算法实现',
                fullWidth: true
            },
            {
                src: 'images/qbyz_game3.png',
                alt: '程序化关卡生成',
                fullWidth: false
            }
        ],
        highlights: [
            {
                icon: '📦',
                title: '模块化效果系统',
                description: '基于ScriptableObject的即插即用技能系统，加速玩法迭代'
            },
            {
                icon: '🗺️',
                title: 'A*寻路算法',
                description: '智能敌人AI系统，实现动态决策与路径规划'
            },
            {
                icon: '🎲',
                title: '程序化生成',
                description: '算法驱动的关卡元素生成，确保策略深度与随机性'
            },
            {
                icon: '⚡',
                title: '快速原型',
                description: '在时间限制下通过良好架构实现高质量核心功能'
            }
        ],
        links: {
            github: 'https://github.com/Zhangkm233/CiGAGameJam202506', // GitHub仓库链接
            download: 'https://pan.baidu.com/s/1w6Un9ZRSYLp1Bv3tysoECQ?pwd=ydbm ' // 下载链接
        }
    },
    5: {
    title: '跟你豹了',
    subtitle: '参加开拓芯奇点律动Vol2的比赛，以膨胀为主题的平台跳跃游戏，使用状态机管理游戏和玩家的对象状态。',
    category: '平台跳跃',
    date: '2026年',
    role: '主程，游戏逻辑开发，玩家操控系统',
    tools: 'Unity, C#',
    tags: ['平台跳跃', '知识锁'],
    description: `参加开拓芯奇点律动Vol2的比赛，以膨胀为主题的平台跳跃游戏。`,
    heroType: 'bilibili',  // 或 'image'
    heroMedia: {
        type: 'bilibili',  // 或 'image'
        bvid: 'BV1QoFNzUETM',      // 如果是视频
        // 或 src: 'images/xxx.png' 如果是图片
        placeholder: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    gallery: [
        {
            src: 'images/gnbl_main.png',
            alt: '游戏主界面',
            fullWidth: false
        },
        {
            src: 'images/gnbl_game1.png',
            alt: '游戏场景',
            fullWidth: false
        },
        {
            src: 'images/gnbl_tut.png',
            alt: '游戏教程',
            fullWidth: false
        },

        // 更多图片...
    ],
    highlights: [
        {
            icon: '🔷',
            title: '状态机管理',
            description: '使用状态机管理游戏和玩家的对象状态'
        },
        {
            icon: '🔷',
            title: '地图序列化',
            description: '使用Tiled软件进行地图开发，序列化后在Unity中使用'
        }
    ],
    links: {
        github: 'https://github.com/Zhangkm233/Inflate',
        download: 'https://www.123865.com/s/iIlKVv-9FYvd'
    }
}
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    loadProject();
    initImageLightbox();
});

/**
 * 加载作品数据
 */
function loadProject() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId || !projectsData[projectId]) {
        showError('作品不存在');
        return;
    }
    
    const project = projectsData[projectId];
    
    // 更新页面标题
    document.title = `${project.title} - 独立游戏制作人技术作品集`;
    
    // 加载作品数据
    updateProjectHeader(project);
    updateHeroMedia(project);
    updateProjectDescription(project);
    updateProjectSidebar(project);
    updateProjectGallery(project);
    updateProjectHighlights(project);
    updateProjectLinks(project);
}

/**
 * 更新作品头部信息
 */
function updateProjectHeader(project) {
    const titleEl = document.getElementById('projectTitle');
    const subtitleEl = document.getElementById('projectSubtitle');
    const tagsEl = document.getElementById('projectTags');
    
    if (titleEl) titleEl.textContent = project.title;
    if (subtitleEl) subtitleEl.textContent = project.subtitle;
    
    if (tagsEl) {
        tagsEl.innerHTML = project.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
    }
}

/**
 * 更新封面媒体
 */
function updateHeroMedia(project) {
    const heroMediaEl = document.getElementById('heroMedia');
    if (!heroMediaEl) return;
    
    const media = project.heroMedia;
    
    if (media.type === 'bilibili') {
        // Bilibili视频嵌入
        const bvid = media.bvid || 'BV1xxxxxxxxx';
        heroMediaEl.innerHTML = `
            <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 24px; overflow: hidden; background: ${media.placeholder};">
                <iframe 
                    src="https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0" 
                    scrolling="no" 
                    border="0" 
                    frameborder="no" 
                    framespacing="0" 
                    allowfullscreen="true"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 24px;"
                ></iframe>
            </div>
        `;
    } else if (media.type === 'video') {
        heroMediaEl.innerHTML = `
            <video 
                controls 
                poster="${media.poster || ''}"
                style="width: 100%; height: auto; display: block; border-radius: 24px;"
            >
                <source src="${media.src}" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
        `;
    } else {
        heroMediaEl.innerHTML = `
            <img 
                src="${media.src}" 
                alt="${project.title}"
                style="width: 100%; height: auto; display: block; border-radius: 24px;"
                onerror="this.onerror=null; this.style.background='${media.placeholder}'; this.style.minHeight='400px'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<span style=\\'color: white; font-size: 1.5rem; font-weight: 600;\\'>${project.title}</span>';"
            >
        `;
    }
}

/**
 * 更新作品描述
 */
function updateProjectDescription(project) {
    const descEl = document.getElementById('projectDescription');
    if (descEl) {
        descEl.innerHTML = project.description;
    }
}

/**
 * 更新侧边栏信息
 */
function updateProjectSidebar(project) {
    const categoryEl = document.getElementById('projectCategory');
    const dateEl = document.getElementById('projectDate');
    const roleEl = document.getElementById('projectRole');
    const toolsEl = document.getElementById('projectTools');
    
    if (categoryEl) categoryEl.textContent = project.category;
    if (dateEl) dateEl.textContent = project.date;
    if (roleEl) roleEl.textContent = project.role;
    if (toolsEl) toolsEl.textContent = project.tools;
}

/**
 * 更新作品图片展示
 */
function updateProjectGallery(project) {
    const galleryGridEl = document.getElementById('galleryGrid');
    if (!galleryGridEl || !project.gallery || project.gallery.length === 0) {
        const gallerySection = document.getElementById('projectGallery');
        if (gallerySection) gallerySection.style.display = 'none';
        return;
    }
    
    galleryGridEl.innerHTML = project.gallery.map((item, index) => {
        const fullWidthClass = item.fullWidth ? 'full-width' : '';
        return `
            <div class="gallery-item ${fullWidthClass}" data-index="${index}">
                <img 
                    src="${item.src}" 
                    alt="${item.alt}"
                    loading="lazy"
                    onerror="this.onerror=null; this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; this.style.minHeight='300px'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<span style=\\'color: white;\\'>${item.alt}</span>';"
                >
            </div>
        `;
    }).join('');
}

/**
 * 更新项目亮点
 */
function updateProjectHighlights(project) {
    const highlightsEl = document.getElementById('projectHighlights');
    if (!highlightsEl || !project.highlights || project.highlights.length === 0) {
        if (highlightsEl) highlightsEl.style.display = 'none';
        return;
    }
    
    highlightsEl.innerHTML = `
        <div class="highlights-grid">
            ${project.highlights.map(highlight => `
                <div class="highlight-card">
                    <div class="highlight-icon">${highlight.icon}</div>
                    <h3>${highlight.title}</h3>
                    <p>${highlight.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * 更新项目链接
 */
function updateProjectLinks(project) {
    const linksEl = document.getElementById('projectLinks');
    if (!linksEl || !project.links) {
        if (linksEl) linksEl.style.display = 'none';
        return;
    }
    
    const links = project.links;
    const hasLinks = (links.github && links.github.trim()) || (links.download && links.download.trim());
    
    if (!hasLinks) {
        linksEl.style.display = 'none';
        return;
    }
    
    let linksHTML = '<div class="info-card project-links-card"><h3>项目链接</h3><div class="project-links-buttons">';
    
    if (links.github && links.github.trim()) {
        linksHTML += `
            <a href="${links.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn project-link-github">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
            </a>
        `;
    }
    
    if (links.download && links.download.trim()) {
        linksHTML += `
            <a href="${links.download}" target="_blank" rel="noopener noreferrer" class="project-link-btn project-link-download">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>下载</span>
            </a>
        `;
    }
    
    linksHTML += '</div></div>';
    linksEl.innerHTML = linksHTML;
}

/**
 * 初始化图片灯箱效果
 */
function initImageLightbox() {
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const img = galleryItem.querySelector('img');
            if (img && img.src) {
                // 简单的图片预览（可以后续扩展为完整的灯箱效果）
                window.open(img.src, '_blank');
            }
        }
    });
}

/**
 * 显示错误信息
 */
function showError(message) {
    const main = document.querySelector('.project-detail');
    if (main) {
        main.innerHTML = `
            <div class="container" style="padding: 4rem 1rem; text-align: center;">
                <h1 style="color: var(--text-primary); margin-bottom: 1rem;">${message}</h1>
                <a href="index.html#portfolio" class="btn btn-primary">返回游戏项目</a>
            </div>
        `;
    }
}

