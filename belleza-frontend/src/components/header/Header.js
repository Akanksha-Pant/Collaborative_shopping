import { useState } from "react";
import './header.css';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function Header() {
  const [ current, setCurrent ] = useState("home")
  const handleClick = (e) => {
    setCurrent(e.key);
  }
    return (
      <div className="Header">
          {/* <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
              Navigation
            </Menu.Item>
            <SubMenu key="SubMenu+" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        
          </Menu> */}
      </div>
    );
  }
  
export default Header;
