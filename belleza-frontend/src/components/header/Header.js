import { useState } from "react";
import './header.css';
import { Link } from "react-router-dom";
import { Menu, Button } from 'antd';
import { MailOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import FriendRequest from "./../friendRequests/FriendRequest";
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
              <FriendRequest />
            <Menu.Item key="findfriend" icon={<SearchOutlined />}>
              <Link to="/findfriend">
                Find friends
              </Link>
            </Menu.Item>
            {/* <img style={{height: "3em"}} src={SearchFriend} /> */}
          </Menu>
      </div>
    );
  }
  
export default Header;
