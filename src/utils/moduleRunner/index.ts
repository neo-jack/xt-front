import { SubModule } from '@/types/workcenter';

/**
 * 启动模块
 * @param module 模块信息
 * @returns Promise<boolean> 启动是否成功
 */
export const startModule = async (module: SubModule): Promise<boolean> => {
  // TODO: 后续实现真实的模块启动逻辑
  // 临时模拟启动过程
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`启动模块: ${module.name}, 端口: ${module.port}`);
      resolve(true);
    }, 1000);
  });
};
