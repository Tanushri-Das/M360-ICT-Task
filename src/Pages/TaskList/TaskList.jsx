// TaskList.js
import React, { useState } from 'react';
import { Button, Flex, Space, Table, Typography, Select, Empty, Form } from 'antd';
import EditTaskModal from './EditTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTaskStatus, selectTasks, selectTotalTasks, selectCompletedTasks, setSelectedPriority, editTask, selectSelectedPriority } from '../../Redux/TaskSlice';
import Swal from 'sweetalert2';
import './TaskList.css'

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
  const [record, setRecord] = useState(null);

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
    setRecord(record);
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
      ...savedTasks.find((task) => task.id === record.id),
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
      <EditTaskModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onFinishEdit={onFinishEdit}
        form={form}
        record={record}
      />
    </Flex>
  );
};

export default TaskList;
