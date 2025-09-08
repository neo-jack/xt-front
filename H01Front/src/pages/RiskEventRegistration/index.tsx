import { Card, Form, Input, Select, DatePicker, Button, Table, Space, Tag, Modal, message } from 'antd';
import { FC, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

interface RiskEvent {
  id: string;
  eventName: string;
  eventType: string;
  severity: 'high' | 'medium' | 'low';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  location: string;
  description: string;
  reporter: string;
  reportDate: string;
  responsiblePerson: string;
  estimatedLoss: string;
  actualLoss: string;
}

const RiskEventRegistration: FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<RiskEvent | null>(null);
  const [events, setEvents] = useState<RiskEvent[]>([
    {
      id: '001',
      eventName: '设备异常停机',
      eventType: '设备故障',
      severity: 'high',
      status: 'investigating',
      location: '生产车间A区',
      description: '主要生产设备在运行过程中突然停机，影响生产进度',
      reporter: '张工程师',
      reportDate: '2024-01-15',
      responsiblePerson: '李主管',
      estimatedLoss: '50000',
      actualLoss: '30000'
    },
    {
      id: '002',
      eventName: '人员操作失误',
      eventType: '人员操作',
      severity: 'medium',
      status: 'resolved',
      location: '质检部门',
      description: '质检员在操作过程中出现失误，导致部分产品需要返工',
      reporter: '王质检',
      reportDate: '2024-01-10',
      responsiblePerson: '赵经理',
      estimatedLoss: '10000',
      actualLoss: '8000'
    }
  ]);

  const handleAdd = () => {
    setEditingEvent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: RiskEvent) => {
    setEditingEvent(record);
    form.setFieldsValue({
      ...record,
      reportDate: record.reportDate ? new Date(record.reportDate) : null
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除这个风险事件吗？',
      onOk() {
        setEvents(events.filter(event => event.id !== id));
        message.success('删除成功');
      }
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const eventData = {
        ...values,
        id: editingEvent?.id || Date.now().toString(),
        reportDate: values.reportDate?.format('YYYY-MM-DD') || new Date().toISOString().split('T')[0]
      };

      if (editingEvent) {
        setEvents(events.map(event => event.id === editingEvent.id ? eventData : event));
        message.success('更新成功');
      } else {
        setEvents([...events, eventData]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: '事件ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '事件名称',
      dataIndex: 'eventName',
      key: 'eventName',
      width: 200,
    },
    {
      title: '事件类型',
      dataIndex: 'eventType',
      key: 'eventType',
      width: 120,
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      render: (severity: string) => {
        const colorMap = { high: 'red', medium: 'orange', low: 'green' };
        const textMap = { high: '高', medium: '中', low: '低' };
        return <Tag color={colorMap[severity as keyof typeof colorMap]}>{textMap[severity as keyof typeof textMap]}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap = {
          pending: 'red',
          investigating: 'orange',
          resolved: 'blue',
          closed: 'green'
        };
        const textMap = {
          pending: '待处理',
          investigating: '调查中',
          resolved: '已解决',
          closed: '已关闭'
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{textMap[status as keyof typeof textMap]}</Tag>;
      }
    },
    {
      title: '发生地点',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '报告人',
      dataIndex: 'reporter',
      key: 'reporter',
      width: 100,
    },
    {
      title: '报告日期',
      dataIndex: 'reportDate',
      key: 'reportDate',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: RiskEvent) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="风险事件登记" variant="borderless">
        <div style={{ marginBottom: '16px' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            登记新事件
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={events}
          rowKey="id"
          pagination={{
            total: events.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          scroll={{ x: 1200 }}
        />

        <Modal
          title={editingEvent ? '编辑风险事件' : '登记新风险事件'}
          open={isModalVisible}
          onOk={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              severity: 'medium',
              status: 'pending'
            }}
          >
            <Form.Item
              name="eventName"
              label="事件名称"
              rules={[{ required: true, message: '请输入事件名称' }]}
            >
              <Input placeholder="请输入事件名称" />
            </Form.Item>

            <Form.Item
              name="eventType"
              label="事件类型"
              rules={[{ required: true, message: '请选择事件类型' }]}
            >
              <Select placeholder="请选择事件类型">
                <Option value="设备故障">设备故障</Option>
                <Option value="人员操作">人员操作</Option>
                <Option value="环境因素">环境因素</Option>
                <Option value="管理缺陷">管理缺陷</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="severity"
              label="严重程度"
              rules={[{ required: true, message: '请选择严重程度' }]}
            >
              <Select placeholder="请选择严重程度">
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="处理状态"
              rules={[{ required: true, message: '请选择处理状态' }]}
            >
              <Select placeholder="请选择处理状态">
                <Option value="pending">待处理</Option>
                <Option value="investigating">调查中</Option>
                <Option value="resolved">已解决</Option>
                <Option value="closed">已关闭</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="location"
              label="发生地点"
              rules={[{ required: true, message: '请输入发生地点' }]}
            >
              <Input placeholder="请输入发生地点" />
            </Form.Item>

            <Form.Item
              name="description"
              label="事件描述"
              rules={[{ required: true, message: '请输入事件描述' }]}
            >
              <TextArea rows={4} placeholder="请详细描述事件经过、原因和影响" />
            </Form.Item>

            <Form.Item
              name="reporter"
              label="报告人"
              rules={[{ required: true, message: '请输入报告人' }]}
            >
              <Input placeholder="请输入报告人姓名" />
            </Form.Item>

            <Form.Item
              name="reportDate"
              label="报告日期"
              rules={[{ required: true, message: '请选择报告日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="responsiblePerson"
              label="负责人"
              rules={[{ required: true, message: '请输入负责人' }]}
            >
              <Input placeholder="请输入负责人姓名" />
            </Form.Item>

            <Form.Item
              name="estimatedLoss"
              label="预估损失"
            >
              <Input placeholder="请输入预估损失金额" />
            </Form.Item>

            <Form.Item
              name="actualLoss"
              label="实际损失"
            >
              <Input placeholder="请输入实际损失金额" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default RiskEventRegistration;
