import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProductPage from "./pages/productPage/ProductPages";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import FindFriend from "./pages/findFriend/FindFriend";
import SuggestProduct from "./pages/suggestProduct/SuggestProduct"
import SuggestionBox from "./pages/SuggestionBox/suggestionBox"
function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route path = "/details/:id"><ProductPage /></Route>
          <Route path = "/suggestionBox"><SuggestionBox /></Route>
          <Route path = "/suggest/:id"><SuggestProduct /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/profile"><Profile />
          </Route><Route path="/findfriend"><FindFriend /></Route>
          <Route exact path="/"><Main /></Route> 
          <Route path="">error page</Route>       
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
