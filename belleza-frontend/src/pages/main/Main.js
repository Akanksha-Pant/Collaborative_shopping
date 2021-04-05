import './main.css';
import axios from "axios";
import React , {Component, useContext, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
function Main() {


  const [products, setProduct] = useState("none");
  const getProducts = async () =>{
    const res = await axios.get("http://localhost:5000/products");
    setProduct(res.data)
    console.log(res.data)
  }


  const ProductCard = (card) =>{
    return (
      <div className = "ProductCard" >
        <img src = {card.image} height = "380px" width = "290px"/>
        <div className = "name" >{card.name} </div>
        <div className = "description" >{card.description} </div>
        <div className = "price" >Rs.{card.price}</div>
        <div className = "buy_button" ><Link id = "view"   to = {`details/${card._id}`} >VIEW</Link></div>
      </div>
      
    );
  }


  useEffect(() => {
    getProducts();
    return () => {};
  }, []);


  let items = [];
  for(var i = 0; i < products.length; i++){
    items.push(products[i]);
  }

  
  return <div className = "grid">{items.map(ProductCard)}</div>;
  }
  
export default Main;
