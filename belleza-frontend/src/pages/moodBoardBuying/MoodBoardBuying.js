import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import getCurrentUser from "./../../services/currentUser";
import "./moodBoardBuying.css"
import {Card, Button, Modal} from 'antd'
import axios from 'axios'

function CardIfViewer(data){
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
        <div><Button> Review</Button></div>
        </Card>
    </Link>
    <Modal visible = {false} > Hello from modal</Modal>
    </div>
}




function CardIfAccountHolder(data){
    
    const deleteData =async () => {
        const res = await axios.get(`http://localhost:5000/buylist/delete/${data._id}`, {withCredentials : true});
        console.log(res);
    }    
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
    <div><Button onClick = {() => deleteData()}> DELETE</Button><Button>BUY</Button></div>
    <div><Button>Review</Button></div>

    </div>
}



function BuyList(){
    const params = useParams();
    const[buyList, setBuyList] = useState([]);
    const [isSelfProfile, setIsSelfProfile] = useState(false);

    const checkIsSelfProfile = async() => {
        const user = await getCurrentUser();
        if(user._id == params.id){setIsSelfProfile(true)}
    }

    const getBuyListdata = async() =>{
        const res = await axios.get(`http://localhost:5000/buylist/${params.id}`, {withCredentials: true});
        console.log(res.data);
        setBuyList(res.data)
    }
    useEffect(async () => { 
        getBuyListdata(params.id);
        checkIsSelfProfile();
       }, [params]);
    if(isSelfProfile){
        return buyList.map(CardIfAccountHolder);
    }
    else{
        return buyList.map(CardIfViewer);
    }
}
export default BuyList;