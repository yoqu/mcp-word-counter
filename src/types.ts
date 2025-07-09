/**
 * 字数统计结果接口
 */
export interface WordCountResult {
  /** 文件路径 */
  filePath: string;
  /** 总字数（向上取整） */
  totalWords: number;
  /** 详细统计信息 */
  details: {
    /** 汉字数量 */
    chineseChars: number;
    /** 英文字符数量 */
    englishChars: number;
    /** 全角字符数量 */
    fullWidthChars: number;
    /** 半角字符数量 */
    halfWidthChars: number;
    /** 其他字符数量 */
    otherChars: number;
    /** 原始字数（未取整） */
    rawWordCount: number;
  };
  /** 是否成功读取文件 */
  success: boolean;
  /** 错误信息（如果有） */
  error?: string;
}

/**
 * 字数统计工具参数
 */
export interface WordCountParams {
  /** 文件路径数组 */
  filePaths: string[];
} 