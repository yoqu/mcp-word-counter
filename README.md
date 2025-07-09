# MCP Word Counter - 中文字数统计服务

一个基于 Model Context Protocol (MCP) 的中文字数统计服务，支持智能统计中文、英文、全角和半角字符。

## 功能特性

- ✅ **智能字符识别**：准确识别中文汉字、英文字符、全角和半角字符
- ✅ **多文件支持**：同时统计多个文件的字数
- ✅ **详细统计**：提供每种字符类型的详细统计信息
- ✅ **智能计算**：按照指定规则计算字数并向上取整
- ✅ **错误处理**：友好的错误提示和异常处理

## 字数计算规则

| 字符类型 | 计算权重 | 示例 |
|---------|---------|------|
| 中文汉字 | 1.0 | 中、文、汉、字 |
| 英文字符 | 0.5 | a-z, A-Z |
| 全角字符 | 1.0 | ！、（、） |
| 半角字符 | 0.5 | !、(、) |

**注意**：最终字数会向上取整。例如：3.2 → 4，5.7 → 6

## 安装与配置

### 方法一：使用 npx（推荐）

直接使用 npx 安装和配置，无需手动下载：

```bash
npx mcp-word-counter
```

在你的 MCP 客户端配置文件中添加：

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

### 方法二：全局安装

```bash
npm install -g mcp-word-counter
```

配置 MCP 客户端：

```json
{
  "mcpServers": {
    "word-counter": {
      "command": "mcp-word-counter",
      "env": {}
    }
  }
}
```

### 方法三：本地开发

1. 克隆项目并安装依赖：

```bash
git clone https://github.com/yourusername/mcp-word-counter.git
cd mcp-word-counter
npm install
```

2. 构建项目：

```bash
npm run build
```

3. 配置 MCP 客户端：

```json
{
  "mcpServers": {
    "word-counter": {
      "command": "node",
      "args": ["path/to/mcp-word-counter/dist/index.js"],
      "env": {}
    }
  }
}
```

## 使用方法

### 在 MCP 客户端中使用

调用 `count_words` 工具：

```json
{
  "name": "count_words",
  "arguments": {
    "filePaths": ["./example.txt", "./document.md"]
  }
}
```

### 支持的文件格式

- 纯文本文件 (.txt)
- Markdown 文件 (.md)
- JavaScript/TypeScript 文件 (.js, .ts)
- JSON 文件 (.json)
- 其他任何文本格式文件

## 输出示例

```
文件: ./example.txt
总字数: 156
详细统计:
  - 汉字: 120
  - 英文字符: 45
  - 全角字符: 8
  - 半角字符: 12
  - 其他字符: 3
  - 原始字数: 155.50

文件: ./document.md
总字数: 89
详细统计:
  - 汉字: 78
  - 英文字符: 20
  - 全角字符: 2
  - 半角字符: 5
  - 其他字符: 1
  - 原始字数: 88.50

总计字数: 245
```

## 开发

### 项目结构

```
mcp-word-counter/
├── src/
│   ├── index.ts          # MCP 服务器主文件
│   ├── word-counter.ts   # 字数统计核心逻辑
│   └── types.ts          # 类型定义
├── dist/                 # 编译输出目录
├── package.json
├── tsconfig.json
└── README.md
```

### 开发模式

```bash
# 监听文件变化并自动编译
npm run dev

# 运行编译后的服务器
npm start
```

### 测试

创建测试文件并使用 MCP 客户端测试：

```bash
echo "Hello 世界！This is a test." > test.txt
```

## API 文档

### count_words 工具

统计指定文件的中文字数。

**参数**：
- `filePaths` (string[]): 要统计的文件路径数组

**返回值**：
- 每个文件的详细统计信息
- 总字数统计
- 错误信息（如果有）

## 技术栈

- **Node.js**: 运行时环境
- **TypeScript**: 开发语言
- **MCP SDK**: Model Context Protocol 官方 SDK
- **ESM**: ES 模块系统

## 许可证

MIT License

## 发布到 npm

如果你想要发布自己的版本：

1. 更新 `package.json` 中的作者信息和仓库地址
2. 登录 npm：
   ```bash
   npm login
   ```
3. 发布包：
   ```bash
   npm publish
   ```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本
- 支持中文字数统计
- 支持多文件处理
- 完整的 MCP 集成
- 支持 npx 直接使用 