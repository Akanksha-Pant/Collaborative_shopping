import { useState, useEffect } from "react";
import { BellOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Dropdown, List, Menu, notification, Space } from "antd";
import axios from "axios"

function Notification() {
    const [notifs, setNotifs] = useState([])
    useEffect(async () => {
        getNotifications()
    }, [])
    
    async function pushNotifications() {
        await axios({
            method: "POST",
            withCredentials: true,
            data:{ productName:"Antheia" },
            url: "http://localhost:5000/notification/add"
        }).then(() => console.log("done"))
    }
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
