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
      '以「书」为构筑单位的卡牌策略游戏，已在 Steam 上架并提供试玩 Demo。负责游戏逻辑、UI 架构与开发工具，沉淀出一套可复用的底层框架',
    category: '卡牌策略',
    date: '2026年2月 — 至今',
    role: '程序：游戏逻辑、UI 架构、开发工具',
    tools: 'Unity, C#, UGUI, 泛型事件总线, 工厂模式',
    tags: ['卡牌构筑', '策略', 'Steam', '框架设计'],
    cover: img('/images/heartlib_cover.webp'),
    cardDescription:
      '《心镇图书馆》卡牌构筑策略游戏，已上架 Steam 并提供免费试玩 Demo。担任程序岗位，负责游戏逻辑实现、UI 架构设计与开发工具设计，并主导了泛型事件总线、栈式 UGUI 界面框架与工厂化效果系统等底层架构。',
    description: `
      <p>《心镇图书馆 HeartLib》是一款卡牌构筑策略游戏，2026 年 2 月 13 日起开发至今，已上架 Steam 并提供<strong>免费试玩 Demo</strong>。你醒来，茫然之间就被称作心镇的新任图书管理员；少女叶落秋自称为「镇长」，要求你抵御心镇的敌人——不好惹的乡绅、温和的厨师、还有疯癫的艺术家都在为你提供协助。而你，将用书籍的力量直面所有挑战。</p>
      <p>我在项目中担任<strong>程序</strong>岗位，使用 Unity 引擎、以 C# 为主要语言进行开发，负责<strong>游戏逻辑实现、UI 架构设计、开发工具设计</strong>。</p>

      <h2>特色构筑：以「书」为单位</h2>
      <p>游戏的构筑不以具体卡牌为单位，而是以<strong>书籍</strong>为单位。每一本书籍都是包含了一组相关卡牌的一套卡牌包：负责串联卡牌的「插图」、产生差异效果的「书页」，以及需要蓄力的强力卡牌「读后感」。这种设计显著减轻了构筑的理解压力。风格化的构筑方向则由不同的协助者决定，各自拥有风格各异、对体验产生强影响的被动。</p>

      <h2>特色战斗：路线</h2>
      <p>按照卡牌上的轨迹，在地板上规划布防的路径。在不断更替的位置中，找到那条可以抵御所有敌人的路线。作为衔接的「插图」数量有限，但可以帮你润滑整条路线，为路径规划提供了额外的策略空间。</p>

      <h2>特色成长：影响</h2>
      <p>只要拼点胜利，你的卡牌就会在地板上留下「影响」。影响会带来不同种类的概率性效果，只要叠加到 <strong>5 层</strong>就会百分百触发。不同种类的影响会让战斗体验产生极大差异：是选择叠力度的<strong>领袖</strong>，还是减伤的<strong>守护者</strong>？守护者可以让你不用害怕低力度攻击，却无法抵御高力度敌人；领袖可以伤害高力度敌人，但缺牌这方面需要<strong>投机者</strong>来补。</p>

      <h2>技术实现：泛型事件总线</h2>
      <p>设计并实现了基于<strong>泛型事件总线</strong>的底层管理架构。事件以类型参数区分，订阅与派发在编译期即可获得类型约束，避免了传统字符串键事件系统的运行时错误与装箱开销。各系统之间通过事件解耦，新增玩法模块时无需修改既有系统，显著降低了耦合度与回归风险。</p>

      <h2>技术实现：栈式 UGUI 通用界面框架</h2>
      <p>基于<strong>单例 + 栈管理</strong>架构，构建了一套层级化、可复用的 UGUI 通用界面框架。界面按打开顺序压入栈中，关闭时自动回退到上一层，天然支持弹窗、返回、多层嵌套等常见交互；配合单例入口统一调度，任何界面都只需关注自身逻辑，无需关心层级与显示顺序。这套框架在项目内被反复复用，新界面的接入成本被压到极低。</p>

      <h2>技术实现：工厂模式的效果与数据配置体系</h2>
      <p>使用<strong>工厂设计模式</strong>建设效果系统与数据配置体系。效果类型与数据配置分离，新增一种卡牌效果只需注册对应的工厂实现与配置数据，核心战斗流程无需改动。这使策划侧的内容扩充与程序侧的逻辑演进可以并行推进。</p>

      <h2>开发工具与 AI 辅助</h2>
      <p>开发了多个供引擎与代码使用的工具，把重复性的配置、检查与生成工作从手工流程中剥离出来。同时结合 AI 工具辅助日常开发，用于代码片段生成、重构建议与文档整理，在保证代码质量的前提下提升了整体开发效率。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1LNJi65E5e' },
    gallery: [
      { src: img('/images/heartlib_route.webp'), alt: '路线式战斗：沿卡牌轨迹规划布防路径', fullWidth: false },
      { src: img('/images/heartlib_books.webp'), alt: '以书为单位的牌组构筑界面', fullWidth: false },
      { src: img('/images/heartlib_map.webp'), alt: '关卡地图与节点进度', fullWidth: true }
    ],
    highlights: [
      { icon: '📡', title: '泛型事件总线', description: '类型安全的底层事件架构，系统间彻底解耦' },
      { icon: '🗂️', title: '栈式 UGUI 框架', description: '单例 + 栈管理，层级化可复用的通用界面框架' },
      { icon: '🏭', title: '工厂化效果系统', description: '效果与配置分离，新效果即插即用' },
      { icon: '🛠️', title: '开发工具链', description: '为引擎与代码侧开发多个提效工具' }
    ],
    links: {
      steam: 'https://store.steampowered.com/app/5186120/',
      demo: 'https://store.steampowered.com/app/5212810/'
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
    id: 5,
    title: '跟你豹了',
    subtitle:
      '参加奇点律动 Vol.2 的平台跳跃解谜游戏，使用状态机管理玩家操作、InputSystem 统一按键映射，并通过 Tiled 完成地图工作流',
    category: '平台跳跃',
    date: '2026年1月 — 2月',
    role: '设计与主程：游戏逻辑、玩家角色、关卡制作',
    tools: 'Unity, C#, 状态机, InputSystem, Tiled',
    tags: ['平台跳跃', '知识锁', '状态机', '奇点律动 Vol.2'],
    cover: img('/images/gnbl_main.webp'),
    cardDescription:
      '参加奇点律动 Vol.2 的平台跳跃解谜游戏。担任设计与主程，负责游戏逻辑、玩家角色与部分关卡制作：状态机控制玩家操作、InputSystem 做按键映射、单例管理音乐与场景过渡、Tiled 制作地图并在 Unity 中反序列化导入。',
    description: `
      <p>《跟你豹了》是一款平台跳跃解谜游戏，2026 年 1 月至 2 月开发，参加<strong>奇点律动 Vol.2 Game Jam</strong>。</p>
      <p>我担任<strong>设计与主程</strong>岗位，使用 Unity 引擎、以 C# 为主要语言进行开发，负责游戏逻辑、玩家角色与部分关卡的制作。</p>
      <h2>状态机控制玩家操作</h2>
      <p>使用状态机进行玩家操作逻辑的控制，将移动、跳跃等行为拆分为独立状态，新增能力时只需增加状态并接入转移条件，不必修改既有逻辑。</p>
      <h2>InputSystem 按键映射</h2>
      <p>使用 InputSystem 实现不同按键对同一操作的映射，使键位配置与游戏逻辑解耦，玩家可以按自己的习惯操作，也让后续调整键位无需改动代码。</p>
      <h2>单例管理与视差背景</h2>
      <p>使用单例模式实现了音乐与场景过渡的衔接，保证跨场景的音频与转场状态连续；同时制作了视差背景效果，增强画面层次感。</p>
      <h2>Tiled 地图工作流</h2>
      <p>使用 Tiled 软件进行地图制作，在 Unity 中通过 JSON 文件的反序列化完成地图导入。关卡设计与代码彻底分离，调整地图无需触碰程序逻辑。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1QoFNzUETM' },
    gallery: [
      { src: img('/images/gnbl_main.webp'), alt: '游戏主界面' },
      { src: img('/images/gnbl_game1.webp'), alt: '游戏场景' },
      { src: img('/images/gnbl_tut.webp'), alt: '游戏教程' }
    ],
    highlights: [
      { icon: '🎮', title: '状态机玩家控制', description: '玩家操作逻辑拆分状态，易于扩展新能力' },
      { icon: '⌨️', title: 'InputSystem 映射', description: '不同按键映射同一操作，键位与逻辑解耦' },
      { icon: '🎵', title: '单例管理', description: '音乐与场景过渡的连续衔接' },
      { icon: '🗺️', title: 'Tiled 地图工作流', description: 'Tiled 制作 + JSON 反序列化导入 Unity' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/Inflate',
      download: 'https://www.123865.com/s/iIlKVv-9FYvd'
    }
  },
  {
    id: 4,
    title: '棋兵弈阵',
    subtitle:
      'Game Jam 限时开发中完成的 2D 棋类游戏，通过 ScriptableObject 构建灵活的技能效果系统，并利用程序化生成与寻路算法创造动态体验',
    category: 'Game Jam',
    date: '2025年6月',
    role: '主要程序：游戏逻辑、棋子状态机、寻路、视觉效果',
    tools: 'Unity, C#, ScriptableObject, 状态机, 洪水算法',
    tags: ['CIGA Game Jam', '2D', '棋类策略', '数据驱动', '状态机'],
    cover: img('/images/qbyz_main.webp'),
    cardDescription:
      '参加 CIGA Game Jam 2025 的策略战棋游戏。担任主要程序，负责游戏主要逻辑：状态机管理棋子与游戏状态、对象池减少性能开销、洪水算法实现棋子寻路、ScriptableObject 配置棋子效果。',
    description: `
      <p>《棋兵弈阵》是一款策略战棋游戏，2025 年 6 月开发，参加 <strong>CIGA Game Jam 2025</strong>。项目展现了快速原型与系统架构能力的结合：在严格时间限制下，通过状态机、对象池与稳定算法高效实现了核心玩法。</p>
      <p>我担任<strong>主要程序开发</strong>，使用 Unity 引擎、以 C# 为主要语言进行开发，负责游戏主要逻辑的实现、棋子状态机的设计、游戏视觉效果的制作与游戏测试。</p>
      <h2>状态机管理棋子与游戏状态</h2>
      <p>项目中采用状态机系统统一管理棋子与游戏的状态。棋子的待机、移动、攻击、受击等行为被拆分为独立状态，游戏整体流程（回合开始、玩家操作、敌人行动、结算）同样由状态机驱动。这使得逻辑分支清晰可控，新增状态只需定义转移条件，不必在既有代码中层层判断。</p>
      <h2>对象池减少性能开销</h2>
      <p>使用对象池系统管理高频生成与销毁的对象，避免频繁的内存分配与垃圾回收压力，在 Game Jam 的短周期内也保证了运行的稳定性。</p>
      <h2>洪水算法实现棋子寻路</h2>
      <p>使用洪水算法（Flood Fill）开发棋子的寻路逻辑，在网格化棋盘上高效计算可达范围与移动路径，驱动棋子根据实时棋盘状态进行移动与决策。</p>
      <h2>基于 ScriptableObject 的效果配置</h2>
      <p>使用 ScriptableObject 进行可灵活修改的棋子效果配置。每个棋子的效果都是独立的数据资产，无需修改核心代码即可创建与调整技能，极大加速了玩法迭代速度。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1VZ3wzrE7F' },
    gallery: [
      { src: img('/images/qbyz_main.webp'), alt: '游戏主界面' },
      { src: img('/images/qbyz_game.webp'), alt: 'ScriptableObject 效果系统' },
      { src: img('/images/qbyz_game2.webp'), alt: '棋子状态机与寻路', fullWidth: true },
      { src: img('/images/qbyz_game3.webp'), alt: '游戏场景' }
    ],
    highlights: [
      { icon: '🔀', title: '状态机系统', description: '统一管理棋子与游戏状态，逻辑清晰可控' },
      { icon: '♻️', title: '对象池', description: '减少内存分配与 GC 开销' },
      { icon: '🌊', title: '洪水算法寻路', description: '网格棋盘上高效计算可达范围与路径' },
      { icon: '📦', title: 'ScriptableObject 配置', description: '棋子效果可灵活修改，无需改动核心代码' },
      { icon: '⚡', title: '快速原型', description: '在时间限制下通过良好架构实现高质量核心功能' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/CiGAGameJam202506',
      download: 'https://pan.baidu.com/s/1w6Un9ZRSYLp1Bv3tysoECQ?pwd=ydbm'
    }
  },
  {
    id: 1,
    title: '魔女的棋局',
    subtitle:
      '数据与架构导向的策略游戏，核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑',
    category: '策略解谜',
    date: '2025年3月 — 5月',
    role: '主要程序：游戏逻辑与流程、存档、地图系统',
    tools: 'Unity, C#, ScriptableObject, JSON, MVC',
    tags: ['策略解谜', '2D', '数据驱动', '魔塔类', '开拓芯 2025'],
    cover: img('/images/mn_main.webp'),
    cardDescription:
      '数据与架构导向的策略解谜游戏，参加开拓芯 2025。负责游戏大部分逻辑与全部流程开发：JSON 序列化存档、MVC 分离逻辑与显示、本地文本序列化的地图系统，以及基于 ScriptableObject 的可配置文本/图像工具与商店系统。',
    description: `
      <p>《魔女的棋局》是一款数据与架构导向的策略解谜游戏，2025 年 3 月至 5 月开发，参加<strong>开拓芯 2025</strong>。项目核心在于通过可编程的数据资产和高效的资源管理系统，构建复杂而稳定的游戏逻辑。</p>
      <p>我担任<strong>主要程序开发</strong>，使用 Unity 引擎、以 C# 为主要语言进行两个月的开发，负责游戏大部分逻辑和全部流程的实现。</p>
      <h2>MVC 架构分离逻辑与显示</h2>
      <p>采用 MVC 架构将游戏逻辑与表现层彻底分离。逻辑层不依赖任何 UI 组件，显示层通过订阅逻辑层的数据变化刷新界面。这使得同一套逻辑可以适配不同的表现方式，也让 UI 调整不再有牵一发动全身的风险。</p>
      <h2>JSON 序列化存档系统</h2>
      <p>使用 JSON 实现了存档系统的序列化与反序列化。系统能够保存和加载复杂的玩家进度数据，包括角色状态、物品库存、关卡进度等；通过自定义序列化接口，确保所有关键游戏对象都能正确转换为 JSON 格式并完整恢复。</p>
      <h2>本地文本序列化的地图系统</h2>
      <p>使用本地文本序列化构建了便于导入与配置的地图系统。关卡数据以纯文本形式维护，配合解析工具直接导入引擎，使关卡编辑与调试不必依赖编辑器手工操作，大幅提升了内容迭代效率。</p>
      <h2>ScriptableObject 配置工具与商店系统</h2>
      <p>使用 ScriptableObject 实现了可灵活配置文本与图像的系统工具，策划可直接在编辑器中维护内容而无需改动代码。同时负责商店系统的制作与游戏关卡测试。</p>
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
      { icon: '🏛️', title: 'MVC 架构', description: '逻辑与显示彻底分离，UI 调整不影响核心逻辑' },
      { icon: '💾', title: 'JSON 存档系统', description: '完整的游戏状态序列化与反序列化实现' },
      { icon: '🗺️', title: '文本序列化地图', description: '本地文本构建地图系统，便于导入与配置' },
      { icon: '📦', title: 'ScriptableObject 工具', description: '可灵活配置文本与图像的编辑器工具' }
    ],
    links: {
      github: 'https://github.com/Zhangkm233/DevilTower',
      download: 'https://pan.baidu.com/s/1oiyPDEEGWtAw8r0lfEHe-g?pwd=y1tm'
    }
  },
  {
    id: 3,
    title: '泡泡蛙',
    subtitle: '在严格时间限制下完成的平台跳跃游戏，聚焦于性能优化与系统弹性的快速实现',
    category: 'Game Jam',
    date: '2025年1月',
    role: '程序：游戏流程、计时系统、技能系统',
    tools: 'Unity, C#',
    tags: ['GGJ2025', '2D 平台跳跃', '快速原型'],
    cover: img('/images/ppw_main2.webp'),
    cardDescription:
      '参加 GGJ2025 Game Jam 的平台跳跃游戏。担任程序岗位，负责部分游戏流程、游戏计时系统与技能系统的制作。',
    description: `
      <p>《泡泡蛙》是在 <strong>GGJ2025 Game Jam</strong> 限时开发环境下完成的平台跳跃游戏，2025 年 1 月开发。项目聚焦于快速实现符合题目的核心玩法，展现了在时间压力下如何构建稳定、高效的游戏系统。</p>
      <p>我担任<strong>程序</strong>岗位，负责部分游戏流程、游戏计时系统与技能系统的制作。</p>
      <h2>开发背景</h2>
      <p>Game Jam 开发环境要求在极短时间内完成可玩的游戏原型。这要求开发者必须快速做出技术决策，优先实现核心功能，同时确保代码质量和系统稳定性。</p>
      <h2>游戏流程与计时系统</h2>
      <p>负责游戏部分流程的搭建与计时系统的实现，保证关卡节奏与时间压力能够按设计稳定运转，为玩家提供清晰的反馈。</p>
      <h2>技能系统</h2>
      <p>设计并实现玩家的技能系统，将不同能力拆分为可独立配置与组合的模块，使玩家能力可以在关卡中逐步解锁与叠加，同时保持代码的可扩展性。</p>
    `,
    heroMedia: { type: 'bilibili', bvid: 'BV1gjwrecEed' },
    gallery: [
      { src: img('/images/ppw_main.webp'), alt: '游戏场景' },
      { src: img('/images/ppw_game.webp'), alt: '技能系统' },
      { src: img('/images/ppw_story.webp'), alt: '游戏开场', fullWidth: true }
    ],
    highlights: [
      { icon: '⏱️', title: '计时系统', description: '实现关卡计时与流程节奏控制' },
      { icon: '✨', title: '技能系统', description: '模块化能力组件，支持逐步解锁与组合' },
      { icon: '⚡', title: '快速原型', description: '在 GGJ2025 限时条件下完成可玩原型' }
    ],
    links: {
      download: 'https://www.123684.com/s/iIlKVv-O0Ivd'
    }
  },
  {
    id: 2,
    title: '约德尔卓德大冒险',
    subtitle:
      '融合 Roguelike 随机性与祖玛玩法，注重通过面向对象的设计和灵活的路径系统来构建可扩展的战斗体验',
    category: 'Roguelike',
    date: '2024年11月 — 12月',
    role: '辅助程序：后端逻辑、游戏层、交互与经济系统',
    tools: 'Unity, C#, Spline 系统',
    tags: ['Roguelike', '祖玛核心玩法', '3D', '程序化', '英雄联盟手游 IP 赛道'],
    cover: img('/images/yde_main.webp'),
    cardDescription:
      '融合 Roguelike 随机性与祖玛玩法，参加中传英雄联盟手游小游戏 IP 赛道比赛。担任辅助程序，负责后端游戏逻辑设计、游戏层实现、游戏交互设计与经济系统制作。',
    description: `
      <p>《约德尔卓德大冒险》是一款融合 Roguelike 随机性与祖玛核心玩法的游戏，2024 年 11 月至 12 月开发，参加<strong>中传英雄联盟手游小游戏 IP 赛道比赛</strong>。</p>
      <p>我担任<strong>辅助程序</strong>岗位，主要负责后端游戏逻辑设计、游戏层实现、游戏交互设计，以及经济系统的制作。</p>
      <h2>继承与多态设计</h2>
      <p>构建了球体类型的基类与多种派生类（如爆炸球、减速球、穿透球等）。基类定义了通用的碰撞检测、移动逻辑和生命周期管理，派生类通过重写虚方法实现特定的技能效果。通过多态处理碰撞与技能效果，降低了代码耦合度，便于扩展新的球体类型。</p>
      <h2>Spline 曲线路径系统</h2>
      <p>利用 Unity 的 Spline 工具为敌人生成和编辑平滑、复杂的移动路径。系统支持在编辑器中可视化编辑路径，支持多种路径类型（直线、曲线、循环等）。敌人在运行时沿 Spline 路径移动，实现了灵活的关卡设计和丰富的视觉表现。</p>
      <h2>经济系统与 Rogue 式商店</h2>
      <p>设计并实现了随机关卡中的商店模块与经济系统，包含随机物品刷新、玩家资源结算与永久/临时升级的数据逻辑。系统通过权重表控制物品刷新概率，通过事件系统处理升级效果，支持多种升级类型（属性提升、技能解锁、被动效果等）。</p>
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
