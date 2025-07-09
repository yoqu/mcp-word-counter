import { promises as fs } from 'fs';
import { WordCountResult } from './types.js';

/**
 * 判断字符是否为中文汉字
 */
function isChineseChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||  // 基本汉字
    (code >= 0x3400 && code <= 0x4dbf) ||  // 扩展A
    (code >= 0x20000 && code <= 0x2a6df) || // 扩展B
    (code >= 0x2a700 && code <= 0x2b73f) || // 扩展C
    (code >= 0x2b740 && code <= 0x2b81f) || // 扩展D
    (code >= 0x2b820 && code <= 0x2ceaf) || // 扩展E
    (code >= 0xf900 && code <= 0xfaff) ||   // 兼容汉字
    (code >= 0x2f800 && code <= 0x2fa1f)    // 兼容扩展
  );
}

/**
 * 判断字符是否为英文字符
 */
function isEnglishChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
}

/**
 * 判断字符是否为全角字符
 */
function isFullWidthChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0xff00 && code <= 0xffef;
}

/**
 * 判断字符是否为半角字符
 */
function isHalfWidthChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x20 && code <= 0x7e;
}

/**
 * 统计文本中的字符数量
 */
function countCharacters(text: string) {
  let chineseChars = 0;
  let englishChars = 0;
  let fullWidthChars = 0;
  let halfWidthChars = 0;
  let otherChars = 0;

  for (const char of text) {
    if (isChineseChar(char)) {
      chineseChars++;
    } else if (isEnglishChar(char)) {
      englishChars++;
    } else if (isFullWidthChar(char)) {
      fullWidthChars++;
    } else if (isHalfWidthChar(char)) {
      halfWidthChars++;
    } else {
      otherChars++;
    }
  }

  return {
    chineseChars,
    englishChars,
    fullWidthChars,
    halfWidthChars,
    otherChars
  };
}

/**
 * 计算字数
 */
function calculateWordCount(stats: ReturnType<typeof countCharacters>): number {
  const { chineseChars, englishChars, fullWidthChars, halfWidthChars } = stats;
  
  // 计算字数：汉字=1，英文=0.5，全角=1，半角=0.5
  const rawWordCount = chineseChars * 1 + englishChars * 0.5 + fullWidthChars * 1 + halfWidthChars * 0.5;
  
  // 向上取整
  return Math.ceil(rawWordCount);
}

/**
 * 统计单个文件的字数
 */
export async function countWordsInFile(filePath: string): Promise<WordCountResult> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = countCharacters(content);
    const rawWordCount = stats.chineseChars * 1 + stats.englishChars * 0.5 + stats.fullWidthChars * 1 + stats.halfWidthChars * 0.5;
    const totalWords = Math.ceil(rawWordCount);

    return {
      filePath,
      totalWords,
      details: {
        ...stats,
        rawWordCount
      },
      success: true
    };
  } catch (error) {
    return {
      filePath,
      totalWords: 0,
      details: {
        chineseChars: 0,
        englishChars: 0,
        fullWidthChars: 0,
        halfWidthChars: 0,
        otherChars: 0,
        rawWordCount: 0
      },
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 统计多个文件的字数
 */
export async function countWordsInFiles(filePaths: string[]): Promise<WordCountResult[]> {
  const results = await Promise.all(
    filePaths.map(filePath => countWordsInFile(filePath))
  );
  
  return results;
} 