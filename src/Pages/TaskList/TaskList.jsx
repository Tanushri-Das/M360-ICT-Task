import { Button, Flex, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./TaskList.css";
import { deleteTask } from "../../Redux/TaskSlice";
import Swal from "sweetalert2";

const { Title } = Typography;

const TaskList = () => {
  const dispatch = useDispatch();
  const savedTasks = useSelector((state) => state.tasks.tasks);

  console.log(savedTasks);

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
          <Button onClick={() => handleComplete(record)}>
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
    // Handle mark as completed action
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
