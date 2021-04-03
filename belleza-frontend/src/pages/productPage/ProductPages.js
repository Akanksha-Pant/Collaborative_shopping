import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function ProductPage() {

  const params = useParams();
  const [products, setProduct] = useState("none");
  const [detailProduct, setDetail] = useState([])
  


  useEffect(async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProduct(res.data)
    if(params){
     for(var i = 0; i < products.length; i++){
       if(products[i]._id == params.id)setDetail(products[i])
     }
    }
  }, [params, products]);



    return (
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
            <button id = "MoodBoardButton">ADD TO MOOD BOARD</button>
            <button id = "CartButton">ADD TO CART</button> 
            <button id = "SuggestButton">SUGGEST TO A FRIEND</button>
          </div>
          </div>
      </div>
    );
  }
  
export default ProductPage;