import { useState, useEffect } from "react";
import getCurrentUser from "./../../services/currentUser";
import ProfileComponent from "./../../components/profile/Profile";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState("none");
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
      getUserData();
    }, [])
    async function getUserData() {
      axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/user/${id}`,
      }).then((res) => {
        setUser(res.data[0]);
        setisLoading(false);
      })
    }
    
    if (isLoading === true) {
        return <h1>Loading</h1>
      }
    return (
      <div>
        <ProfileComponent isSelfProfile={false} user={user} />
      </div>
    );
  }
export default Profile;
