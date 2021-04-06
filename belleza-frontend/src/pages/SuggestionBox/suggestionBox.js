import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./suggestionBox.css"

function SuggestionBox(){
    const [suggestions, setSuggestions] = useState([]); 
    const getSuggestions = async() => {
        const res = await axios.get("http://localhost:5000/suggestion",{withCredentials: true});
        setSuggestions(res.data);
    }
    const deleteSuggestions = async (id) =>{
        const res = await axios.get(`http://localhost:5000/suggestion/delete/${id}`,{withCredentials: true});
    }
    useEffect(() => {
        getSuggestions();
        return () => {};
      }, []);

    const suggestionBoardCard = (suggestion) => {
        return <div className = "suggestion_box_card">
        <div className = "suggested_by">{`${suggestion.friendName} suggested this!`}</div>
        <img className = "suggestion_box_image" src = {suggestion.product.image}/>
        <div className = "suggestion_box_name">{suggestion.product.name}</div>
        <div className = "suggestion_box_description">{suggestion.product.description}</div>
        <div className = "button_bar">
            <button className = "suggest_delete_btn" onClick = {() => deleteSuggestions(suggestion._id)}>DELETE</button>
            <button className = "suggest_view_btn"><Link to = {{pathname: `details/${suggestion.product._id}`}}>VIEW</Link></button>
        </div>

        </div>
    }
    return <div className = "suggestion_box_page">{suggestions.map(suggestionBoardCard)}</div>
}
export default SuggestionBox;