import axios from "axios";

async function getCurrentUser() {
    const response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/profile"
      })
    if (!response.data) return null; 
    return response.data;
}

export default getCurrentUser;
