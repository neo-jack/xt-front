// Mock工具函数统一导出文件

// Token相关工具函数
export {
  parseTokenUserId,
  isValidTokenFormat,
  parseTokenPayload,
  isTokenExpired
} from './tokenid';

// 文件存储相关工具函数
export {
  readMockFile,
  writeMockFile,
  updateFavoriteFile,
  updateFavoriteFileFormatted
} from './fileStorage';

// 可以在这里添加其他工具函数的导出
// export * from './other-utils';
