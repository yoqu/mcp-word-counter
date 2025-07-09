import { WordCountResult } from './types.js';
/**
 * 统计单个文件的字数
 */
export declare function countWordsInFile(filePath: string): Promise<WordCountResult>;
/**
 * 统计多个文件的字数
 */
export declare function countWordsInFiles(filePaths: string[]): Promise<WordCountResult[]>;
//# sourceMappingURL=word-counter.d.ts.map