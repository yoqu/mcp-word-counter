# 发布指南

## 发布前准备

1. **更新版本号**
   ```bash
   npm version patch  # 补丁版本 (1.0.0 -> 1.0.1)
   npm version minor  # 次版本 (1.0.0 -> 1.1.0)
   npm version major  # 主版本 (1.0.0 -> 2.0.0)
   ```

2. **更新 package.json 中的信息**
   - 作者信息：`"author": "Your Name <your.email@example.com>"`
   - 仓库地址：`"repository": { "url": "https://github.com/yourusername/mcp-word-counter.git" }`
   - 主页：`"homepage": "https://github.com/yourusername/mcp-word-counter#readme"`

3. **检查构建**
   ```bash
   npm run build
   ```

4. **测试打包**
   ```bash
   npm pack --dry-run
   ```

## 发布步骤

1. **登录 npm**
   ```bash
   npm login
   ```

2. **发布包**
   ```bash
   npm publish
   ```

## 发布后验证

1. **检查包页面**
   访问：https://www.npmjs.com/package/mcp-word-counter

2. **测试安装**
   ```bash
   # 全局安装测试
   npm install -g mcp-word-counter
   
   # 或使用 npx 测试
   npx mcp-word-counter
   ```

3. **测试 MCP 配置**
   在 MCP 客户端配置中添加：
   ```json
   {
     "mcpServers": {
       "word-counter": {
         "command": "npx",
         "args": ["mcp-word-counter"],
         "env": {}
       }
     }
   }
   ```

## 注意事项

- 确保 `dist/` 目录包含所有构建文件
- 确保 `package.json` 中的 `bin` 字段正确指向 `dist/index.js`
- 确保 `dist/index.js` 文件有正确的 shebang：`#!/usr/bin/env node`
- 发布前运行 `npm run build` 确保代码是最新的 