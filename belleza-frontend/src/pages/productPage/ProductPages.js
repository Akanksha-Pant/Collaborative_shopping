import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import Modal  from 'react-modal';


Modal.setAppElement('body');

function ProductPage() {

  const params = useParams();
  const [products, setProduct] = useState("none");
  const [detailProduct, setDetail] = useState([])

  const [modalShow, setModalState] = useState(false);


  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProduct(res.data)
    if(params){
     for(var i = 0; i < products.length; i++){
       if(products[i]._id == params.id)setDetail(products[i])
     }
    }
  }, [params, products]);

  
  
  const toggle = () => {
    setModalState(!modalShow)
  }

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
            <button id = "MoodBoardButton"  >ADD TO MOOD BOARD</button>
            <button id = "CartButton">ADD TO CART</button> 
            <button id = "SuggestButton"  onClick={toggle}  >SUGGEST TO A FRIEND</button>
          </div>
          </div>
      </div>
      <Modal isOpen = {modalShow} >
        Hello from Modal
        <button onClick = {toggle}>Finish</button>
      </Modal>
      </body>
    );
  }
  

export default ProductPage;