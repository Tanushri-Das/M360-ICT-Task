import React, { useRef } from "react";
import { Form, Input, Button, Radio, Typography, Flex } from "antd";
import "./TaskForm.css";
import { useDispatch } from "react-redux";
import { addTask } from "../../Redux/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>Taskify | Taskform</title>
      </Helmet>
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
              rules={[
                { required: true, message: "Please input the task title!" },
              ]}
            >
              <Input className="task-title" />
            </Form.Item>

            <Form.Item
              name="task-description"
              className="form-label"
              label="Task Description"
              rules={[
                {
                  required: true,
                  message: "Please input the task description!",
                },
              ]}
            >
              <Input.TextArea className="task-desc" />
            </Form.Item>

            <Form.Item
              name="status"
              className="form-label"
              label="Status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Radio.Group className="radio-btn">
                <Radio className="status-radio-btn" value="incomplete">
                  Incomplete
                </Radio>
                <Radio className="status-radio-btn" value="completed">
                  Completed
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="priority"
              className="form-label"
              label="Priority"
              rules={[
                { required: true, message: "Please select the priority!" },
              ]}
            >
              <Radio.Group>
                <Radio value="Low" className="status-radio-btn">
                  Low
                </Radio>
                <Radio value="Medium" className="status-radio-btn">
                  Medium
                </Radio>
                <Radio value="High" className="status-radio-btn">
                  High
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Flex justify="center" align="center">
              <Button type="primary" className="add-task" htmlType="submit">
                Add New Task
              </Button>
            </Flex>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
