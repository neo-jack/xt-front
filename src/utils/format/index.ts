// 工具函数：字符串格式化

/**
 * 去除字符串首尾空格
 * @param str 要处理的字符串
 * @returns 处理后的字符串
 */
export const trim = (str: string): string => {
  return str?.trim() || '';
};

/**
 * 格式化用户名显示
 * @param name 用户名
 * @returns 格式化后的用户名
 */
export const formatUserName = (name: string): string => {
  if (!name) return '未知用户';
  return trim(name);
};

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};