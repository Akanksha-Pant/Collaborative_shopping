import React from 'react';
import {Modal, List} from 'antd';


function ViewReviewsModal(props){
    const reviewCard = (data) =>{
        return <div>{data.text}</div>
    }
    console.log(props.reviewList);
    return<Modal visible = {props.visible} onCancel = {() => props.onHide()}>
        {props.reviewList.map(reviewCard)}
    </Modal>
}

export default ViewReviewsModal;