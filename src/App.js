import { connect } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Onboarding/Login";
import Home from "./components/Home/Home";
import Header from "./components/atoms/Header";
import { getUserAuth } from "./actions";
import TrifurcatePage from "./components/Onboarding/TrifurcatePage";
import { useState } from "react";
import Connection from "./components/Pages/Connections/Connection";
import Messages from "./components/Pages/Messaging/Messages";
import Notifications from "./components/Pages/Notifications/Notifications";
import Signup from "./components/Onboarding/Signup";
import Verify from "./components/Onboarding/Verify";
import LoginNew from "./components/Onboarding/LoginNew";
import Profile from "./components/Pages/Profile/Profile";

function App(props) {
  const [identity, setIdentity] = useState(3);

  useEffect(() => {
    props.getUserAuth();
    
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <LoginNew />
          </Route>
          <Route path="/verify">
            <Verify />
          </Route>
          <Route exact path="/trifurcate">
            <TrifurcatePage setIdentity={setIdentity} identity={identity} />
          </Route>
          <Route path="/home">
            <Header isActive={'Home'} setIdentity={setIdentity} />
            <Home identity={identity} />
          </Route>
          <Route path="/connection">
            <Header isActive={'Connections'} setIdentity={setIdentity} />
            <Connection />
          </Route>
          <Route path="/messaging">
            <Header isActive={'Messaging'} setIdentity={setIdentity} />
            <Messages />
          </Route>
          <Route path="/notifications">
            <Header isActive={'Notifications'} setIdentity={setIdentity} />
            <Notifications />
          </Route>
          <Route path="/profile">
            <Header isActive={'Notifications'} setIdentity={setIdentity} />
            <Profile />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
