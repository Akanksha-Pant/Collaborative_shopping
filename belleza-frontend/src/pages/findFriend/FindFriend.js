import { useState } from "react";
import "./findfriend.css";
import icon from "./ff-icon.png";
import axios from "axios";
import { Button, Input, List } from "antd";
const { Search } = Input;

function FindFriend() {
    const [resultUsers, setResultUsers] = useState();
    const getUsers = (values) => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/search?username=" + values,
          })
          .then((res) => setResultUsers(res.data));
    }
    
    return (
      <div className="FindFriend">
         <img style={{height: "20em"}} src={icon} />
         <Search style={{ width: "70%" }} placeholder="Input friend's username" onSearch={getUsers} enterButton />
         <List
            className="List"
            bordered
            dataSource={resultUsers}
            renderItem={item => (
            <List.Item className="ListItem">
                {item.username} <Button type="dashed">Send Friend Request</Button>
            </List.Item>
            )}
         />
      </div>
    );
  }
  
export default FindFriend;
