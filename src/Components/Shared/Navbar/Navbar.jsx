import { Menu, Button, Drawer } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setCollapsed(true);
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="navbar-container navbar">
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="taskify" style={{ marginRight: "auto" }}>
          <Link to="/" className="header">
            Taskify
          </Link>
        </Menu.Item>
        <div className="small-screen-hide">
          <Menu.Item
            key="taskform"
            className={location.pathname === "/taskform" ? "active" : ""}
          >
            <Link to="/taskform">Taskform</Link>
          </Menu.Item>
          <Menu.Item
            key="tasklist"
            className={location.pathname === "/tasklist" ? "active" : ""}
          >
            <Link to="/tasklist">Tasklist</Link>
          </Menu.Item>
        </div>

        <Button
          className="menu-button"
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
        />
      </Menu>
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleCollapsed}
        visible={!collapsed}
        closeIcon={<CloseOutlined />}
        width={300}
        className="drawer"
      >
        <Menu mode="inline">
          <Menu.Item
            key="taskform"
            className={location.pathname === "/taskform" ? "active" : ""}
          >
            <Link to="/taskform">Taskform</Link>
          </Menu.Item>
          <Menu.Item
            key="tasklist"
            className={location.pathname === "/tasklist" ? "active" : ""}
          >
            <Link to="/tasklist">Tasklist</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Navbar;
