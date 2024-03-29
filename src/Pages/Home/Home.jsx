import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Home.css";
import { Helmet } from "react-helmet-async";

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Taskify | Home</title>
      </Helmet>
      <Flex justify="center" align="center" className="home">
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
    </>
  );
};

export default Home;
