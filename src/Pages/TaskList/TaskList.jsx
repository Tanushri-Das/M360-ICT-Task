import React from "react";
import { Button, Flex, Space, Table, Typography } from "antd";
import "./TaskList.css";


const { Title } = Typography;
const TaskList = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const columns = [
    {
      title: "Task Title",
      dataIndex: ["name", "task-title"],
      key: "task-title",
    },
    {
      title: "Task Description",
      dataIndex: "task-description",
      key: "task-description",
    },
    {
      title: "Status",
      dataIndex: ["status", "status"],
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: ["priority", "priority"],
      key: "priority",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleComplete(record)}>
            Mark as Completed
          </Button>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button className="delete-btn" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const handleComplete = (record) => {
    // Handle mark as completed action
  };

  const handleEdit = (record) => {
    // Handle edit action
  };

  const handleDelete = (record) => {
    // Handle delete action
  };
  return (
    <Flex justify="center" align="center" className="task-list">
      <Title level={2} className="home-title">
        All Tasks
      </Title>
      <Table
        dataSource={savedTasks}
        columns={columns}
        pagination={false}
        scroll={{ x: 1300 }}
      />
    </Flex>
  );
};

export default TaskList;