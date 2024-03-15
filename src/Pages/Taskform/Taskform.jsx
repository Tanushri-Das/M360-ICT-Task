import React from "react";
import { Form, Input, Button, Radio, Flex, Typography } from "antd";
import "./TaskForm.css";

const MyFormItemContext = React.createContext([]);

function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );
  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const TaskForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const { Title } = Typography;
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
        >
          <MyFormItemGroup prefix={["user"]}>
            <MyFormItem name="user" hidden initialValue={{}}>
              <Input />
            </MyFormItem>
            <MyFormItemGroup prefix={["name"]}>
              <MyFormItem
                name="task-title"
                className="form-label"
                label="Task Title"
              >
                <Input className="task-title" />
              </MyFormItem>
            </MyFormItemGroup>
            <MyFormItemGroup prefix={["task-description"]}>
              <Form.Item
                name="task-description"
                className="form-label"
                label="Task Description"
              >
                <Input.TextArea className="task-desc" />
              </Form.Item>
            </MyFormItemGroup>
            <MyFormItemGroup prefix={["status"]}>
              <MyFormItem className="form-label" name="status" label="Status">
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
              </MyFormItem>
            </MyFormItemGroup>

            <MyFormItemGroup prefix={["priority"]}>
              <MyFormItem
                name="priority"
                className="form-label"
                label="Priority"
              >
                <Radio.Group>
                  <Radio
                    value="low"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    Low
                  </Radio>
                  <Radio
                    value="medium"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    Medium
                  </Radio>
                  <Radio
                    value="high"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    High
                  </Radio>
                </Radio.Group>
              </MyFormItem>
            </MyFormItemGroup>
          </MyFormItemGroup>
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
