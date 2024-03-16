import {
  Button,
  Flex,
  Space,
  Table,
  Typography,
  Select,
  Empty,
  Modal,
  Form,
  Input,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./TaskList.css";
import {
  deleteTask,
  updateTaskStatus,
  selectTasks,
  selectTotalTasks,
  selectCompletedTasks,
  setSelectedPriority,
  editTask,
  selectSelectedPriority,
} from "../../Redux/TaskSlice";
import Swal from "sweetalert2";

const { Title } = Typography;
const { Option } = Select;

const TaskList = () => {
  const dispatch = useDispatch();
  const savedTasks = useSelector(selectTasks);
  const totalTasks = useSelector(selectTotalTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const selectedPriority = useSelector(selectSelectedPriority);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [form] = Form.useForm(); // Ant Design form instance

  useEffect(() => {}, [savedTasks]);

  const priorityOptions = ["All", "Low", "Medium", "High"].map((priority) => (
    <Option key={priority} value={priority}>
      {priority}
    </Option>
  ));

  // Define filteredTasks based on selected priority
  const filteredTasks =
    selectedPriority === "All"
      ? savedTasks
      : savedTasks.filter((task) => task.priority === selectedPriority);

  const columns = [
    {
      title: "Task Title",
      dataIndex: "task-title",
      key: "name",
    },
    {
      title: "Task Description",
      dataIndex: "task-description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => (
        <span
          style={{
            color:
              text === "Low" ? "orange" : text === "Medium" ? "green" : "red",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            className="mark-as-completed"
            onClick={() => handleComplete(record)}
            disabled={record.status === "completed"}
          >
            Mark as Completed
          </Button>
          <Button className="edit-btn" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button className="delete-btn" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleComplete = (record) => {
    const updatedTasks = savedTasks.map((task) => {
      if (task.id === record.id) {
        return { ...task, status: "completed" };
      }
      return task;
    });
    dispatch(updateTaskStatus(updatedTasks));
  };

  const handleEdit = (record) => {
    setEditTaskId(record.id);
    setEditModalVisible(true);
    form.setFieldsValue({
      "task-title": record["task-title"],
      "task-description": record["task-description"],
      status: record.status,
      priority: record.priority,
    });
  };

  const handleDelete = (record) => {
    dispatch(deleteTask(record.id));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task Deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handlePriorityChange = (value) => {
    dispatch(setSelectedPriority(value));
  };

  const onFinishEdit = (values) => {
    const updatedTask = {
      ...savedTasks.find((task) => task.id === editTaskId),
      ...values,
    };
    dispatch(editTask(updatedTask));
    setEditModalVisible(false);
  };

  return (
    <Flex justify="center" align="center" className="task-list">
      <Title level={2}>All Tasks</Title>
      <p className="total-task">Total Tasks : {totalTasks}</p>
      <p className="completed-task">Completed Tasks : {completedTasks}</p>
      <Select
        defaultValue="All"
        className="filter-priority"
        onChange={handlePriorityChange}
      >
        {priorityOptions}
      </Select>
      {filteredTasks.length ? (
        <Table
          dataSource={filteredTasks}
          columns={columns}
          pagination={false}
          scroll={{ x: 1300 }}
          className="table-top"
        />
      ) : (
        <Empty description="No tasks available for the selected priority" />
      )}
      <Modal
        title={<div className="edit-task">Edit Task</div>}
        centered
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinishEdit}>
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
              <Radio
                style={{ fontSize: "16px", fontWeight: "500" }}
                value="incomplete"
              >
                Incomplete
              </Radio>
              <Radio
                style={{ fontSize: "16px", fontWeight: "500" }}
                value="completed"
              >
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
              <Radio
                value="Low"
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                Low
              </Radio>
              <Radio
                value="Medium"
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                Medium
              </Radio>
              <Radio
                value="High"
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                High
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="save-btn">
            <Flex justify="center" align="center">
              <Button
                type="primary"
                htmlType="submit" className="edit-btn"
                onClick={() => setEditModalVisible(false)}
              >
                Save
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default TaskList;
