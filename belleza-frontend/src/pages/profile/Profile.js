import { useState, useEffect } from "react";
import getCurrentUser from "./../../services/currentUser";
import ProfileComponent from "./../../components/profile/Profile";

function Profile() {
    const [user, setUser] = useState("none");
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
      getUserData();
    }, [])
    function getUserData() {
      getCurrentUser().then((currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
        setisLoading(false);
      });
  }
  if (isLoading === true) {
    return <h1>Loading</h1>
  }
    return (
      <div>
       <ProfileComponent isSelfProfile={true} user={user} />
      </div>
    );
  }

export default Profile;
