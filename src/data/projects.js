/**
 * 游戏项目数据集中管理
 * 新增项目只需在此追加，首页与详情页自动渲染。
 *
 * 字段说明：
 *   id              唯一标识（数字，用于 /project/:id 路由）
 *   title           项目名
 *   subtitle        详情页副标题（一句话定位）
 *   category        主分类（用于首页筛选，需与 categories 保持一致）
 *   date            年份
 *   role            担任角色
 *   tools           技术栈
 *   tags            标签
 *   cover           卡片封面图
 *   cardDescription 卡片上的简介（1-2 句）
 *   description     详情页富文本（HTML 字符串）
 *   heroMedia       头图：{ type: 'bilibili', bvid } 或 { type: 'image', src }
 *   gallery         画廊：[{ src, alt, fullWidth? }]
 *   highlights      亮点：[{ icon, title, description }]
 *   links           { steam?, github?, download? }，留空的不会渲染按钮
 *   featured        是否在首页精选区突出展示
 */

// Vite base 路径前缀，确保开发与部署环境下静态资源路径正确
const BASE = import.meta.env.BASE_URL

function img(path) {
  return `${BASE}${path.replace(/^\//, '')}`
}

export const projects = [
  {
    id: 6,
    title: '心镇图书馆',
    subtitle:
      '以「书」为构筑单位的卡牌策略游戏，已在 Steam 上架。负责游戏逻辑、UI 架构与开发工具，沉淀出一套可复用的底层框架',
    category: '卡牌策略',
    date: '2026年2月 — 至今',
    role: '程序：游戏逻辑、UI 架构、开发工具',
    tools: 'Unity, C#, UGUI, 泛型事件总线, 工厂模式',
    tags: ['卡牌构筑', '策略', 'Steam', '框架设计'],
    cover: img('/images/heartlib_ss1.webp'),
    cardDescription:
      '《心镇图书馆》卡牌构筑策略游戏，已上架 Steam。担任程序岗位，负责游戏逻辑实现、UI 架构设计与开发工具设计，并主导了泛型事件总线、栈式 UGUI 界面框架与工厂化效果系统等底层架构。',
    description: `
      <p>《心镇图书馆 HeartLib》是一款卡牌构筑策略游戏，2026 年 2 月 13 日起开发至今，已上架 Steam。玩家扮演心镇的新任图书管理员，借助「心之灯塔」的力量，通过插画、书页与阅读映像抵御来犯之敌。</p>
      <p>我在项目中担任<strong>程序</strong>岗位，使用 Unity 引擎、以 C# 为主要语言进行开发，负责<strong>游戏逻辑实现、UI 架构设计、开发工具设计</strong>。</p>

      <h2>以「书」为单位的构筑系统</h2>
      <p>游戏的牌组构筑不发生在单张卡牌层面，而是以「书」为单位进行。每本书是一个卡包，内含一组彼此关联的卡牌：负责串联的「插画」、产生各类效果的「书页」，以及需要蓄力才能使用的强力卡牌「阅读映像」。这种设计显著降低了构筑的心智负担，让玩家可以按风格整体选取而非逐张权衡。</p>

      <h2>路径规划式战斗</h2>
      <p>战斗的核心机制是「Plot」：玩家沿着卡牌上的轨迹，在地面规划出防御路径。在位置不断变化的过程中，寻找一条能够拦截所有敌人的路线。插画卡作为连接器使用，数量有限但能帮助平滑整条路线，为路径规划提供了额外的策略空间。</p>

      <h2>影响值系统</h2>
      <p>每次交锋胜利后，卡牌会在地面留下「影响」。影响提供不同种类的概率性效果，当叠加到 5 层时必定触发。不同种类的影响会带来截然不同的战斗体验：选择堆叠力量的首领，或是减少伤害的守护者，会导向完全不同的构筑与打法。守护者不必惧怕低力量攻击，却难以承受高力量敌人；首领能够击穿高力量敌人，但手牌耗尽时需要投机者来补足。</p>

      <h2>技术实现：泛型事件总线</h2>
      <p>设计并实现了基于<strong>泛型事件总线</strong>的底层管理架构。事件以类型参数区分，订阅与派发在编译期即可获得类型约束，避免了传统字符串键事件系统的运行时错误与装箱开销。各系统之间通过事件解耦，新增玩法模块时无需修改既有系统，显著降低了耦合度与回归风险。</p>

      <h2>技术实现：栈式 UGUI 通用界面框架</h2>
      <p>基于<strong>单例 + 栈管理</strong>架构，构建了一套层级化、可复用的 UGUI 通用界面框架。界面按打开顺序压入栈中，关闭时自动回退到上一层，天然支持弹窗、返回、多层嵌套等常见交互；配合单例入口统一调度，任何界面都只需关注自身逻辑，无需关心层级与显示顺序。这套框架在项目内被反复复用，新界面的接入成本被压到极低。</p>

      <h2>技术实现：工厂模式的效果与数据配置体系</h2>
      <p>使用<strong>工厂设计模式</strong>建设效果系统与数据配置体系。效果类型与数据配置分离，新增一种卡牌效果只需注册对应的工厂实现与配置数据，核心战斗流程无需改动。这使策划侧的内容扩充与程序侧的逻辑演进可以并行推进。</p>

      <h2>开发工具与 AI 辅助</h2>
      <p>开发了多个供引擎与代码使用的工具，把重复性的配置、检查与生成工作从手工流程中剥离出来。同时结合 AI 工具辅助日常开发，用于代码片段生成、重构建议与文档整理，在保证代码质量的前提下提升了整体开发效率。</p>
    `,
    heroMedia: { type: 'image', src: img('/images/heartlib_ss1.webp') },
    gallery: [
      { src: img('/images/heartlib_ext1.avif'), alt: '路径规划式战斗界面', fullWidth: false },
      { src: img('/images/heartlib_ext2.avif'), alt: '以书为单位的牌组构筑', fullWidth: false },
      { src: img('/images/heartlib_ext3.avif'), alt: '影响值系统', fullWidth: true }
    ],
    highlights: [
      { icon: '📡', title: '泛型事件总线', description: '类型安全的底层事件架构，系统间彻底解耦' },
      { icon: '🗂️', title: '栈式 UGUI 框架', description: '单例 + 栈管理，层级化可复用的通用界面框架' },
      { icon: '🏭', title: '工厂化效果系统', description: '效果与配置分离，新效果即插即用' },
      { icon: '🛠️', title: '开发工具链', description: '为引擎与代码侧开发多个提效工具' }
    ],
    links: {
      steam: 'https://store.steampowered.com/app/5186120/'
    },
    featured: true,
    badge: '重点作品'
  },
  {
    id: 7,
    title: '古之回响',
    subtitle:
      '类《巴别塔圣歌》的文字解读解谜游戏，通过观察动物对古代文字的反应来推断语义，逐步复原破损的石板',
    category: '解谜',
    date: '2026年4月11日 — 4月13日',
    role: '程序：游戏系统、逻辑、流程',
    tools: 'Unity, C#, 工厂模式, 数据驱动',
    tags: ['解谜', 'Game Jam', '文字解读', '腾讯高校极限开发大赛'],
    cover: img('/images/gzhx_cover.webp'),
    cardDescription:
      '参加腾讯高校极限开发大赛（主题 echo）的解谜游戏。玩家扮演考古学者，通过观察动物对古代文字的反应来推断语义，复原破损的石板。实现了基于工厂模式的数据驱动加载机制。',
    description: `
      <p>《古之回响》是一款类《巴别塔圣歌》的文字解读解谜游戏，2026 年 4 月 11 日至 13 日开发完成，参加<strong>腾讯高校极限开发大赛</strong>。本次 Game Jam 主题为「echo」。</p>
      <p>你扮演一位考古学者，在废墟中挖掘出记载着古代文字的石板。这些石板似乎记录了动物们交流的过程——坏消息是，它们大多有所破损。好在你是最优秀的考古学者，是时候自己推断并复原它们了。</p>
      <p>我在项目中担任<strong>程序</strong>岗位，使用 Unity 引擎、以 C# 为主要语言进行开发，负责<strong>游戏系统、逻辑与流程的实现</strong>。</p>

      <h2>玩法：从反应反推语义</h2>
      <p>玩家在左侧可以看到写着古代文字的石板，每块石板都有所缺失。玩家需要根据不同动物对古代文字的反应来推断内容，同时逐步获得越来越多动物的习性特点，并据此完成对古代石板的复原。玩家在自己的笔记中填写所认为的答案，成功复原石板即可进入下一关。</p>
      <p>游戏鼓励对思考的反馈，给了玩家足够的填写笔记、查询手册的空间，辅助玩家完成推理，而不是靠反复试错。</p>

      <h2>技术实现：工厂模式的数据驱动加载</h2>
      <p>实现了基于<strong>工厂设计模式</strong>的数据驱动加载机制。关卡、石板、古代文字与动物习性等数据均从外部配置加载，由工厂根据类型标识创建对应的数据对象与逻辑处理器。新增关卡或文字类型时只需补充配置与对应的工厂实现，无需改动核心流程——这在只有三天开发时间的 Game Jam 中尤为关键，让内容填充与程序开发可以并行推进。</p>

      <h2>与「echo」主题的呼应</h2>
      <p>游戏中有两点体现 echo：其一是动物们不断对同一句话进行「翻译」，但在翻译的过程中逐渐失真、变成另外一种模样，这如同一种回响；其二在于古代的文字一直到现在都还有人能够复原，将古代的「动物历史」抽象地回响到了现代，就像是古代的人在遥遥向现代人呼唤——这也是一种回响。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1EP5t6LEqY' },
    gallery: [
      { src: img('/images/gzhx_cover.webp'), alt: '游戏主菜单', fullWidth: true }
    ],
    highlights: [
      { icon: '🔤', title: '文字解读', description: '通过动物反应反推古代文字语义，玩法参考《巴别塔圣歌》' },
      { icon: '🏭', title: '工厂化数据加载', description: '基于工厂模式的数据驱动机制，内容与逻辑分离' },
      { icon: '⏱️', title: '三天极限开发', description: '腾讯高校极限开发大赛参赛作品' }
    ],
    links: {
      download: 'https://pan.baidu.com/s/1AY4KQhCoujDTZOMRH5UaIw?pwd=kgw6',
      video: 'https://www.bilibili.com/video/BV1EP5t6LEqY'
    }
  },
  {
    id: 1,
    title: '魔女的棋局',
    subtitle:
      '数据与架构导向的策略游戏，核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑',
    category: '策略解谜',
    date: '2025年',
    role: '主程，后端数据层开发',
    tools: 'Unity, C#, ScriptableObject, JSON',
    tags: ['策略解谜', '2D', '数据驱动', '魔塔类'],
    cover: img('/images/mn_main.webp'),
    cardDescription:
      '数据与架构导向的策略游戏，基于 ScriptableObject 的模块化数据资产系统，实现策划与代码解耦。采用 JSON 序列化存档系统，支持复杂游戏状态的完整保存与加载。',
    description: `
      <p>《魔女的棋局》是一款数据与架构导向的策略解谜游戏，核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑。作为开拓芯 2025 参赛作品，项目展现了数据驱动设计的完整实践。</p>
      <h2>技术架构</h2>
      <p>项目采用 Unity 引擎开发，使用 C# 作为主要编程语言。核心设计理念是将游戏数据与代码逻辑分离，通过数据资产系统实现策划与开发的解耦，提升工作流效率。</p>
      <h2>ScriptableObject 数据架构</h2>
      <p>使用 Unity 的 ScriptableObject 创建模块化的角色、物品、关卡数据资产。每个数据资产都是独立的可编程对象，包含完整的属性定义和配置信息。这种设计实现了策划案与代码的完全解耦，策划人员可以直接在 Unity 编辑器中创建和修改游戏数据，无需修改代码即可调整游戏平衡性。</p>
      <h2>JSON 序列化存档系统</h2>
      <p>实现基于 JSON 的完整游戏状态序列化与反序列化系统。系统能够保存和加载复杂的玩家进度数据，包括角色状态、物品库存、关卡进度等。通过自定义序列化接口，确保所有关键游戏对象都能正确转换为 JSON 格式并完整恢复。</p>
      <h2>外部化对话与地图系统</h2>
      <p>将游戏内的对话树与关卡地图数据剥离为独立文件（JSON 格式），并通过编辑器工具进行打包、加载与管理。这种设计便于内容迭代与本地化拓展，支持多语言切换和动态内容更新，无需重新编译游戏即可更新游戏内容。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1T65LzGEhS' },
    gallery: [
      { src: img('/images/mn_main.webp'), alt: '游戏主界面' },
      { src: img('/images/mn_game.webp'), alt: '数据资产系统' },
      { src: img('/images/mn_game2.webp'), alt: '关卡地图系统' },
      { src: img('/images/mn_gal.webp'), alt: '游戏内对话系统' },
      { src: img('/images/mn_shop.webp'), alt: '游戏内商店系统' },
      { src: img('/images/mn_save.webp'), alt: '游戏内存档系统' }
    ],
    highlights: [
      { icon: '📦', title: 'ScriptableObject 架构', description: '模块化数据资产系统，实现策划与代码解耦' },
      { icon: '💾', title: 'JSON 存档系统', description: '完整的游戏状态序列化与反序列化实现' },
      { icon: '🌐', title: '外部化内容系统', description: '对话与地图数据外部化，支持内容迭代与本地化' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/DevilTower',
      download: 'https://pan.baidu.com/s/1oiyPDEEGWtAw8r0lfEHe-g?pwd=y1tm'
    }
  },
  {
    id: 2,
    title: '约德尔卓德大冒险',
    subtitle:
      '融合 Roguelike 随机性与祖玛玩法，注重通过面向对象的设计和灵活的路径系统来构建可扩展的战斗体验',
    category: 'Roguelike',
    date: '2024年',
    role: '主程，后端数据层开发',
    tools: 'Unity, C#, Spline 系统',
    tags: ['Roguelike', '祖玛核心玩法', '3D', '程序化'],
    cover: img('/images/yde_main.webp'),
    cardDescription:
      '融合 Roguelike 随机性与祖玛玩法，通过继承与多态设计构建可扩展的战斗系统。采用 Spline 曲线路径系统实现灵活的敌人移动，集成 Rogue 式商店与升级系统。',
    description: `
      <p>《约德尔卓德大冒险》是一款融合 Roguelike 随机性与祖玛核心玩法的 2D 手机游戏。项目注重通过面向对象的设计和灵活的路径系统来构建可扩展的战斗体验，展现了程序化生成与面向对象设计的结合。</p>
      <h2>技术架构</h2>
      <p>项目使用 Unity 引擎开发，采用 C# 面向对象编程。核心设计理念是通过继承与多态实现灵活的游戏对象系统，通过 Spline 曲线系统实现复杂的敌人移动路径。</p>
      <h2>继承与多态设计</h2>
      <p>构建了球体类型的基类与多种派生类（如爆炸球、减速球、穿透球等）。基类定义了通用的碰撞检测、移动逻辑和生命周期管理，派生类通过重写虚方法实现特定的技能效果。通过多态处理碰撞与技能效果，降低了代码耦合度，便于扩展新的球体类型。</p>
      <h2>Spline 曲线路径系统</h2>
      <p>利用 Unity 的 Spline 工具或自定义 Spline 系统为敌人生成和编辑平滑、复杂的移动路径。系统支持在编辑器中可视化编辑路径，支持多种路径类型（直线、曲线、循环等）。敌人在运行时沿 Spline 路径移动，实现了灵活的关卡设计和丰富的视觉表现。</p>
      <h2>Rogue 式商店与升级系统</h2>
      <p>设计并实现了随机关卡中的商店模块，包含随机物品刷新、玩家资源结算与永久/临时升级的数据逻辑。系统通过权重表控制物品刷新概率，通过事件系统处理升级效果，支持多种升级类型（属性提升、技能解锁、被动效果等）。</p>
    `,
    heroMedia: { type: 'image', src: img('/images/yde_main.webp') },
    gallery: [
      { src: img('/images/yde_game1.webp'), alt: '游戏战斗场景' },
      { src: img('/images/yde_game2.webp'), alt: 'Spline 路径系统' },
      { src: img('/images/yde_shop.webp'), alt: '商店与升级系统', fullWidth: true }
    ],
    highlights: [
      { icon: '🔷', title: '面向对象设计', description: '继承与多态实现可扩展的球体类型系统' },
      { icon: '🛤️', title: 'Spline 路径系统', description: '灵活的敌人移动路径编辑与生成' },
      { icon: '🏪', title: 'Rogue 式系统', description: '随机商店与升级系统的完整实现' }
    ],
    links: {
      download: 'https://share.weiyun.com/7717CpAQ'
    }
  },
  {
    id: 3,
    title: '泡泡蛙',
    subtitle: '在严格时间限制下完成的平台跳跃游戏，聚焦于性能优化与系统弹性的快速实现',
    category: 'Game Jam',
    date: '2025年',
    role: '主程，后端数据层开发',
    tools: 'Unity, C#',
    tags: ['Game Jam', '2D 平台跳跃', '快速原型', '对象池系统'],
    cover: img('/images/ppw_main2.webp'),
    cardDescription:
      '限时开发完成的平台跳跃游戏，聚焦性能优化与系统弹性。实现对象池管理系统控制内存分配与 GC 压力，设计模块化能力升级框架支持即插即用的玩家能力组件。',
    description: `
      <p>《泡泡蛙》是在 Game Jam 限时开发环境下完成的 2D 平台跳跃游戏。项目聚焦于快速实现符合题目的核心玩法，展现了在时间压力下如何构建稳定、高效的游戏系统。</p>
      <h2>开发背景</h2>
      <p>Game Jam 开发环境要求在极短时间内完成可玩的游戏原型。这要求开发者必须快速做出技术决策，优先实现核心功能，同时确保代码质量和系统稳定性。</p>
      <h2>快速迭代与优化</h2>
      <p>在有限时间内，通过模块化设计和代码复用，快速实现了核心玩法、UI 系统、音效管理等完整功能。通过性能分析工具识别性能瓶颈，针对性地进行优化，确保游戏在目标平台上流畅运行。</p>
      <h2>对象池优化</h2>
      <p>为高频生成/销毁的游戏对象实现对象池管理系统。系统预先创建对象池，在需要时从池中获取对象，使用完毕后归还池中，避免频繁的内存分配与 GC（垃圾回收）压力。通过对象池，有效控制了运行时内存分配，保障了游戏流畅性，即使在低端设备上也能稳定运行。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1gjwrecEed' },
    gallery: [
      { src: img('/images/ppw_main.webp'), alt: '游戏场景' },
      { src: img('/images/ppw_game.webp'), alt: '能力系统' },
      { src: img('/images/ppw_story.webp'), alt: '游戏开场', fullWidth: true }
    ],
    highlights: [
      { icon: '🔄', title: '快速原型', description: '在时间限制下实现符合题目的核心玩法' },
      { icon: '♻️', title: '对象池优化', description: '控制内存分配与 GC 压力，保障低端设备流畅' }
    ],
    links: {
      download: 'https://www.123684.com/s/iIlKVv-O0Ivd'
    }
  },
  {
    id: 4,
    title: '棋兵弈阵',
    subtitle:
      'Game Jam 限时开发中完成的 2D 棋类游戏，通过 ScriptableObject 构建灵活的技能效果系统，并利用程序化生成与寻路算法创造动态体验',
    category: 'Game Jam',
    date: '2025年',
    role: '后端数据层开发',
    tools: 'Unity, C#, ScriptableObject, A* 算法',
    tags: ['CIGA Game Jam', '2D', '棋类策略', '数据驱动', '算法生成'],
    cover: img('/images/qbyz_main.webp'),
    cardDescription:
      '通过 ScriptableObject 构建模块化技能效果系统，实现即插即用的效果制作流程。集成 A* 寻路算法实现智能敌人决策，采用程序化生成创造动态关卡体验。',
    description: `
      <p>《棋兵弈阵》是一款在 CIGA Game Jam 限时开发中完成的 2D 棋类策略游戏。项目展现了快速原型与系统架构能力的结合：在严格时间限制下，通过良好的架构设计（ScriptableObject 接口）和稳定的算法（A*）高效实现了核心玩法。</p>
      <h2>项目背景</h2>
      <p>Game Jam 开发环境要求在极短时间内完成可玩的游戏原型。本项目在时间压力下，通过数据驱动设计和核心算法的结合，快速构建了一个具有深度策略性的棋类游戏系统。</p>
      <h2>基于 ScriptableObject 的模块化效果系统</h2>
      <p>使用 Unity 的 ScriptableObject 为每个棋子技能创建独立的数据资产。设计了一套统一的 IEffect 接口或基类，为策划提供了「即插即用」的效果制作流程。这种架构设计使得无需修改核心代码即可创建新技能，极大加速了玩法迭代速度。每个技能效果都是独立的 ScriptableObject 资产，包含效果类型、持续时间、作用范围等配置信息，通过统一的接口进行调用和执行。</p>
      <h2>程序化关卡元素生成</h2>
      <p>实现算法在棋盘上随机生成有意义的障碍物布局，确保每局游戏的独特性和策略深度，而不仅仅是完全随机。生成算法考虑了障碍物的分布密度、位置关系、以及它们对游戏策略的影响，确保生成的关卡既具有随机性，又保持策略平衡。通过权重系统和约束条件，算法能够生成既有趣又具有挑战性的关卡布局。</p>
      <h2>智能敌人寻路系统</h2>
      <p>在棋盘的网格化数据结构上，集成 A*（A-Star）寻路算法，驱动敌人棋子根据实时棋盘状态进行智能移动和决策，构成对玩家的核心挑战。A* 算法能够高效地找到从起点到终点的最优路径，同时考虑障碍物、其他棋子位置等动态因素。敌人 AI 通过评估棋盘状态，选择最优的移动策略，为玩家提供具有挑战性的对手。</p>
      <h2>架构优势</h2>
      <p>项目展现了在时间限制下如何通过良好的架构设计实现高效开发。ScriptableObject 接口系统使得技能扩展变得简单快捷，而 A* 算法的稳定实现确保了核心玩法的可靠性。这种「架构 + 算法」的组合，使得项目在 Game Jam 的严格时间限制下，依然能够实现高质量的核心功能。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1VZ3wzrE7F' },
    gallery: [
      { src: img('/images/qbyz_main.webp'), alt: '游戏主界面' },
      { src: img('/images/qbyz_game.webp'), alt: 'ScriptableObject 效果系统' },
      { src: img('/images/qbyz_game2.webp'), alt: 'A* 寻路算法实现', fullWidth: true },
      { src: img('/images/qbyz_game3.webp'), alt: '程序化关卡生成' }
    ],
    highlights: [
      { icon: '📦', title: '模块化效果系统', description: '基于 ScriptableObject 的即插即用技能系统' },
      { icon: '🗺️', title: 'A* 寻路算法', description: '智能敌人 AI 系统，实现动态决策与路径规划' },
      { icon: '🎲', title: '程序化生成', description: '算法驱动的关卡元素生成，兼顾随机性与平衡' },
      { icon: '⚡', title: '快速原型', description: '在时间限制下通过良好架构实现高质量核心功能' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/CiGAGameJam202506',
      download: 'https://pan.baidu.com/s/1w6Un9ZRSYLp1Bv3tysoECQ?pwd=ydbm'
    }
  },
  {
    id: 5,
    title: '跟你豹了',
    subtitle: '参加开拓芯奇点律动 Vol.2 的比赛，以膨胀为主题的平台跳跃游戏，使用状态机管理游戏和玩家的对象状态',
    category: '平台跳跃',
    date: '2026年',
    role: '主程，游戏逻辑开发，玩家操控系统',
    tools: 'Unity, C#',
    tags: ['平台跳跃', '知识锁', '状态机'],
    cover: img('/images/gnbl_main.webp'),
    cardDescription:
      '参加开拓芯奇点律动 Vol.2 的比赛，以膨胀为主题的平台跳跃游戏。使用状态机管理游戏和玩家的对象状态，并通过 Tiled 完成地图开发与序列化。',
    description: `
      <p>参加开拓芯奇点律动 Vol.2 的比赛，以膨胀为主题的平台跳跃游戏。</p>
      <h2>状态机驱动的玩家控制</h2>
      <p>使用状态机管理游戏与玩家的对象状态，将移动、跳跃、膨胀等行为拆分为独立状态，使玩家操控逻辑清晰且易于扩展。新增能力时只需增加状态并接入转移条件，不必修改既有逻辑。</p>
      <h2>Tiled 地图工作流</h2>
      <p>使用 Tiled 进行地图开发，导出后序列化并在 Unity 中加载使用。关卡设计与代码彻底分离，调整地图无需触碰程序逻辑。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1QoFNzUETM' },
    gallery: [
      { src: img('/images/gnbl_main.webp'), alt: '游戏主界面' },
      { src: img('/images/gnbl_game1.webp'), alt: '游戏场景' },
      { src: img('/images/gnbl_tut.webp'), alt: '游戏教程' }
    ],
    highlights: [
      { icon: '🎮', title: '状态机管理', description: '使用状态机管理游戏和玩家的对象状态' },
      { icon: '🗺️', title: '地图序列化', description: '使用 Tiled 进行地图开发，序列化后在 Unity 中使用' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/Inflate',
      download: 'https://www.123865.com/s/iIlKVv-9FYvd'
    }
  }
]

/** 首页筛选项，'全部' 由视图层自行拼接 */
export const categories = ['卡牌策略', '解谜', '策略解谜', 'Roguelike', 'Game Jam', '平台跳跃']

/** 按 id 查找项目 */
export function getProject(id) {
  return projects.find((p) => p.id === Number(id))
}

/** 按当前项目取相邻项目，用于详情页上下篇导航 */
export function getAdjacentProjects(id) {
  const index = projects.findIndex((p) => p.id === Number(id))
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null
  }
}
