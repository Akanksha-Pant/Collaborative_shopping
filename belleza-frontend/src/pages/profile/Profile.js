import { useState, useEffect } from "react";
import getCurrentUser from "./../../services/currentUser";
import ProfileComponent from "./../../components/profile/Profile";

function Profile() {
    const [user, setUser] = useState("none");

    useEffect(() => {
      getUserData();
      return () => { }
    }, [])
    function getUserData() {
      getCurrentUser().then((currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
    });
  }
    return (
      <div>
        <ProfileComponent isSelfProfile={true} user={user} />
        {/* <button onClick={getUserData}>Check login info</button> */}
        {/* <br /> */}
        {/* Username: {username} */}
      </div>
    );
  }
export default Profile;
