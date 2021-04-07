import {Modal, Form, Input, Button} from 'antd'
import {useState} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons"

function PostReviewModal(props){
    const onSubmit = () =>{
        console.log("Success")
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