import axios from "axios";

async function getCurrentUser() {
    let response;
    await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/profile"
      })
      .then((res) => {
          response = res.data;
          return res.data;
        })
    // let response = await res.json();
    return response;
    //   console.log(res)
      // .then((res) => {
          // currentUser = res.data;
      // });
    // return res;
}
export default getCurrentUser;
