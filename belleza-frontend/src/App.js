import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Moodboard from "./pages/moodboard/Moodboard";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Main />
          </Route>        
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
