import { useState, useEffect } from "react";
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Dropdown, List, Menu, notification, Space } from "antd";
import getCurrentUser from "./../../services/currentUser";
import axios from "axios"

function Notification() {
    const [notifs, setNotifs] = useState([])

    // const [ currentUser, setCurrentUser ] = useState();

    // getCurrentUser().then((data) =>{
    //     if(!data) setCurrentUser("none");
    // });
   
    // return ""
    useEffect(async () => {
        getNotifications()
    }, [])
    // if (currentUser == "none") {
    //     return ""
    // } 
    async function deleteNotification(id) {
        await axios({
            method: "GET",
            withCredentials: true,
            // data: {id: id},
            url: "http://localhost:5000/notification/delete/" + id
        }).catch((err) => console.log("you messed uppp"))
    }
    async function getNotifications() {
        await axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/notification"
        }).then((res) => {
            console.log(res.data)
            setNotifs(res.data)
        }).catch((err) => console.log("you messed uppp"))
    }
    return (
        <Dropdown overlay={
            <Menu>
                {notifs.map((data) => {
                    return (
                    <List.Item 
                        className="req-list-item"
                        actions={[<Button onClick={()  => deleteNotification(data._id)} key="list-loadmore-edit" icon={<CloseOutlined />} />]}>
                        <h3>{data.friendName} is going to buy {data.productName}!</h3>
                        {/* <Button onClick={() => deleteNotification(data._id)} icon={<CloseOutlined />} /> */}
                    </List.Item>)
                })}
            </Menu>
          }>
            <Button onClick={getNotifications} icon={<BellOutlined />} />
        </Dropdown>
    )
}

export default Notification;
