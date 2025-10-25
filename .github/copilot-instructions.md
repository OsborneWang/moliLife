# 摩利生活 - AI 编程助手指导文档

## 项目概述
摩利生活是一个基于 Expo Router 构建的跨平台 React Native 健康监测应用。通过 BLE 连接智能戒指硬件，提供全面的健康数据追踪、运动监测和远程手机控制功能。支持多语言国际化。

## 架构模式

### 基于文件的路由系统 (Expo Router v6)
- `app/` 目录使用基于文件的路由，启用类型化路由
- 路由组：`(tabs)/` 包含标签页导航屏幕
- 特殊文件：`_layout.tsx` 用于嵌套布局，`+not-found.tsx` 用于 404 页面，`modal.tsx` 用于模态展示
- 初始路由是在 `app/_layout.tsx` 中定义的 `(tabs)`

### 跨平台主题系统
- `components/Themed.tsx` 提供主题感知的 `Text` 和 `View` 组件，自动支持明暗模式
- 颜色定义在 `constants/Colors.ts` 中，分别有明暗调色板
- 平台特定实现：`useColorScheme.ts` (原生) vs `useColorScheme.web.ts` (网页)
- 使用 `useClientOnlyValue` 钩子处理服务器/客户端渲染差异

### 核心依赖与使用场景
- **BLE 集成**：`react-native-ble-plx` 用于智能戒指设备通信和健康数据同步
- **本地存储**：`react-native-sqlite-storage` 用于健康指标、运动记录和用户偏好
- **动画**：`react-native-reanimated` v4+ 支持 worklets
- **图标**：`@expo/vector-icons/FontAwesome` - 在 https://icons.expo.fyi/ 探索图标
- **国际化**：多语言支持（中文、英文、日文、阿拉伯文及 RTL 布局）

## 核心应用模块

### 健康仪表板（首页）
- 固定顺序显示：步数、睡眠、心率、血氧、血压、压力、温度、生理周期
- 来自连接戒指设备的实时数据可视化
- 无自定义排序 - 标准化健康指标布局

### 运动模块
- 支持的活动：健身、跑步、登山、骑行
- 运动过程中实时追踪
- 无社交功能 - 专注个人指标
- 可扩展支持更多运动类型

### BLE 设备管理
- 单用户账号支持多设备
- 设备信息显示：名称、状态、固件版本、电池
- 测试功能：心率测试、血氧测试
- 设备操作：添加、解绑、重命名
- 初期不支持家庭成员管理

### 设置与用户资料
- 用户数据：头像、昵称、性别、年龄、身高、体重
- 应用设置：语言切换、单位（公制/英制）、隐私、通知
- 认证：微信登录 + 手机号登录
- 本地数据优先 - 云同步预留待后期

### 戒指手机控制
- 固定三项功能：相机触发、短视频滑动、电子书翻页
- 硬件依赖功能，应用端调用相关操作
- 初期不支持自定义映射或宏编程

## 开发工作流

### 运行应用
```bash
npm start          # 启动 Expo 开发服务器
npm run ios        # 在 iOS 模拟器/设备上运行  
npm run android    # 在 Android 模拟器/设备上运行
npm run web        # 运行 Web 版本
```

### 数据流架构
1. 通过 `react-native-ble-plx` 与智能戒指设备建立 BLE 连接
2. 健康/运动数据解析和验证
3. 模块化表设计的本地 SQLite 存储
4. 前端数据检索和可视化
5. 通过原生桥接模块实现戒指到手机的控制

### 平台目标
- iOS：Bundle ID `com.osbornewang.moliLife`，支持平板
- Android：包名 `com.osbornewang.moliLife`，启用边缘到边缘
- Web：使用 Metro 打包器的静态输出

### 国际化需求
- 主要语言：中文（默认）、英文、日文、阿拉伯文
- 阿拉伯语支持 RTL 布局
- 设置页面实时语言切换
- 所有文本、图片和 UI 元素必须使用 i18n 资源
- 设计资产需要多语言和 RTL 版本

## 项目特定约定

### 导入路径
- 使用 `@/` 别名进行根相对导入（在 `tsconfig.json` 中配置）
- 示例：`import Colors from '@/constants/Colors'`

### 组件模式
- 优先使用 `@/components/Themed` 中的主题组件而非原始 React Native 组件
- 外部链接使用 `ExternalLink` 组件，原生端使用应用内浏览器
- 图标在标签布局中使用 `TabBarIcon` 包装器模式

### 样式方法
- 组件样式使用 StyleSheet.create()
- 通过 `useThemeColor` 钩子实现主题感知颜色
- 一致的间距模式：分隔符使用 `marginVertical: 30`

### 导航结构
```
app/
├── _layout.tsx          # 根布局，使用 Stack 导航器
├── (tabs)/
│   ├── _layout.tsx      # 标签导航器，使用 FontAwesome 图标
│   ├── index.tsx        # "Tab One" 屏幕
│   └── two.tsx          # "Tab Two" 屏幕
├── modal.tsx            # 模态展示
└── +not-found.tsx       # 404 处理
```

### VS Code 配置
- 保存时自动修复启用（`.vscode/settings.json`）
- 推荐使用 Expo 工具扩展
- 保存时整理导入和排序成员

## 代码质量标准
- 启用严格 TypeScript
- React 19+ 配合最新 React Native
- 通过 Expo Router 配置错误边界
- 根布局中的启动屏幕管理
- iOS/Android 的 BLE 权限和生命周期管理
- 微信 SDK 集成用于认证
- 模块化数据库设计，预留扩展架构
- Expo 与原生模块之间的版本兼容性测试