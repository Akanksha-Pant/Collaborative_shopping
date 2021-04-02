import './productPage.css';
//import React , {Component } from 'react'
//import productTile from "./components/productTile/productTile";


function productPage(props) {
    return (
      <div className="ProductPage">
      <div className = "card">
        <div className = "ProductImage">
        <img src = "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2187783/2017/11/1/11509528078287-HERENOW-Women-Navy-Blue-Printed-Top-1011509528078132-1.jpg"/>
        </div>
        <div className = "AboutProduct">
          <div className = "ProductName"> <h2>{props.name}</h2></div>
          <div className = "ProductDescription"><h2>{props.description}</h2></div>
          <div className = "ProductPrice"><h2>MRP  {props.price}</h2></div>
          <div className = "PriceDetail">Inclusive of all the taxes</div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className = "sizedBox"></div>
          <div className = "Buttons">
            <button id = "MoodBoardButton">ADD TO MOOD BOARD</button>
            <button id = "CartButton">ADD TO CART</button> 
            <button id = "SuggestButton">SUGGEST TO A FRIEND</button>
          </div>
        </div>
         </div>
      </div>
    );
  }
  
export default productPage;
