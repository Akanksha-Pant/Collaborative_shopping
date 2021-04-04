import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Modal  from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

Modal.setAppElement('body');
toast.configure({hideProgressBar: true})


function ProductPage() {

  const params = useParams();


  const [products, setProduct] = useState("none");
  const [detailProduct, setDetail] = useState([])
  const [modalShow, setModalState] = useState(false);
  const [mb_modalShow, set_mb_ModalState] = useState(false);


  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProduct(res.data)
    if(params){
     for(var i = 0; i < products.length; i++){
       if(products[i]._id == params.id)setDetail(products[i])
     }
    }
  }, [params, products]);


  const popUpFriendsCards = (props) => {
      return(
        <button onClick = {toggle} className = "popUpFriendsCards"> {props} </button>
      )
  }
  

  const toggle = () => {
    setModalState(!modalShow)
  }

  const onToggleMb_button = (isCloseButton) =>{
    if(mb_modalShow == true){
      notify("Item has been successfully added to your moodboard");
    }
    set_mb_ModalState(!mb_modalShow)
  }

  const notify = (prompt) => toast(prompt, {hideProgressBar: true});
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
            <button id = "MoodBoardButton" onClick = {onToggleMb_button}  >ADD TO MOOD BOARD</button>
            <button id = "CartButton" >ADD TO CART</button> 
            <button id = "SuggestButton"  onClick={toggle}  >SUGGEST TO A FRIEND</button>
          </div>
          </div>
      </div>




      <Modal className = "suggestPopUp" isOpen = {modalShow} >
        <div className = "suggestPopHeader"> Suggest your friend
        <div className = "spacingBlock"></div>
        <button onClick = {toggle }>Close</button>
        </div>
        <div className = "suggestPopBody">
        <img src = {`${detailProduct.image}`}   className = "SuggestPopUpImage"/>
        <div className = "CardList"> 
         </div>
        </div>
      </Modal>


      <Modal className = "suggestPopUp" isOpen = {mb_modalShow} >
        <div className = "suggestPopHeader"> Add to your MoodBoard!
        <div className = "spacingBlock"></div>
        <button onClick = {onToggleMb_button}>Close</button>
        </div>
        <div className = "suggestPopBody">
        <img src = {`${detailProduct.image}`}   className = "SuggestPopUpImage"/>
        <div className = "CardList"> 
         </div>
        </div>
      </Modal>
      </body>
    );
  }
  
export default ProductPage;


