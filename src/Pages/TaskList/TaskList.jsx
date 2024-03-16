import { Button, Flex, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./TaskList.css";
import {
  deleteTask,
  updateTaskStatus,
  selectTasks,
  selectTotalTasks,
  selectCompletedTasks,
} from "../../Redux/TaskSlice";
import Swal from "sweetalert2";

const { Title } = Typography;

const TaskList = () => {
  const dispatch = useDispatch();
  const savedTasks = useSelector(selectTasks);
  const totalTasks = useSelector(selectTotalTasks);
  console.log("totalTasks", totalTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  console.log("completedTasks", completedTasks);

  useEffect(() => {}, [savedTasks]);

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
          <Button onClick={() => handleEdit(record)}>Edit</Button>
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
        if (task.status === "completed") {
          return task; // No change if already completed
        } else {
          return { ...task, status: "completed" };
        }
      }
      return task;
    });
    dispatch(updateTaskStatus(updatedTasks));
  };

  const handleEdit = (record) => {
    // Handle edit action
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

  return (
    <Flex justify="center" align="center" className="task-list">
      <Title level={2} className="home-title">
        All Tasks
      </Title>
      <Title level={4} className="home-title">
        Total Tasks : {totalTasks}
      </Title>
      <Title level={4} className="home-title">
        Completed Tasks : {completedTasks}
      </Title>
      <Table
        dataSource={savedTasks}
        columns={columns}
        pagination={false}
        scroll={{ x: 1300 }}
        className="table-top"
      />
    </Flex>
  );
};

export default TaskList;
