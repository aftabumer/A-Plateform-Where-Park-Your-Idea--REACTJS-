import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    marginTop: "5px"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isSignIn: false,
    data: []
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleOnClick = e => {
    let { email, password, data } = this.state; //object destructing
    let obj = { email, password };

    if (email !== "" && password !== "") {
      data.push(obj);
      this.setState({
        data,
        email: "",
        password: ""
      });
    } else {
      alert("plz fill the field");
    }

    var url = "http://localhost:8000/signin";
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj) // body data type must match "Content-Type" header
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.status == 200) {
          console.log("login successful", response.data);
          const { user_id } = response.data;
          console.log(user_id);
          window.localStorage.setItem("user_id", user_id);

          const { f_name } = response.data;
          console.log(f_name);
          localStorage.setItem("f_name", f_name);

          //          this.setState.isSignIn= true
          this.setState({
            isSignIn: true
          });

          window.localStorage.setItem("isSignIn", this.state.isSignIn);

          alert("login successfull");
      this.goto("/ParkIdea")
          //	window.location.href="/v_dashboard.html";
        } else if (response.status == 204) {
          console.log("Email and password does not match", response.data);
          alert("incorrect email or password");
        } else {
          // when error
          console.log("login fail: ", response.error);
          alert(response.error.code);
        }
        // alert('Record has been insert successfully')
      })
      .catch(err => {
        console.log("Error occured", err);
        alert(err);
      }); // parses response to JSON

    e.preventDefault();
    this.setState({
      email: "",
      password: ""
    });


  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main} >
        <CssBaseline />
        <Paper className={classes.paper} style={{backgroundColor:'#e3f2fd'}}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  ref={TextField => {
                    this.emailInput = TextField;
                  }}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                />
              </MuiThemeProvider>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  ref={TextField => {
                    this.passwordInput = TextField;
                  }}
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                />
              </MuiThemeProvider>
            </FormControl>

            <Button
              type="reset"
              variant="contained"
              color="primary"
              fullWidth={true}

              className={classes.button}
              onClick={this.handleOnClick}
            >
              Sign In
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth={true}
              
              className={classes.button}
              onClick={() => this.goto("/SignUp")}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
