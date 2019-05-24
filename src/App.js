import React, { Component } from "react";
import ParkIdea from "./Components/material-ui/ParkIdea";
import SignUp from "./Components/material-ui/SignUp";
import Header from "./Components/material-ui/Header";
import Idea from "./Components/material-ui/Idea"
// import View from "./Components/material-ui/View"



// using ES6 modules
import { BrowserRouter, Route } from "react-router-dom";
import  Modal from "./Components/material-ui/Modal";
import MyIdeas from "./Components/material-ui/MyIdeas";

import SignIn from "./Components/material-ui/SignIn";

// import xSignIn from "./Components/material-ui/xSignIn";


// // using CommonJS modules
// var Router = require("react-router").Router;
// var Route = require("react-router").Route;
// var Switch = require("react-router").Switch;
 
// // using CommonJS modules
// const BrowserRouter = require("react-router-dom").BrowserRouter;
// const Route = require("react-router-dom").Route;
// const Link = require("react-router-dom").Link;

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       authenticated: false
    }
  }
  
  render() {
    return (
      <div className="App">
     
      <BrowserRouter>
      <Route exact path='/' component={Modal} />
      <Header authenticated = {this.state.authenticated}/>
      <Route exact path='/SignIn' component={SignIn} />
      <Route exact path='/SignUp' component={SignUp} />
      <Route exact path='/ParkIdea' component={ParkIdea} />
      <Route exact path='/' component={Idea} />
      <Route exact path='/Idea' component={Idea} />
      <Route exact path='/MyIdeas' component={MyIdeas} />
      {/* <Route exact path='/view' component={View} /> */}


        {/* <SignIn />
        <SignUp /> */}    
        {/* <ParkIdea /> */}
        {/* <Header />   */}

{/* <Modal />  */}

{/* <xSignIn /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
