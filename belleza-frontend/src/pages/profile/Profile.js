import axios from "axios";
import { useState } from "react";

function Profile() {
    const [username, setUsername] = useState("none");

    function getUserData() {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/profile"
          }).then((res) => {
              console.log(res)
              setUsername(res.data.username);
          });
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
