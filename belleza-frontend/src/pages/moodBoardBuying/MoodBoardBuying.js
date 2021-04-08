import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import getCurrentUser from "./../../services/currentUser";
import "./moodBoardBuying.css"
import {Card, Button, Modal} from 'antd'
import PostReviewModal from './PostReviewModal'
import ViewReviewsModal from './ViewReviewModal'
import axios from 'axios'


function BuyList(){


    const params = useParams();
    const[buyList, setBuyList] = useState([]);
    const [isSelfProfile, setIsSelfProfile] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewReviewVisible, setIsReviewVisible] = useState(false);

    const checkIsSelfProfile = async() => {
        const user = await getCurrentUser();
        if(user._id == params.id){setIsSelfProfile(true)}
    }


    const getBuyListdata = async() =>{
        const res = await axios.get(`http://localhost:5000/buylist/${params.id}`, {withCredentials: true});
        console.log(res.data);
        setBuyList(res.data)
    }


    const deleteData =async (id) => {
        axios.get(`http://localhost:5000/buylist/delete/${id}`, {withCredentials : true});
        const res = await axios.get(`http://localhost:5000/buylist/${params.id}`, {withCredentials: true});
        console.log(res.data);
        setBuyList(res.data)

    }


    const isopen = () => {
        setIsModalVisible(true)
    }

    const isClose = () => {
        setIsModalVisible(false)
    }

    const viewReviewModal = () =>{
        setIsReviewVisible(true);
    }
    const hideReviewModal = () =>{
        setIsReviewVisible(false);
    }

       const CardIfAccountHolder = (data) =>{
        return <div className = "card_if_accountHolder"><Link to = {{ pathname: `/details/${data.product._id}` }}>
                <Card
                style={{ width: 250 }}
                cover={
                  <img
                    src={data.product.image}
                  />
                }
            ><div>{data.product.name}</div>
            <div>{data.product.description}</div>
            </Card>
        </Link>
        <div><Button className = "buyList_delete" onClick = {() => deleteData(data._id)}> DELETE</Button>
                <Button className = "buyList_buy">BUY</Button></div>
        <div><Button block ={true} onClick = {() =>viewReviewModal()}>Review</Button></div>
         <ViewReviewsModal visible = {isViewReviewVisible} onHide = {hideReviewModal} reviewList ={data.review}/>
        </div>
    }



    const CardIfViewer = (data) => {
        return <div>
            <Link to = {{ pathname: `/details/${data.product._id}` }}>
        <Card
                style={{ width: 250 }}
                cover={
                  <img
                    src={data.product.image}
                  />
                }
            ><div>{data.product.name}</div>
            <div>{data.product.description}</div>
            </Card>
        </Link>
        <div><Button onClick = {() => isopen()} > Review</Button></div>
        <PostReviewModal isVisible = {isModalVisible} onHide = {isClose} productId = {data.product._id} userId = {params.id}  />
        </div>
    }

    useEffect(async () => {
        getBuyListdata(params.id);
        checkIsSelfProfile();
       }, [params]);

    if(isSelfProfile){
        return <div className = "buyList">{buyList.map(CardIfAccountHolder)}</div>;
    }
    else{
        return <div className = "buyList">{buyList.map(CardIfViewer)}</div>;
    }
}
export default BuyList;
