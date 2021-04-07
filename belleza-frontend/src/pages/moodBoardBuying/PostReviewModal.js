import {Modal, Form, Input, Button, Rate} from 'antd'
import {useState, useEffect} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import axios from 'axios'
import getCurrentUser from '../../services/currentUser';

function PostReviewModal(props){

    const [stars, setStars] = useState(0);


    const onSubmit = async(values) =>{
        const user = await getCurrentUser();
        console.log(props);
        const res = await axios.post("http://localhost:5000/buylist/add/review", {
            friendId: user._id,
            friendName: user.username,
            text: values.review,
            userId: props.userId,
            productId: props.productId,
            rating: stars
        }, {withCredentials: true})
        console.log(res)
    }
    return<Modal visible = {props.isVisible} onCancel = {() => props.onHide()}>
        <Form onFinish = {onSubmit}>
            <Form.Item  name="review">
            <Input placeholder="Review" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item>
                <Rate onChange={(nums) => {
                  setStars(nums);
                  console.log(nums);
                }}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType = "submit">POST</Button>
            </Form.Item>
        </Form>
    </Modal>
}

export default PostReviewModal;
