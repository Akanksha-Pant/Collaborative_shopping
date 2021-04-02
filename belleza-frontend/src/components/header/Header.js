import { useState } from "react";
import './header.css';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;

function Header() {
  const [ current, setCurrent ] = useState("home")
  const handleClick = (e) => {
    setCurrent(e.key);
  }
    return (
      <div className="Header">
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
              Navigation
            </Menu.Item>
            <Menu.Item key="box" icon={<MailOutlined />}>
              Box
            </Menu.Item>
          </Menu>
      </div>
    );
  }
  
export default Header;
