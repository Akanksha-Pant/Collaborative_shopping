import React from 'react';
import {Modal} from 'antd';

function ViewReviewsModal(props){
    return<Modal visible = {props.visible} onHide = {props.onHide()}></Modal>
}

export default ViewReviewsModal;