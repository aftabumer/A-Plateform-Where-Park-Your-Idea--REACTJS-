import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import purple from '@material-ui/core/colors/purple';
import Modal from "./Modal";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ParkIdea from "./ParkIdea";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import red from "@material-ui/core/colors/red";

import { withRouter } from "react-router-dom";




import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = {
  root: {
    // flexGrow: 1,
    backgroundColor : red,
  },
  grow: {
    flexGrow: 1,
    cursor: "pointer"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    // margin: '0px 0px 75px 0px',
    // position: "static",
    // backgroundColor : red,
    
  },
  toolbarTitle: {
    flex: 1
  },
  style:{
    // marginLeft:'40px',
    textAlign: 'right',
    // fontWeight:'500',
    // fontSize: "Helvetica Bold",
    // fontFamily: "Open Sans Regular"
    font: 'small-caps bold 24px/1 sans-serif',
  }
};



class ButtonAppBar extends Component {
  state = {
    isSignIn: false
  };
  
  componentWillMount() {
    setInterval(() => {
      var isSignIn = JSON.parse(window.localStorage.getItem("isSignIn"));
var userName = window.localStorage.getItem("f_name");


      this.setState({
        isSignIn,
        userName: userName
      });
    }, 1000);
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleOnLogin = () => {
    //var showStatus

    this.goto("/SignIn");
  };

  handleOnlogout = () => {
    localStorage.clear();
    localStorage.setItem("isSignIn", false);

    this.goto("/Idea");
  };

  handleOnPostIdea = () => {
    this.goto("/ParkIdea");
  };

  handleOnMyIdeas = () => {
    this.goto("/MyIdeas");
  };
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        <AppBar position="static" style={{backgroundColor:'#6a1b9a',font: 'small-caps bold 24px/1 sans-serif'}}>
          <Toolbar>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
              className={classes.grow}
              onClick={() => this.goto("/")}
            >
              Park Ideas
            </Typography>
            {!this.state.isSignIn ? (
              <Button style={{font: 'small-caps bold 16px/1 sans-serif', textAlign: 'right'}} color="inherit" onClick={this.handleOnLogin}>
                Login
              </Button>
            ) : (
              <div>
                <Typography className={classes.style} color="inherit">Welcome {this.state.userName}</Typography>

                <Button style={{font: 'small-caps bold 16px/1 sans-serif', textAlign: 'right'}} color="inherit" onClick={this.handleOnlogout}>
                  Logout
                </Button>
                <Button style={{font: 'small-caps bold 16px/1 sans-serif', textAlign: 'right'}} color="inherit" onClick={this.handleOnPostIdea}>
                  Park Idea
                </Button>
                <Button style={{font: 'small-caps bold 16px/1 sans-serif', textAlign: 'right'}} color="inherit" onClick={this.handleOnMyIdeas}>
                  My Ideas
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
    
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonAppBar));
