#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { countWordsInFiles } from './word-counter.js';
import { WordCountParams } from './types.js';

/**
 * MCP服务器类
 */
class WordCounterServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-word-counter',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // 列出可用工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'count_words',
            description: '统计文件中的中文字数。支持单个或多个文件路径。计算规则：汉字=1，英文字符=0.5，全角字符=1，半角字符=0.5，结果向上取整。',
            inputSchema: {
              type: 'object',
              properties: {
                filePaths: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  description: '要统计字数的文件路径数组'
                }
              },
              required: ['filePaths']
            }
          }
        ]
      };
    });

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
      const { name, arguments: args } = request.params;

      if (name === 'count_words') {
        try {
          const params = args as WordCountParams;
          
          if (!params.filePaths || !Array.isArray(params.filePaths)) {
            throw new Error('filePaths参数必须是一个字符串数组');
          }

          if (params.filePaths.length === 0) {
            throw new Error('至少需要提供一个文件路径');
          }

          const results = await countWordsInFiles(params.filePaths);
          
          // 格式化输出结果
          const summary = results.map(result => {
            if (result.success) {
              return `文件: ${result.filePath}
总字数: ${result.totalWords}
详细统计:
  - 汉字: ${result.details.chineseChars}
  - 英文字符: ${result.details.englishChars}
  - 全角字符: ${result.details.fullWidthChars}
  - 半角字符: ${result.details.halfWidthChars}
  - 其他字符: ${result.details.otherChars}
  - 原始字数: ${result.details.rawWordCount.toFixed(2)}`;
            } else {
              return `文件: ${result.filePath}
错误: ${result.error}`;
            }
          }).join('\n\n');

          const totalWords = results
            .filter(r => r.success)
            .reduce((sum, r) => sum + r.totalWords, 0);

          const finalSummary = `${summary}\n\n总计字数: ${totalWords}`;

          return {
            content: [
              {
                type: 'text',
                text: finalSummary
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `错误: ${error instanceof Error ? error.message : '未知错误'}`
              }
            ],
            isError: true
          };
        }
      }

      throw new Error(`未知的工具: ${name}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Word Counter Server 已启动');
  }
}

// 启动服务器
const server = new WordCounterServer();
server.run().catch(console.error); 