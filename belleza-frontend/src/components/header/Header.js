import { useState, useEffect } from "react";
import './header.css';
import { Link } from "react-router-dom";
import { Menu, Button, Space } from 'antd';
import { MailOutlined, SearchOutlined, UserAddOutlined, BellOutlined } from '@ant-design/icons';
import FriendRequest from "./../friendRequests/FriendRequest";
import Notifications from "./../notification/Notification";
import getCurrentUser from "./../../services/currentUser";
// import SearchFriend from "./search-friend.jpeg"
// const { SubMenu } = Menu;

function Header() {
  const [ currentTab, setCurrentTab ] = useState("home")
  const [ currentUser, setCurrentUser ] = useState()

  useEffect(() => {
    return async () => {
      const user = await getCurrentUser(); 
      setCurrentUser(user);
    }
  }, [])
  const handleClick = (e) => {
    setCurrentTab(e.key);
  }
  const currentUserDetails = () => {
    if (!currentUser) 
      return (
      <Link to="/login">
         <Button> Login</Button>
      </Link>)
    else
      return (
      <Button type="primary" shape="circle">
        <Link to="/profile">{currentUser.username[0]}</Link>
      </Button>)
  }
    return (
      <Space className="Header">
          <Menu onClick={handleClick} selectedKeys={[currentTab]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="findfriend" icon={<SearchOutlined />}>
              <Link to="/findfriend">
                Find friends
              </Link>
            </Menu.Item>
            <FriendRequest />
            <Notifications />
            { currentUserDetails() }            
            {/* <img style={{height: "3em"}} src={SearchFriend} /> */}
          </Menu>
      </Space>
    );
  }
  
export default Header;
