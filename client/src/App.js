import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/views/Home";
import Profile from "./components/views/Profile";
import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import CreatePost from "./components/views/CreatePost";
import { userReducer, initialState } from "./reducers/userReducer";
import { userLoggedIn } from "./actions";
import UserProfile from "./components/views/UserProfile";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      history.push("/login");
      return;
    }
    dispatch(userLoggedIn(user));
  }, [history, dispatch]);
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route path="/profile/:id" component={UserProfile}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/new" component={CreatePost}></Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
