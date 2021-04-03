import { useState } from "react";
import './header.css';
import { Menu } from 'antd';
import { MailOutlined, SearchOutlined } from '@ant-design/icons';
// import SearchFriend from "./search-friend.jpeg"
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
            <Menu.Item key="findfriend" icon={<SearchOutlined />}>
              Find friends
            </Menu.Item>
            {/* <img style={{height: "3em"}} src={SearchFriend} /> */}
          </Menu>
      </div>
    );
  }
  
export default Header;
