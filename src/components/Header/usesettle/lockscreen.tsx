import { Button, Modal, message } from 'antd';
import { FC, useState } from 'react';
import { 
  FiMonitor, 
  FiClock, 
  FiX, 
  FiChevronUp, 
  FiChevronDown, 
  FiPlus, 
  FiMinus 
} from 'react-icons/fi';
import './lockscreen.less';

interface LockScreenConfig {
  timeRanges: Array<{
    id: string;
    startTime: string;
    endTime: string;
    timeoutMinutes: number;
  }>;
  defaultTimeout: number;
}

interface LockScreenModalProps {
  open: boolean;
  onCancel: () => void;
}

const LockScreenModal: FC<LockScreenModalProps> = ({ open, onCancel }) => {
  const [config, setConfig] = useState<LockScreenConfig>({
    timeRanges: [
      {
        id: '1',
        startTime: '17:00:00',
        endTime: '19:00:00',
        timeoutMinutes: 3
      }
    ],
    defaultTimeout: 60
  });

  // 更新时间范围
  const updateTimeRange = (id: string, field: string, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      timeRanges: prev.timeRanges.map(range => 
        range.id === id ? { ...range, [field]: value } : range
      )
    }));
  };

  // 调整超时时间
  const adjustTimeout = (id: string, delta: number) => {
    setConfig(prev => ({
      ...prev,
      timeRanges: prev.timeRanges.map(range => 
        range.id === id 
          ? { ...range, timeoutMinutes: Math.max(1, Math.min(999, range.timeoutMinutes + delta)) }
          : range
      )
    }));
  };

  // 添加时间范围
  const addTimeRange = () => {
    const newId = String(Date.now());
    setConfig(prev => ({
      ...prev,
      timeRanges: [...prev.timeRanges, {
        id: newId,
        startTime: '17:00:00',
        endTime: '19:00:00',
        timeoutMinutes: 3
      }]
    }));
  };

  // 删除时间范围
  const removeTimeRange = (id: string) => {
    if (config.timeRanges.length <= 1) return;
    
    setConfig(prev => ({
      ...prev,
      timeRanges: prev.timeRanges.filter(range => range.id !== id)
    }));
  };

  // 重置设置
  const handleReset = () => {
    setConfig({
      timeRanges: [
        {
          id: '1',
          startTime: '17:00:00',
          endTime: '19:00:00',
          timeoutMinutes: 3
        }
      ],
      defaultTimeout: 60
    });
    message.info('设置已重置');
  };

  // 保存设置
  const handleSave = () => {
    // 这里可以调用API保存设置
    console.log('保存锁屏设置:', config);
    message.success('设置已保存');
    onCancel();
  };

  if (!open) return null;

  return (
    <div className="lockscreen-modal-overlay">
      <div className="lockscreen-modal">
        {/* 标题栏 */}
        <div className="lockscreen-modal-header">
          <div className="header-title">
            <FiMonitor className="title-icon" />
            <span className="title-text">终端锁屏设置</span>
          </div>
          <button className="close-button" onClick={onCancel}>
            <FiX />
          </button>
        </div>

        {/* 默认锁屏时长提示栏 */}
        <div className="default-timeout-bar">
          默认锁屏时长: {config.defaultTimeout}分钟
        </div>

        {/* 锁屏设置区域 */}
        <div className="lockscreen-settings">
          {config.timeRanges.map((range, index) => (
            <div key={range.id} className="time-range-item">
              {/* 锁屏时间段选择 */}
              <div className="time-range-section">
                <label className="section-label">锁屏时间段</label>
                <div className="time-inputs">
                  <input
                    type="time"
                    value={range.startTime}
                    onChange={(e) => updateTimeRange(range.id, 'startTime', e.target.value)}
                    className="time-input"
                  />
                  <span className="time-separator">→</span>
                  <input
                    type="time"
                    value={range.endTime}
                    onChange={(e) => updateTimeRange(range.id, 'endTime', e.target.value)}
                    className="time-input"
                  />
                  <FiClock className="clock-icon" />
                </div>
              </div>

              {/* 超时锁屏时间设置 */}
              <div className="timeout-section">
                <label className="section-label">超时多少时间锁屏</label>
                <div className="timeout-inputs">
                  <div className="number-input-group">
                    <input
                      type="number"
                      value={range.timeoutMinutes}
                      onChange={(e) => updateTimeRange(range.id, 'timeoutMinutes', parseInt(e.target.value) || 1)}
                      className="number-input"
                      min="1"
                      max="999"
                    />
                    <div className="stepper-buttons">
                      <button 
                        className="stepper-button"
                        onClick={() => adjustTimeout(range.id, 1)}
                      >
                        <FiChevronUp />
                      </button>
                      <button 
                        className="stepper-button"
                        onClick={() => adjustTimeout(range.id, -1)}
                      >
                        <FiChevronDown />
                      </button>
                    </div>
                  </div>
                  <span className="unit-text">分钟</span>
                  <div className="action-buttons">
                    <button 
                      className="action-button"
                      onClick={addTimeRange}
                    >
                      <FiPlus />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => removeTimeRange(range.id)}
                      disabled={config.timeRanges.length <= 1}
                    >
                      <FiMinus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 操作按钮区域 */}
        <div className="lockscreen-modal-footer">
          <button className="reset-button" onClick={handleReset}>
            重置
          </button>
          <button className="confirm-button" onClick={handleSave}>
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockScreenModal;
