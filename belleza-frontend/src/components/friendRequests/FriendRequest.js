import { useState } from "react";
import axios from "axios";
import getCurrentUser from "./../../services/currentUser";
import { Button, Input, List, Dropdown, Menu, Space } from "antd";
import { DeleteOutlined, CheckCircleTwoTone, TeamOutlined } from '@ant-design/icons';
import "./FriendRequest.css";

function FriendRequest() {
    const [myFriendReq, setMyFriendReq] = useState([]);

    const allFriendReq = async () => {
        let currentUser = await getCurrentUser();
        console.log(currentUser)
        if (!currentUser) setMyFriendReq([]); 
        setMyFriendReq(currentUser.requests);
    }
    const acceptRequest = async (fromUser) => {
        let toUser = await getCurrentUser();
        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/accept/${toUser.username}/${toUser._id}/${fromUser.username}/${fromUser._id}`,
          })
    }
    const deleteRequest = async (fromUser) => {
        let toUser = await getCurrentUser();
        axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/delete/${toUser._id}/${fromUser._id}`,
          })
    }
    return (
        <Dropdown overlay={
            <Menu>
            {myFriendReq.map((req) =>
              <div className="req-list-item" key={req.username}>
                {req.username} 
                <Space className="">
                  <Button onClick={() => acceptRequest(req)} shape="circle" icon={<DeleteOutlined />} />
                  <Button onClick={() => deleteRequest(req)} shape="circle" icon={<CheckCircleTwoTone twoToneColor="#52c41a" /> } />
                </Space>  
              </div>
            )}
            </Menu>
          }>
            <Button onClick={allFriendReq} icon={<TeamOutlined />} />
          </Dropdown>
    )
}

export default FriendRequest;
