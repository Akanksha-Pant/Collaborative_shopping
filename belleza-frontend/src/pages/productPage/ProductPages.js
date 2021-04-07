import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Modal  from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import getCurrentUser from "./../../services/currentUser";

Modal.setAppElement('body');
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


  const onToggleMb_button = () =>{
    set_mb_ModalState(!mb_modalShow)
  }

  const notifyOnAddingToCart = (prompt) => toast(prompt, {hideProgressBar: true});

    return (
      <body>
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
            <button id = "MoodBoardButton" onClick = {() => onToggleMb_button}  >ADD TO MOOD BOARD</button>
            <button id = "CartButton" onClick = {() => notifyOnAddingToCart} >ADD TO CART</button> 
            <Link    to ={{
              pathname: `/suggest/${params.id}`,}}>
                <div id = "SuggestButton"   >SUGGEST TO A FRIEND</div></Link>
          </div>
          </div>
      </div>

      <Modal className = "PopUp" isOpen = {mb_modalShow} >
        <div>
        <button onClick = {onToggleMb_button}>Close</button>
        <button> ADD TO WISHLIST</button>
        <button> ADD TO BUYING BOARD</button>
        <button> ADD TO BOUGHT BOARD</button>
        </div>
      </Modal>
      </body>
    );
  }
  
export default ProductPage;


