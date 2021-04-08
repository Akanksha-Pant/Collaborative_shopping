import {useState, useEffect} from 'react';
import {Modal, List} from 'antd';


function ViewReviewsModal(props){
    const [reviewList, setReviewList] = useState([])

    useEffect(() => { 
        setReviewList(props.reviewList);
       }, [reviewList]);
       console.log(reviewList.length);
    const reviewCard = (data) =>{
        return <div>{data.text}</div>
    }
   
   
       
       return <div> {reviewList.map(reviewCard)}</div>;
       <Modal visible = {props.visible} onCancel = {() => props.onHide()}>
           <div>Hellooo from Modal</div>
           
       </Modal>  
   
}


export default ViewReviewsModal;