import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
    </BrowserRouter>
  );
};

export default App;
