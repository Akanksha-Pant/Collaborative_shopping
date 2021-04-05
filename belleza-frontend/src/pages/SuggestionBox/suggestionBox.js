import React from 'react';
import "./suggestionBox.css"

function SuggestionBox(){
    const suggestionBoardCard = () => {
        return <div className = "suggestion_box_card">
        <div className = "suggested_by">Friend Name!</div>
        <img  className =  "suggestion_box_image" src = "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/image/style/properties/934347/Harpa-Women-Tops_1_8e2fd87b7586c8721eb0fd9b490d15a5.jpg"/>
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