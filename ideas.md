# 个人学术网站设计构思

<response>
<idea>

## 方案一：Editorial Minimalism（编辑式极简主义）

**Design Movement**: 受瑞士国际主义排版和当代编辑设计启发，融合 Thinking Machines Lab 的学术出版物美感

**Core Principles**:
1. 内容至上 — 排版即设计，让文字本身成为视觉元素
2. 克制的优雅 — 通过精确的间距和比例创造高级感
3. 学术严谨性 — 结构清晰，层次分明，如同一篇精心排版的论文
4. 留白即呼吸 — 大量留白让内容有呼吸空间

**Color Philosophy**: 纯白背景 (#FFFFFF) 配深炭黑文字 (#1a1a1a)，唯一的强调色为一抹深红 (#C53030) 用于姓名和关键链接，传达学术的严肃与热情

**Layout Paradigm**: 单栏长滚动布局，内容宽度限制在 680px，模仿学术论文的阅读体验。标题区域使用大字号衬线体居中展示

**Signature Elements**:
1. 细线分隔符（1px 灰色线条分隔各个 section）
2. 论文引用风格的 publication 列表（带有悬停展开的摘要）

**Interaction Philosophy**: 极简交互，仅在必要处使用微妙的悬停效果。滚动时内容自然流动，无花哨动画

**Animation**: 仅使用 fade-in 入场动画，过渡时间 300ms，体现克制与优雅

**Typography System**: 标题使用 Playfair Display（衬线体），正文使用 Source Sans 3（无衬线体），形成经典的衬线/无衬线对比

</idea>
<probability>0.06</probability>
<text>一个极度克制的编辑式设计，模仿高端学术出版物的排版美学</text>
</response>

<response>
<idea>

## 方案二：Warm Modernism（温暖现代主义）

**Design Movement**: 受 Anthropic 网站的温暖色调和当代科技公司的设计语言启发，融合北欧设计的功能美学

**Core Principles**:
1. 温暖而专业 — 用暖色调打破学术网站的冰冷感
2. 卡片化信息架构 — 每个内容块都是独立的信息卡片
3. 视觉节奏感 — 通过大小、间距、颜色的变化创造阅读节奏
4. 可扫描性 — 快速浏览即可获取关键信息

**Color Philosophy**: 温暖的奶油色背景 (#F5F0E8) 配深棕黑文字 (#2D2A26)，强调色使用温暖的赤陶色 (#C4704B)，辅以柔和的沙色 (#E8DFD0) 作为卡片背景。整体传达温暖、可亲近但不失专业的感觉

**Layout Paradigm**: 不对称双栏布局。左侧为固定的个人信息侧边栏（头像、姓名、联系方式），右侧为可滚动的内容区域。在移动端转为单栏堆叠

**Signature Elements**:
1. 温暖的圆角卡片（8px radius）配柔和阴影
2. 研究方向的可视化标签系统（彩色标签分类论文）
3. 公司 logo 以灰度形式展示在经历区域

**Interaction Philosophy**: 卡片悬停时微微上浮并加深阴影，链接悬停时显示下划线动画。整体交互温和而有反馈

**Animation**: 滚动触发的 stagger fade-in 动画，卡片依次入场。使用 framer-motion 的 spring 物理动画，弹性自然

**Typography System**: 标题使用 DM Serif Display（温暖的衬线体），正文使用 DM Sans（几何无衬线体），同一字体家族确保和谐统一

</idea>
<probability>0.08</probability>
<text>一个温暖而现代的设计，用 Anthropic 风格的暖色调和卡片化布局重新诠释学术主页</text>
</response>

<response>
<idea>

## 方案三：Typographic Brutalism Lite（轻量排版粗野主义）

**Design Movement**: 受新粗野主义网页设计和当代独立出版物启发，但保持学术场景的可读性和专业性

**Core Principles**:
1. 大胆的排版层次 — 超大标题与精致正文形成戏剧性对比
2. 网格的打破与重建 — 在严格网格基础上有意打破对齐
3. 黑白为主的力量感 — 用极少的色彩创造最大的视觉冲击
4. 功能驱动的装饰 — 每个视觉元素都服务于信息传达

**Color Philosophy**: 近乎纯白的背景 (#FAFAFA) 配纯黑文字 (#000000)，唯一的彩色是一条鲜明的电蓝色 (#0066FF) 用于交互元素和链接，形成强烈的视觉锚点

**Layout Paradigm**: 全宽布局，使用 CSS Grid 创建不规则但有序的网格系统。Hero 区域占满视口高度，姓名以超大字号（clamp(3rem, 8vw, 7rem)）展示。内容区域使用 12 列网格，不同 section 占据不同列数

**Signature Elements**:
1. 超大字号的姓名展示（作为视觉 hero）
2. 悬停时论文标题的"打字机"下划线效果
3. Section 标题使用全大写字母间距（letter-spacing: 0.2em）

**Interaction Philosophy**: 鼠标悬停触发精确的微交互 — 链接的下划线从左到右展开，卡片边框从无到有渐现。一切交互都是精确而有意的

**Animation**: 页面加载时姓名从下方滑入，各 section 使用 IntersectionObserver 触发的 clip-path reveal 动画。动画时长 600ms，使用 cubic-bezier(0.16, 1, 0.3, 1) 缓动

**Typography System**: 标题使用 Space Grotesk（几何无衬线体，带有独特的字形），正文使用 Inter Tight（紧凑的无衬线体）。标题字重 700，正文字重 400，形成强烈的粗细对比

</idea>
<probability>0.04</probability>
<text>一个大胆而有力的排版驱动设计，用超大字号和黑白对比创造视觉冲击</text>
</response>
