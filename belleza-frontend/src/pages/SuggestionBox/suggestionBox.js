import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./suggestionBox.css"

function SuggestionBox(){
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = async() => {
        const res = await axios.get("http://localhost:5000/suggestion",{withCredentials: true});
        console.log(res.data);
        setSuggestions(res.data);
    }
    const deleteSuggestions = async (id) =>{
          axios.get(`http://localhost:5000/suggestion/delete/${id}`,{withCredentials: true});
          let res = await axios.get("http://localhost:5000/suggestion",{withCredentials: true});
          console.log(res.data);
          setSuggestions(res.data);

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
                    <Link to = {{pathname: `details/${suggestion.product._id}`}}> <button className = "suggest_view_btn">VIEW</button></Link>
                </div>
            </div>
    }
    return <div>
        <div style={{marginBottom: "20px"}}  className="background-purple">
                <h2 className="text-style">Suggestions</h2>
            </div>
            <div style={{padding: "0 200px 0 200px"}}  className = "suggestion_box_page">{suggestions.map(suggestionBoardCard)}</div>
        </div>
}
export default SuggestionBox;
