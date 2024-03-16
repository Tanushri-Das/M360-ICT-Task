import './TaskList.css'
import { Modal, Form, Input, Radio, Button, Flex } from 'antd';

const EditTaskModal = ({ visible, onCancel, onFinishEdit, form, record }) => {
  const initialValues = record ? {
    "task-title": record["task-title"],
    "task-description": record["task-description"],
    status: record.status,
    priority: record.priority,
  } : {};

  return (
    <Modal
      title={<div className="edit-task">Edit Task</div>}
      centered
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinishEdit} initialValues={initialValues}>
        <Form.Item
          name="task-title"
          label="Task Title"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="modal-form-label"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="task-description"
          label="Task Description"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="modal-form-label"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="modal-form-label"
        >
          <Radio.Group className="radio-btn">
            <Radio style={{ fontSize: "16px", fontWeight: "500" }} value="incomplete">
              Incomplete
            </Radio>
            <Radio style={{ fontSize: "16px", fontWeight: "500" }} value="completed">
              Completed
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          labelAlign="left"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="modal-form-label"
        >
          <Radio.Group>
            <Radio value="Low" style={{ fontSize: "16px", fontWeight: "500" }}>
              Low
            </Radio>
            <Radio value="Medium" style={{ fontSize: "16px", fontWeight: "500" }}>
              Medium
            </Radio>
            <Radio value="High" style={{ fontSize: "16px", fontWeight: "500" }}>
              High
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item className="save-btn">
          <Flex justify="center" align="center">
            <Button
              type="primary"
              htmlType="submit"
              className="edit-btn"
              onClick={onCancel}
            >
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
