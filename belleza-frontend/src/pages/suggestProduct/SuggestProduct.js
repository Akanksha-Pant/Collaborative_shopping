import axios from "axios";
import './suggestProduct.css'
import {useParams, Link} from 'react-router-dom';
import getCurrentUser from "./../../services/currentUser";
import React , {useContext, useEffect, useState } from 'react';



function SuggestProduct() {
 
 const params = useParams();   

 const [friendList, setFriendList] = useState([]);
 const [currUser, setCurrUser] = useState("none");
 const [products, setProduct] = useState("none");
 const [detailProduct, setDetail] = useState([])



 const postSuggestionRequest =  (friend) => {
    const res = axios.post("http://localhost:5000/addSuggestion",{
      userId: currUser._id,
      friendId: friend._id,
      friendName: friend.name,
      product: detailProduct,
    });
    console.log(res);
  }


  const popUpFriendsCards = (friend) => {
      return(
        <button  onClick = {() => postSuggestionRequest(friend)} className = "friend_list_cards"> {friend.name} </button>
      )
  }

  const notify = (Str) => {
      console.log(Str);
  }

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/products");
    const userInfo = await getCurrentUser();
    setCurrUser(userInfo);
    setFriendList(userInfo.friends);
    setProduct(res.data)
    if(params){
     for(var i = 0; i < products.length; i++){
       if(products[i]._id == params.id)setDetail(products[i])
     }
    }
  }, [params, products]);
 

return<div className = "suggest_product_page">
    <div className = "product_info"  >
        <div className = "product_name">{detailProduct.name}</div>
        <div className = "product_description">{detailProduct.description}</div>
        <div className = "product_price">{detailProduct.price}</div>
        <div className = "product_image"><img src = {detailProduct.image } width = "250"/></div>
    </div>
    <div className = "friend_list">
        {friendList.map(popUpFriendsCards)}
    </div>
</div>
}

export default SuggestProduct;