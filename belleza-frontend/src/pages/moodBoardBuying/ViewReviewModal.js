import {useState, useEffect} from 'react';
import {Modal, List, Rate} from 'antd';
import './moodBoardBuying.css'

function ViewReviewsModal(props){
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        setReviewList(props.reviewList);
       }, [reviewList]);
       console.log(reviewList);
       console.log(props.rating)
    const reviewCard = (data) =>{
        return (<div className = "reviewCard"><div className = "reviewname">{data.friendName}</div>
                <div>{data.text}</div>
         </div>
            )
    }

       return<Modal visible = {props.visible} onCancel = {() => props.onHide()} onOk = {() => props.onHide()}>
           <div className = "reviewheader">Average ratings from your friend!</div>
           <Rate disabled defaultValue = {props.rating}/>
           <div className = "reviewheader">Reviews</div>
           <div> {reviewList.map(reviewCard)}</div>
       </Modal>

}


export default ViewReviewsModal;
