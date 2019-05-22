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

class SignUp extends Component {
  state = {
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    c_password: "",
    data: []
  };

  handleF_nameChange = event => {
    this.setState({
      f_name: event.target.value
    });
  };

  handleL_nameChange = event => {
    this.setState({
      l_name: event.target.value
    });
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

  handleC_passwordChange = event => {
    this.setState({
      c_password: event.target.value
    });
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleOnClick = e => {
    let { f_name, l_name, email, password, c_password, data } = this.state; //object destructing
    let obj = { f_name, l_name, email, password, c_password };
    data.push(obj);
    this.setState({ data });

    if (f_name !== "" && l_name !== "" &&  email !== "" && password !== "" && c_password !== "") {
      data.push(obj);
      this.setState({
        data,
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        c_password: "",
      });
    } else {
      alert("plz fill the field");
    }


    if (this.state.password != this.state.c_password) {
      alert("Passwords don't match");
    } else {
      var url = "http://localhost:8000/signup";
      console.log(obj);
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
            console.log("record has been insert succuss", response.data);
            alert("you have successfuly signed up");
            this.goto("/SignIn");
            //   window.location.href="/index.html";
          } else {
            // when error
            console.log("record is not inserted Error: ", response.error);

            if (response.error.code == "ER_DUP_ENTRY") {
              alert("This email id is alredy resgisterd");
            }
          }
          // alert('Record has been insert successfully')
        })
        .catch(err => {
          console.log("Error occured in insertion", err);
          // alert('Error in insertion')
        }); // parses response to JSON
    }
    this.goto("/SignIn")
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper} style={{backgroundColor:'#e3f2fd'}}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="First Name"
                  name="First Name"
                  autoComplete="First Name"
                  value={this.state.f_name}
                  onChange={this.handleF_nameChange}
                  placeholder="First Name"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                  type="First Name"
                />
              </MuiThemeProvider>{" "}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Last Name"
                  name="Last Name"
                  autoComplete="Last Name"
                  value={this.state.l_name}
                  onChange={this.handleL_nameChange}
                  placeholder="Last Name"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                  type="Last Name"
                />
              </MuiThemeProvider>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Email"
                  name="Email"
                  autoComplete="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder="Email"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                  type="email"
                />
              </MuiThemeProvider>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Password"
                  name="Password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                  type="password"
                />
              </MuiThemeProvider>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Confirm Password"
                  name="Confirm Password"
                  autoComplete="current-password"
                  value={this.state.c_password}
                  onChange={this.handleC_passwordChange}
                  placeholder="Confirm Password"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                  type="password"
                />
              </MuiThemeProvider>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              className={classes.button}
              // onClick={() => this.goto("/SignIn")}
              onClick={this.handleOnClick}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignUp));
