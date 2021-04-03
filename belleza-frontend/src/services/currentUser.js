import axios from "axios";

async function getCurrentUser() {

    const response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/profile"
      })
      console.log(response.data);
    // let response = await res.json();
    return response.data;
    //   console.log(res)
      // .then((res) => {
          // currentUser = res.data;
      // });
    // return res;
}
export default getCurrentUser;
