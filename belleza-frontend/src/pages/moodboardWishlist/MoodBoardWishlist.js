import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import "./MoodBoardWishlist.css"
import getCurrentUser from "./../../services/currentUser";

function WishList(){

    const params = useParams();
    const [isSelfProfile, setIsSelfProfile] = useState(false);
    const [id, setId] = useState("none")

    const checkIsSelfProfile = async() => {
        const user = await getCurrentUser();
        if(user._id == params.id){setIsSelfProfile(true)}
    }

    const getWishListData = async (userID) => {
        const res =await axios.get("http://localhost:5000/wishlist", {user_id: userID},{withCredentials: true})
        console.log(res.data)
    }

    useEffect(async () => {
       setId(params.id)  
       checkIsSelfProfile();
       getWishListData(params.id);
      }, [params, isSelfProfile]);


    return (<div>Hello</div>)
}



export default WishList;