import { Switch, InputNumber, Input, Button, Modal, message, Form } from 'antd';
import { FC, useState, useEffect } from 'react';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useLockScreen from '../../../models/uselockscreen';

interface LockScreenModalProps {
  open: boolean;
  onCancel: () => void;
}

// 组件内联样式
const styles = {
  form: {
    marginTop: '20px',
  } as React.CSSProperties,
  
  formLabel: {
    fontWeight: 500,
  } as React.CSSProperties,
  
  inputNumber: {
    width: '100%',
  } as React.CSSProperties,
  
  switch: {
    backgroundColor: '#d1d5db',
  } as React.CSSProperties,
  
  switchChecked: {
    backgroundColor: '#1890ff',
  } as React.CSSProperties,
  
  description: {
    background: '#f6f8fa',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
    marginTop: '16px',
  } as React.CSSProperties,
  
  descriptionTitle: {
    fontWeight: 500,
    marginBottom: '4px',
  } as React.CSSProperties,
  
  descriptionItem: {
    marginBottom: '2px',
  } as React.CSSProperties,
};

const LockScreenModal: FC<LockScreenModalProps> = ({ open, onCancel }) => {
  const { config, setConfig, resetConfig } = useLockScreen();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 初始化表单值
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        isEnabled: config.isEnabled,
        password: config.password,
        timeoutMinutes: config.timeoutMinutes,
        autoLockEnabled: config.autoLockEnabled,
      });
    }
  }, [open, config, form]);

  // 保存设置
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const result = setConfig(values);
      
      if (result.success) {
        message.success(result.message || '设置已保存');
        onCancel();
      } else {
        message.error(result.message || '保存失败');
      }
    } catch (error) {
      console.error('保存锁屏设置失败:', error);
      message.error('保存设置失败，请检查输入');
    } finally {
      setLoading(false);
    }
  };

  // 重置设置
  const handleReset = () => {
    Modal.confirm({
      title: '确认重置',
      content: '确定要重置所有锁屏设置吗？此操作不可撤销。',
      okText: '确定重置',
      cancelText: '取消',
      onOk: () => {
        const result = resetConfig();
        if (result.success) {
          message.success(result.message || '设置已重置');
          form.resetFields();
        } else {
          message.error(result.message || '重置失败');
        }
      },
    });
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LockOutlined />
          <span>锁屏设置</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
          保存
        </Button>,
      ]}
      width={500}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        style={styles.form}
      >
        {/* 启用锁屏功能 */}
        <Form.Item
          label="启用锁屏功能"
          name="isEnabled"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* 锁屏密码 */}
        <Form.Item
          label="锁屏密码"
          name="password"
          rules={[
            { required: true, message: '请设置锁屏密码' },
            { min: 4, message: '密码至少需要4位' },
            { max: 20, message: '密码不能超过20位' },
          ]}
        >
          <Input.Password
            placeholder="请输入锁屏密码"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            maxLength={20}
          />
        </Form.Item>

        {/* 启用自动锁屏 */}
        <Form.Item
          label="启用自动锁屏"
          name="autoLockEnabled"
          valuePropName="checked"
          tooltip="开启后，系统会在指定时间内无操作时自动锁屏"
        >
          <Switch />
        </Form.Item>

        {/* 超时时间 */}
        <Form.Item
          label="超时时间（分钟）"
          name="timeoutMinutes"
          rules={[
            { required: true, message: '请设置超时时间' },
            { type: 'number', min: 1, message: '超时时间至少为1分钟' },
            { type: 'number', max: 1440, message: '超时时间不能超过1440分钟（24小时）' },
          ]}
        >
          <InputNumber
            placeholder="请输入超时时间"
            min={1}
            max={1440}
            style={styles.inputNumber}
            addonAfter="分钟"
          />
        </Form.Item>

        {/* 功能说明 */}
        <div style={styles.description}>
          <div style={styles.descriptionTitle}>功能说明：</div>
          <div style={styles.descriptionItem}>• 启用锁屏功能后，可以手动或自动锁屏</div>
          <div style={styles.descriptionItem}>• 设置密码用于解锁屏幕</div>
          <div style={styles.descriptionItem}>• 自动锁屏：是否启用超时自动锁屏</div>
          <div style={styles.descriptionItem}>• 超时时间：无操作后自动锁屏的时间</div>
        </div>
      </Form>
    </Modal>
  );
};

export default LockScreenModal;
