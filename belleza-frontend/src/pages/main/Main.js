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
      <div className = "ProductCard" key = {card.description}>
        <img src = {card.image} height = "380px" width = "290px"/>
        <div className = "name" key = {card.name}>{card.name} </div>
        <div className = "description" key = {`des${card.name}`}>{card.description} </div>
        <div className = "price" key = {`price${card.name}`}>Rs.{card.price}</div>
        <div className = "buy_button" key = {`button${card.name}`}><Link id = "view" key = {`btn${card.name}`} to = {`details/${card._id}`} >VIEW</Link></div>
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
