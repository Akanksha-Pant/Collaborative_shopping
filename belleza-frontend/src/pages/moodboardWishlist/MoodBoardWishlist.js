import { Card , Button} from 'antd';
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "./MoodBoardWishlist.css"
import getCurrentUser from "./../../services/currentUser";

toast.configure({hideProgressBar: true})

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



function WishList(){

    const params = useParams();
    const [isSelfProfile, setIsSelfProfile] = useState(false);
    const[wishListProduct, setwishListProduct] = useState([])

    function CardIfAccountHolder(data){

        const deleteItem =async () => {
            axios.get(`http://localhost:5000/wishlist/delete/${data._id}`,
            {withCredentials: true})

            let res = await axios.get(`http://localhost:5000/wishlist/${params.id}`,{withCredentials: true})
            console.log(res);
            setwishListProduct(res.data)
            console.log(wishListProduct);
        }

        const buyItem =async () => {
            const ifInBuylist = await axios.get(`http://localhost:5000/buylist/check/${params.id}/${data.product._id}`);
              //console.log(ifInBuylist);
            if(ifInBuylist.data){
                toast("This item is already in your buylist");
            }
            else{
              axios.get(`http://localhost:5000/wishlist/buy/${data._id}`,
              {withCredentials: true})
              let res = await axios.get(`http://localhost:5000/wishlist/${params.id}`,{withCredentials: true})
              console.log(res);
              setwishListProduct(res.data)
              console.log(wishListProduct);
            }

        }
        return <div className = "card_if_accountHolder"><Link to = {{ pathname: `/details/${data.product._id}` }}>
                <Card
                style={{ width: 240 }}
                cover={
                  <img
                    src={data.product.image}
                  />
                }
            ><div>{data.product.name}</div>
            <div>{data.product.description}</div>
            </Card>
        </Link>
        <div><Button className = "buyList_delete"onClick = {() =>deleteItem()}> DELETE</Button><Button className = "buyList_buyBoard" onClick = {() =>buyItem()}>BUYBOARD</Button></div>
        </div>
    }

    const checkIsSelfProfile = async() => {
        const user = await getCurrentUser();
        if(user._id == params.id){setIsSelfProfile(true)}
    }

    const getWishListData = async (userID) => {
        const res = await axios.get(`http://localhost:5000/wishlist/${userID}`)
        setwishListProduct(res.data)
        console.log(wishListProduct);
    }

    useEffect(async () => {
       checkIsSelfProfile();
       getWishListData(params.id);
      }, []);

    if(isSelfProfile){
        return (<div >
          <div style={{marginBottom: "20px"}} className="background-purple">
                <h2 className="text-style">Wishlist items</h2>
            </div>
            <div style={{padding: "0 200px 0 200px"}} className = "wishList">{wishListProduct.map(CardIfAccountHolder)}</div>
            </div>
          );
    }
   else{
       return   (<div>
        <div style={{marginBottom: "20px"}} className="background-purple">
              <h2 className="text-style">Wishlist items</h2>
          </div>
          <div style={{padding: "0 200px 0 200px"}} className = "wishList">{wishListProduct.map(CardIfViewer)}</div>
         </div>
         )
   }
}





export default WishList;
