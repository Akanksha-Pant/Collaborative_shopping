import { useState } from "react";
import { List, Input, Card, Avatar, Button, Modal, Row, Col } from 'antd';
import "./profile.css"
import BuyingIcon from "./buying.svg";
import { Link } from "react-router-dom";
import BroughtIcon from "./brought.svg";
import WishlistIcon from "./wishlist.svg";
import ProfileIcon from "./profile.jpeg";
import axios from "axios";

const { Search } = Input;

function MoodboardCard({name, imageURL}) {
    return (
            <Card
            // className="border-thick"
                style={{ width: 300 }}
                cover={
                  <img
                    className="boards-icon"
                    alt="brought-list"
                    src={imageURL}
                  />
                }
            >
                <h3 style={{fontWeight: 600}}>{name.toUpperCase()}</h3>
                {/* {name} */}
            </Card>
    )
}

function SuggestionBoard({isSelf}) {
    if (isSelf == true) {
        return <Link to="/suggestionBox"><Card className="suggestion-card border-thick">FRIEND'S SUGGESTIONS</Card></Link>
    }
    return "";
}

function FriendComponent(user) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const logoutUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/logout"
          }).then((res) =>  window.location.href = "/login")
          .catch((err) => console.log(err));
    }

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
            {/* <Button className="button-purple" onClick={showModal}><img style={{height:"inherit"}} src={ProfileIcon} /></Button> */}
            <Button className="button-purple" onClick={showModal}>Friends: {user.user.friends.length}</Button>
            <Button className="button-purple" onClick={logoutUser}>Logout</Button>
            {/* {console.log(user.user.friends)} */}
            <Modal
             title={<Search style={{ width: "90%" }} placeholder="Search for friends"  enterButton />}
             visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    bordered
                    dataSource={user.user.friends}
                    renderItem={friend => (
                    <List.Item style={{display: "grid", gridTemplateColumns:"3fr 1fr"}}>
                        {friend.name}<Button onClick={() => redirectToFriend(friend._id)}>View profile</Button>
                    </List.Item>)}
                />
            </Modal>
        </div>
    )
}
function Profile({isSelfProfile = false, user}) {
    console.log(user)
    if (user === "none") return "This user does not exist"
    return (
        <div>
            <div className="background-purple">
                <Avatar className="userAvatar" icon={<div style={{fontSize: "400%", marginTop: "30px"}}>{user.username[0]}</div>}></Avatar>
                <h2 className="text-style">{user.username}</h2>
                <FriendComponent user={user} />
            </div>

            <Row className="moodboard-container">
                <Link style={{marginRight: "25px"}} to = {{pathname: `/boughtList/${user._id}`}} ><Col span={8}><MoodboardCard name="Brought" imageURL={BroughtIcon} /></Col></Link>
                <Link style={{marginRight: "25px"}} to = {{pathname: `/buyList/${user._id}`}}><Col span={8}><MoodboardCard name="Buying" imageURL={BuyingIcon} /></Col></Link>
                <Link style={{marginRight: "25px"}} to ={{ pathname: `/wishList/${user._id}`,}}><Col span={8}><MoodboardCard name="Wishlist" imageURL={WishlistIcon} /></Col></Link>
            </Row>
            <div className="">
                <SuggestionBoard isSelf={isSelfProfile} />
            </div>
        </div>
    )
}

export default Profile;
