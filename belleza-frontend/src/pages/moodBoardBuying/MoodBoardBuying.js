import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import getCurrentUser from "./../../services/currentUser";
import "./moodBoardBuying.css"
import {Card, Button, Modal} from 'antd'
import PostReviewModal from './PostReviewModal'
import axios from 'axios'


function BuyList(){


    const params = useParams();
    const[buyList, setBuyList] = useState([]);
    const [isSelfProfile, setIsSelfProfile] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

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
        const res = await axios.get(`http://localhost:5000/buylist/delete/${id}`, {withCredentials : true});
        console.log(res);
    }
    
    
    const isopen = () => {
        setIsModalVisible(true)
    }
  
    const isClose = () => {
        setIsModalVisible(false)
    }

    useEffect(async () => { 
        getBuyListdata(params.id);
        checkIsSelfProfile();
       }, [params]);



       const CardIfAccountHolder = (data) =>{
        return <div><Link to = {{ pathname: `/details/${data.product._id}` }}>
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
        <div><Button onClick = {() => deleteData(data._id)}> DELETE</Button><Button>BUY</Button></div>
        <div><Button>Review</Button></div>
    
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
        <PostReviewModal isVisible = {isModalVisible} onHide = {isClose}  />
        </div>
    }    


    if(isSelfProfile){
        return buyList.map(CardIfAccountHolder);
    }
    else{
        return buyList.map(CardIfViewer);
    }
}
export default BuyList;