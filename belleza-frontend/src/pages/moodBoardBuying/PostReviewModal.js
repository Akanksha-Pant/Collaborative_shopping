import {Modal, Form, Input, Button} from 'antd'
import {useState} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"
import axios from 'axios'
import getCurrentUser from '../../services/currentUser';

function PostReviewModal(props){
    const onSubmit = async(values) =>{
        const user = await getCurrentUser();
        const res = await axios.post("http://localhost:5000/buylist/add/review", {
            friendId: user._id,
            friendName: user.username,
            text: values.review,
            userId: props.userId,
            productId: props.productId,
            rating: 5
        }, {withCredentials: true})
        console.log(res)
    }
    return<Modal visible = {props.isVisible} onCancel = {() => props.onHide()}>
        <Form onFinish = {onSubmit}>
            <Form.Item  name="review">
            <Input placeholder="Review" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item>
                <Button htmlType = "submit">POST</Button>
            </Form.Item>
        </Form>
    </Modal>
}

export default PostReviewModal;