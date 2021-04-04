import './productPage.css';
import {useParams, Link} from 'react-router-dom';
import React , {useContext, useEffect, useState } from 'react';
import axios from "axios";
import Modal  from 'react-modal';


Modal.setAppElement('body');


function onSuggestPopUp(friends, print){
return <div>
    <button onClick = {print}> Button</button>
    {friends}
</div>
}

export default onSuggestPopUp;
