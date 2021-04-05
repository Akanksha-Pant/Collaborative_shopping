import { useState } from "react";
import getCurrentUser from "./../../services/currentUser";

function Profile() {
    const [username, setUsername] = useState("none");

    async function getUserData() {
      let currentUser = await getCurrentUser();
      setUsername(currentUser.username);
      console.log(currentUser);
    }
    return (
      <div>
        <button onClick={getUserData}>Check login info</button>
        <br />
        Username: {username}
      </div>
    );
  }
export default Profile;
