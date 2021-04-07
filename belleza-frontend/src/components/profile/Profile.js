import { useState } from "react";
import { List, Input, Card, Avatar, Button, Modal } from 'antd';
import "./profile.css"
import { Link } from "react-router-dom";
const { Search } = Input;

function MoodboardCard({name, imageURL}) {
    return (
            <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="brought-list"
                    src={imageURL}
                  />
                }
            >{name}</Card>
    )
}

function SuggestionBoard(isSelf) {
    if (isSelf === true) {
        return <Card>Suggestion From Friends</Card>
    }
    return "";
}

function FriendComponent(user) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const redirectToFriend = (id) => {
        window.location.href = "/profile/" + id;
    }

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div>
            <Button onClick={showModal}>Friends: {user.user.friends.length}</Button>
            {console.log(user.user.friends)}
            <Modal 
             title={<Search style={{ width: "90%" }} placeholder="Search for friends"  enterButton />}
             visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    bordered
                    dataSource={user.user.friends}
                    renderItem={friend => (
                    <List.Item>
                        {friend.name}<Button onClick={() => redirectToFriend(friend._id)}>View profile</Button>
                    </List.Item>)}
                />
            </Modal>
        </div>
    )
}
function Profile({isSelfProfile, user}) {
    console.log(user)
    if (user === "none") return "This user does not exist"
    return (
        <div>
            <Avatar className="userAvatar">{user.username[0]}</Avatar>
            <h2>{user.username}</h2>
            
            <FriendComponent user={user} />
            <div className="moodboard-container">
                <Link to ={{
              pathname: `/wishList/${user._id}`,}}><MoodboardCard name="Wishlist" imageURL="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /></Link>
                <Link to = {{pathname: `/buyList/${user._id}`}}><MoodboardCard name="Buying" imageURL="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /></Link>
                <Link to = {{pathname: `/boughtList/${user._id}`}} ><MoodboardCard name="Bought" imageURL="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /></Link>
            </div>
            <SuggestionBoard isSelf={isSelfProfile} />
        </div>
    )
}

export default Profile;
