import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./suggestionBox.css"

function SuggestionBox(){
    const [suggestions, setSuggestions] = useState([]); 
    const getSuggestions = async() => {
        const res = await axios.get("http://localhost:5000/suggestion");
        console.log(res);
    }
    const deleteSuggestions = async () =>{
        const res = await axios.get();
    }
    useEffect(() => {
        getSuggestions();
        return () => {};
      }, []);

    const suggestionBoardCard = () => {
        return <div className = "suggestion_box_card">
        <div className = "suggested_by">Friend Name!</div>
        <div className = "suggestion_box_name">Name</div>
        <div className = "suggestion_box_description">description</div>
        <div className = "button_bar">
            <button className = "suggest_delete_btn">DELETE</button>
            <button className = "suggest_view_btn">VIEW</button>
        </div>

        </div>
    }
    return <div className = "suggestion_box_page">{}</div>
}
export default SuggestionBox;