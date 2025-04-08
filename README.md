# MBTI性格测试小程序

这是一个基于微信小程序平台的MBTI性格测试应用，帮助用户了解自己的性格类型、特点和潜在发展方向。

## 功能特点

- 微信一键登录，自动获取用户信息
- 专业的MBTI性格测试题目
- 详细的性格分析报告
- 个性化的职业建议
- 测试历史记录保存
- 结果分享功能

## 技术栈

- 微信小程序原生开发
- JavaScript
- WXML/WXSS

## 项目结构

```
├── app.js                 // 小程序入口文件
├── app.json               // 小程序全局配置
├── app.wxss               // 小程序全局样式
├── pages                  // 页面文件夹
│   ├── index              // 首页
│   ├── test               // 测试页面
│   ├── result             // 结果页面
│   └── profile            // 个人中心
├── images                 // 图片资源
└── utils                  // 工具函数
```

## 主要页面说明

### 首页 (index)
- 显示用户基本信息
- MBTI测试介绍
- 开始测试入口

### 测试页面 (test)
- 展示测试题目
- 选项选择功能
- 进度显示
- 上一题/下一题导航

### 结果页面 (result)
- 显示MBTI类型
- 性格特点分析
- 四个维度的详细解读
- 职业建议
- 分享功能

### 个人中心 (profile)
- 测试历史记录
- 个人信息管理

## 安装和使用

1. 克隆项目到本地
```bash
git clone [项目地址]
```

2. 使用微信开发者工具打开项目

3. 在 `app.js` 中配置您的API地址：
```javascript
// 登录API
const LOGIN_API = 'https://your-api-endpoint.com/login';
// 更新用户信息API
const UPDATE_USER_API = 'https://your-api-endpoint.com/user/update';
```

4. 在微信小程序后台配置服务器域名白名单

## 开发说明

1. 登录流程
   - 使用 `wx.login` 获取 code
   - 发送 code 到后端换取 token
   - 使用 token 进行后续接口调用

2. 用户信息
   - 使用 `wx.getUserProfile` 获取用户信息
   - 信息保存在本地存储和全局状态中

3. 测试流程
   - 答案保存在内存中
   - 提交时发送到后端保存
   - 结果页面展示分析报告

## 注意事项

1. 需要在 `project.config.json` 中配置正确的 `appid`
2. 确保后端API接口正确配置
3. 注意用户隐私信息的保护
4. 遵循微信小程序的开发规范

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License 