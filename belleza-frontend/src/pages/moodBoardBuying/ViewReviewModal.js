import {useState, useEffect} from 'react';
import {Modal, List} from 'antd';


function ViewReviewsModal(props){
    const [reviewList, setReviewList] = useState([])

    useEffect(() => { 
        setReviewList(props.reviewList);
       }, [reviewList]);
       console.log(reviewList);
    const reviewCard = (data) =>{
        return <div>{data.friendName}{data.text}</div>
    }
   
   
       
       return<Modal visible = {props.visible} onCancel = {() => props.onHide()}>
           <div> {props.reviewList.map(reviewCard)}</div>
       </Modal>  
   
}


export default ViewReviewsModal;
