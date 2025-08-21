import React, { FC, useEffect } from 'react';
import LockScreen from './LockScreen';
import useLockScreen from '../../models/uselockscreen';

/**
 * 锁屏容器组件
 * 自动监听锁屏状态并显示锁屏界面
 */
const LockScreenContainer: FC = () => {
  const { state, isLocked } = useLockScreen();

  // 当锁屏状态改变时禁用/启用页面滚动
  useEffect(() => {
    if (isLocked) {
      // 锁屏时禁用页面滚动
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // 解锁时恢复页面滚动
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // 清理函数
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLocked]);

  // 阻止锁屏状态下的键盘快捷键
  useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 阻止常见的键盘快捷键
      if (
        e.key === 'F5' || // 刷新
        e.key === 'F11' || // 全屏
        e.key === 'F12' || // 开发者工具
        (e.ctrlKey && e.key === 'r') || // Ctrl+R 刷新
        (e.ctrlKey && e.key === 'w') || // Ctrl+W 关闭标签页
        (e.ctrlKey && e.key === 't') || // Ctrl+T 新建标签页
        (e.ctrlKey && e.key === 'n') || // Ctrl+N 新建窗口
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I 开发者工具
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J 控制台
        (e.altKey && e.key === 'F4') // Alt+F4 关闭窗口
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isLocked]);

  // 阻止锁屏状态下的右键菜单
  useEffect(() => {
    if (!isLocked) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isLocked]);

  const handleUnlock = () => {
    // 解锁成功后的处理，可以在这里添加额外的逻辑
    console.log('屏幕已解锁');
  };

  if (!isLocked) {
    return null;
  }

  return (
    <LockScreen 
      visible={isLocked}
      onUnlock={handleUnlock}
    />
  );
};

export default LockScreenContainer;
