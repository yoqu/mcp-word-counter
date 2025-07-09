#!/usr/bin/env node

import { countWordsInFile } from './dist/word-counter.js';

async function testWordCounter() {
  console.log('🧪 测试中文字数统计功能...\n');
  
  try {
    const result = await countWordsInFile('./example.txt');
    
    if (result.success) {
      console.log('✅ 测试成功！');
      console.log(`📄 文件: ${result.filePath}`);
      console.log(`📊 总字数: ${result.totalWords}`);
      console.log('\n详细统计:');
      console.log(`  🇨🇳 汉字: ${result.details.chineseChars}`);
      console.log(`  🇺🇸 英文字符: ${result.details.englishChars}`);
      console.log(`  ⬜ 全角字符: ${result.details.fullWidthChars}`);
      console.log(`  ⬛ 半角字符: ${result.details.halfWidthChars}`);
      console.log(`  ❓ 其他字符: ${result.details.otherChars}`);
      console.log(`  🔢 原始字数: ${result.details.rawWordCount.toFixed(2)}`);
      
      // 验证计算是否正确
      const expectedRaw = result.details.chineseChars * 1 + 
                         result.details.englishChars * 0.5 + 
                         result.details.fullWidthChars * 1 + 
                         result.details.halfWidthChars * 0.5;
      const expectedTotal = Math.ceil(expectedRaw);
      
      console.log('\n🔍 验证计算:');
      console.log(`  预期原始字数: ${expectedRaw.toFixed(2)}`);
      console.log(`  预期总字数: ${expectedTotal}`);
      console.log(`  计算正确: ${result.details.rawWordCount === expectedRaw && result.totalWords === expectedTotal ? '✅' : '❌'}`);
      
    } else {
      console.log('❌ 测试失败:');
      console.log(`错误: ${result.error}`);
    }
  } catch (error) {
    console.log('❌ 测试出错:');
    console.log(error.message);
  }
}

testWordCounter(); 