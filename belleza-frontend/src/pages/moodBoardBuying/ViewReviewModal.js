import {useState, useEffect} from 'react';
import {Modal, List, Rate} from 'antd';


function ViewReviewsModal(props){
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        setReviewList(props.reviewList);
       }, [reviewList]);
       console.log(reviewList);
    const reviewCard = (data) =>{
        return (<div><div>{data.friendName}</div>
                <div>{data.text}</div>
         </div>
            )
    }

       return<Modal visible = {props.visible} onCancel = {() => props.onHide()}>
           <div>Reviews</div>
           <div> {reviewList.map(reviewCard)}</div>
       </Modal>

}


export default ViewReviewsModal;
