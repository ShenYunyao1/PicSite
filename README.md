    项目名：PhotoSite
    路径：d:\CodeProject\PhotoSite
    简介：一个上传、管理、展示图片或图集的网站

    一、核心功能
    用户系统
    邮箱验证：注册后发送验证链接或验证码，确保用户身份有效。 
    使用nodemailer实现邮件发送。 生成六位随机验证码，并存储在 Redis 中，有效期为 5 分钟。 
    密码重置：通过邮件找回密码。 
    个人资料页：允许用户编辑头像、昵称、简介，并展示已上传的图集和照片。 

    上传功能 
    照片管理 
    批量上传：支持一次性上传多张照片到图集。 
    照片编辑：裁剪、旋转、滤镜等基础处理（可用 Canvas API 或集成 sharp 库）。 
    存储优化：自动生成缩略图（FFmpeg），原始图和缩略图分开存储。 

    标签系统 
    标签自动推荐：根据用户输入的历史标签或热门标签提供补全建议。 
    标签管理后台：允许管理员合并重复标签、删除无效标签。 
    标签云展示：在搜索页展示热门标签的视觉化标签云。 

    图集功能 
    图集封面设置：允许用户选择图集中的某张照片作为封面。 
    图集分类：支持自为图集添加标签，并按标签分类展示。 
    图集可见性：公开/私密/仅限关注者访问的权限控制。 

    搜索功能增强 
    高级过滤：按上传时间、点赞数、标签筛选结果。 
    分页与懒加载：避免一次性加载过多数据，提升性能。 
    搜索历史记录：记录用户最近搜索关键词，方便快速回溯。 

    二、用户体验优化
    交互设计 
    拖拽上传：实现类似 Google Drive 的拖拽文件上传体验。 
    上传进度条：实时显示上传进度和剩余时间。 
    操作反馈：成功/失败提示（如“上传完成”或“文件过大”）。 

    内容展示 
    瀑布流布局：搜索页采用 Pinterest 式瀑布流展示缩略图。 
    图片懒加载：滚动到可视区域再加载图片（Intersection Observer API）。 
    键盘导航：支持方向键切换焦点、回车查看详情。 

    社交互动 
    点赞/收藏：用户可对照片或图集点赞或收藏。 
    评论系统：允许用户对照片发表评论，支持 @他人和表情符号。 
    关注功能：用户可关注其他用户，并在首页看到关注者的新内容。 

    三、安全与性能
    安全防护 
    文件类型限制：仅允许上传 JPG/PNG 等格式，防止恶意文件。 

    性能优化  
    缓存策略：用 Redis 缓存热门搜索关键词、标签云数据。 
    数据库索引：为照片标题、标签、上传时间等字段建立索引，优化搜索速度。
    
    四、进阶功能
    管理员后台 
    数据看板：统计活跃用户、上传量、热门标签等数据。 
    内容管理：删除违规内容、封禁用户、审核新注册用户。 
    
    移动端适配 
    响应式设计：确保在手机、平板、桌面端均有良好显示效果。 

    法律合规 
    用户协议与隐私政策：明确数据使用规则，符合 GDPR 等法规。 
    版权声明：提醒用户不得上传侵权内容，提供举报入口。 

    技术栈
    前端：React + TypeScript + Tailwind CSS（组件库如 Ant Design） 
    后端：Node.js（Express） + MySQL（关系型数据） + Elasticsearch（搜索优化） 
    存储：AWS S3（图片存储） + Redis（缓存） 
    监控：Sentry（错误跟踪） + Prometheus（性能监控） 

    先在本地电脑上开发，完成后再部署到服务器上测试。 
    先实现核心功能（用户系统 + 上传 + 搜索），再逐步迭代其他模块。
    善用第三方库，如 Canvas API、Sharp 等，提升用户体验。
    善用文档和示例，快速上手新技术。
    生成代码要求如下：
    给我的每个代码块要在开头加上文件所在路径注释，方便快速定位。
    将网页功能分成多个模块，每个模块都有自己的路由和组件，方便后续维护和扩展。不要全部堆在server.js里。

项目结构：
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── uploadController.js
│   ├── searchController.js
│   └── adminController.js
├── routes/
│   ├── authRoutes.js
│   ├── uploadRoutes.js
│   └── searchRoutes.js
├── models/
│   ├── User.js
│   ├── Photo.js
│   ├── Album.js
│   ├── Tag.js
│   ├── Comment.js
│   └── Like.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   ├── emailUtils.js
│   └── redisClient.js
├── server.js
└── .env

my-photo-site/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── styles/
│           └── main.css
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   └── Gallery.js
│   │   └── Common/
│   │       ├── Navbar.js
│   │       └── Footer.js
│   ├── redux/
│   │   ├── store.js
│   │   ├── actions/
│   │   │   └── authActions.js
│   │   └── reducers/
│   │       └── authReducer.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── About.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .env
├── package.json
└── README.md