import { Card , Button} from 'antd';
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import "./MoodBoardWishlist.css"
import getCurrentUser from "./../../services/currentUser";



function CardIfViewer(data){
    return <Link to = {{ pathname: `/details/${data.product._id}` }}>
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
}

function CardIfAccountHolder(data){
    const deleteItem =async () => {
        const res = await axios.get(`http://localhost:5000/wishlist/delete/${data._id}`, 
        {withCredentials: true})
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
    <div><Button onClick = {() =>deleteItem()}> DELETE</Button><Button>BUYBOARD</Button></div>
    </div>
}

function WishList(){

    const params = useParams();
    const [isSelfProfile, setIsSelfProfile] = useState(false);
    const[wishListProduct, setwishListProduct] = useState([])

    const checkIsSelfProfile = async() => {
        const user = await getCurrentUser();
        if(user._id == params.id){setIsSelfProfile(true)}
    }

    const getWishListData = async (userID) => {
        const res =await axios.get(`http://localhost:5000/wishlist/${userID}`)
        setwishListProduct(res.data)
    }

    useEffect(async () => { 
       checkIsSelfProfile();
       getWishListData(params.id);
      }, [params, isSelfProfile]);
    if(isSelfProfile){
        return (<div className = "wishList">{wishListProduct.map(CardIfAccountHolder)}</div>);
    }  
   else{
       return   (<div className = "wishList">{wishListProduct.map(CardIfViewer)}</div>)
   }
}





export default WishList;