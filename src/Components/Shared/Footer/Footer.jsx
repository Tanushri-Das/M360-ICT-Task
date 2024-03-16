import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { Title } = Typography;
  return (
    <>
      <AntFooter style={{ textAlign: "center" }}>
        <Title level={4}>© 2024 - All rights reserved by Tanushri Das</Title>
      </AntFooter>
    </>
  );
};

export default Footer;
