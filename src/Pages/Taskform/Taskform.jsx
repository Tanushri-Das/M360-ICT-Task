import React, { useRef } from "react";
import { Form, Input, Button, Radio, Typography, Flex } from "antd";
import "./TaskForm.css";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const TaskForm = () => {
  const { Title } = Typography;
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const taskWithId = { id: uuidv4(), ...values };
    dispatch(addTask(taskWithId));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task Added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    formRef.current.resetFields();
  };

  return (
    <div className="taskform-div">
      <Title level={2} className="new-task-label">
        Add New Task
      </Title>
      <div className="taskform">
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          className="form"
          ref={formRef}
        >
          <Form.Item
            name="task-title"
            className="form-label"
            label="Task Title"
          >
            <Input className="task-title" />
          </Form.Item>

          <Form.Item
            name="task-description"
            className="form-label"
            label="Task Description"
          >
            <Input.TextArea className="task-desc" />
          </Form.Item>

          <Form.Item name="status" className="form-label" label="Status">
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

          <Form.Item name="priority" className="form-label" label="Priority">
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

          <Flex justify="center" align="center">
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
