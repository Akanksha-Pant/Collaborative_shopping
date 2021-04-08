import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
//import Modal  from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import getCurrentUser from "./../../services/currentUser";
import { Modal, List, Button, Space } from 'antd';

//Modal.setAppElement('body');
toast.configure({hideProgressBar: true})


function ProductPage() {

  const params = useParams();


  const [products, setProduct] = useState("none");
  const [detailProduct, setDetail] = useState([])
  const [mb_modalShow, set_mb_ModalState] = useState(false);
  const [currUser, setCurrUser] = useState("none");
  

  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/products");
    const userInfo = await getCurrentUser();
    setCurrUser(userInfo);
    setProduct(res.data)
    if(params){
     for(var i = 0; i < products.length; i++){
       if(products[i]._id == params.id)setDetail(products[i])
     }
    }
  }, [params, products]);


  const showModal = () =>{
    set_mb_ModalState(true)
  }

  const hideModal = () =>{
    set_mb_ModalState(false)
  }

  const notifyOnAddingToCart = (prompt) => toast(prompt, {hideProgressBar: true});

    return (
        <>
         <div className = "Card">
        <div className = "ProductImage">
        <img src = {`${detailProduct.image}`}/>
        </div>
        <div> 
        <div className = "ProductName"> <h2>{detailProduct.name}</h2></div>
          <div className = "ProductDescription"><h2>{detailProduct.description}</h2></div>
          <div className = "ProductPrice"><h2>MRP  {detailProduct.price}</h2></div>
          <div className = "PriceDetail">Inclusive of all the taxes</div>
        
          <div className = "Buttons">
            <button id = "MoodBoardButton" onClick = {() => showModal()}  >ADD TO MOOD BOARD</button>
            <button id = "CartButton" onClick = {() => notifyOnAddingToCart("added to cart")} >ADD TO CART</button> 
            <Link    to ={{
              pathname: `/suggest/${params.id}`,}}>
                <div id = "SuggestButton"   >SUGGEST TO A FRIEND</div></Link>
          </div>
          </div>
      </div>
      <MoodBoardModal isVisible = {mb_modalShow} onHide = {hideModal} userId = {currUser._id} product = {detailProduct}></MoodBoardModal>
      </>
    );
  }

  function MoodBoardModal(props){


    const addToWishList = async() =>{
      const res = await axios.post("http://localhost:5000/wishlist/add",{
        userId: props.userId,
        product: props.product
      },{withCredentials: true});
      console.log(res)
    }

    const addToBuyBoard = async() =>{
      const res = await axios.post("http://localhost:5000/buylist/add",{
        productId:props.product._id,
        userId: props.userId,
        product: props.product
      },{withCredentials: true});
      console.log(res)
    }

    return(<Modal visible = {props.isVisible} onCancel = {() => props.onHide()} onHide = {() => props.onHide()}>
      <List bordered>
        <List.Item style={{display:"grid", gridTemplateColumns:"3fr 1fr"}} >Add to Wishlist <Button onClick = {() => addToWishList()}>Add</Button></List.Item>
        <List.Item style={{display:"grid", gridTemplateColumns:"3fr 1fr"}}>Add to Buy Board<Button onClick = {() =>addToBuyBoard() }>Add</Button></List.Item>
        </List>      
      <div></div>
    </Modal>);
  }
  
export default ProductPage;


