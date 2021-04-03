import axios from "axios";

async function getCurrentUser() {
    const response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/profile"
      })
    return response.data;
}

export default getCurrentUser;
