// 注意：在实际的mock环境中，我们可能无法直接写入源代码文件
// 这里提供一个模拟的文件存储实现，主要用于演示
// 在生产环境中，建议使用数据库或其他持久化存储方案

/**
 * Mock 数据存储工具
 * 使用内存存储来模拟文件持久化，在开发环境中提供数据一致性
 */

// 内存存储，模拟文件持久化
let mockFavoriteData: any[] | null = null;

/**
 * 读取收藏数据（从内存存储）
 * @returns 收藏数据
 */
export const readFavoriteData = (): any[] => {
  if (mockFavoriteData !== null) {
    console.log('[MockStorage] 从内存存储读取收藏数据');
    return mockFavoriteData;
  }
  
  console.log('[MockStorage] 内存存储为空，返回空数组');
  return [];
};

/**
 * 写入收藏数据（到内存存储）
 * @param userFavorites 新的用户收藏数据
 */
export const writeFavoriteData = (userFavorites: any[]): void => {
  mockFavoriteData = JSON.parse(JSON.stringify(userFavorites)); // 深拷贝
  console.log('[MockStorage] 收藏数据已写入内存存储，共', userFavorites.length, '个用户');
};

/**
 * 更新收藏数据（简化版本）
 * @param userFavorites 新的用户收藏数据
 */
export const updateFavoriteFile = (userFavorites: any[]): void => {
  writeFavoriteData(userFavorites);
  console.log('[MockStorage] 收藏数据已更新');
};

/**
 * 更新收藏数据（格式化版本，与updateFavoriteFile相同）
 * @param userFavorites 新的用户收藏数据
 */
export const updateFavoriteFileFormatted = (userFavorites: any[]): void => {
  updateFavoriteFile(userFavorites);
};

// 兼容性导出（为了保持API一致性）
export const readMockFile = (filePath: string): string => {
  console.log('[MockStorage] readMockFile 在当前实现中不可用');
  return '';
};

export const writeMockFile = (filePath: string, content: string): void => {
  console.log('[MockStorage] writeMockFile 在当前实现中不可用');
};
