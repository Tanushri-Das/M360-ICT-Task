import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Home.css";

const { Title } = Typography;

const Home = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "80vh", flexDirection: "column" }}
    >
      <Title level={2} className="home-title">
        Welcome to Todo List App
      </Title>
      <Title level={4} className="home-desc">
        Do you want to add a task in the TodoList ? Kindly click this button
      </Title>
      <Link to="/taskform" className="home-btn-link">
        <Button size="large" className="home-btn">
          Add Task <ArrowRightOutlined />
        </Button>
      </Link>
    </Flex>
  );
};

export default Home;
