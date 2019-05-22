import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

// import purple from '@material-ui/core/colors/purple';
// import Form from "./Form";

const styles = theme => ({
  card: {
    margin: "0 auto",
    marginTop: "7%",
    marginBottom: "7%",
    padding: "5px 10px",
    maxWidth: "50%",
    color: "purple"
  },

  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
    // width: "100%",
    // maxWidth: 360,
    // // backgroundColor: theme.palette.background.paper
    // backgroundColor: 'pink'
  },
  list: {
    maxWidth: "auto",
    // backgroundColor: theme.palette.background.paper
    backgroundColor: "pink"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  inline: {
    display: "inline"
  },
  avatar: {
    margin: 10
  }
});
const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

class MediaCard extends Component {
  constructor(props) {
    super(props);
    var user_id = window.localStorage.getItem("user_id");
    var user_name = window.localStorage.getItem("f_name");

    this.state = {
      name: user_name,
      title: "",
      description: "",
      data: [],
      e_name: "",
      e_title: "",
      e_description: "",
      user_id: user_id,
      data: []
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnClick = () => {
    let { user_id, name, title, description, data } = this.state; //object destructing
    let obj = { user_id, name, title, description, editStatus: false };
    data.push(obj);

    var url = "http://localhost:8000/parkIdea";

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
          alert("you have successfuly parked your idea");
          //   window.location.href="/index.html";
        } else {
          // when error
          console.log("record is not inserted Error: ", response.error);

          alert("your idea is not parked successfuly");
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

    this.setState({
      data,
      name: "",
      title: "",
      description: ""
    });
    // this.goto({pathname:'/view',state:{save:this.state.data}})
    this.goto("/Idea");
  };

  handleOnDelete = index => {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({
      data: data
    });
  };

  handleEdit = index => {
    let data = this.state.data.map((item, i) =>
      i === index ? { ...item, editStatus: true } : item
    );

    this.setState({ data });
  };

  handleSave = index => {
    let data = this.state.data.map((item, i) =>
      i === index
        ? {
            ...item,
            editStatus: false,
            name: this.state.e_name,
            title: this.state.e_title,
            description: this.state.e_description
          }
        : item
    );

    this.setState({ data });
  };

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.data);

    return (
      <div>
        <Card className={classes.card} style={{ backgroundColor: "#e3f2fd" }}>
          <h2>Idea Details</h2>

          <CardContent>
            {/* <Form /> */}
            <div className={classes.root}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                  placeholder="Name"
                  variant="outlined"
                  id="filled-read-only-input"
                  fullWidth
                  InputProps={{
                    readOnly: true
                  }}
                />
              </MuiThemeProvider>

              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleOnChange}
                  placeholder="Title"
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  fullWidth
                />
              </MuiThemeProvider>

              <MuiThemeProvider theme={theme}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  placeholder="Description"
                  multiline
                  rows="4"
                  fullWidth
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </MuiThemeProvider>
            </div>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleOnClick}
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => this.goto("/")}
          >
            Cancle
          </Button>
        </Card>
        {this.state.data.map((item, i) => {
          return (
            <div>
              {/* <p>{item.name}</p>
              <p>{item.title}</p>
              <p>{item.description}</p> */}

              <List className={classes.list} container justify="center">
                <ListItem alignItems="flex-center">
                  <ListItemAvatar>
                    <Grid alignItems="center">
                      <Avatar
                        alt="Remy Sharp"
                        src="\material-ui\img\idea.jpg"
                        className={classes.avatar}
                      />
                    </Grid>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.editStatus ? (
                        <input
                          name="e_name"
                          value={this.state.e_name}
                          onChange={this.handleOnChange}
                        />
                      ) : (
                        item.name
                      )
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {item.editStatus ? (
                            <input
                              name="e_title"
                              value={this.state.e_title}
                              onChange={this.handleOnChange}
                            />
                          ) : (
                            item.title
                          )}
                        </Typography>
                        <br />
                        {item.editStatus ? (
                          <input
                            name="e_description"
                            value={this.state.e_description}
                            onChange={this.handleOnChange}
                          />
                        ) : (
                          item.description
                        )}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={
                    item.editStatus
                      ? () => this.handleSave(i)
                      : () => this.handleEdit(i)
                  }
                  size="small"
                >
                  {item.editStatus ? "Save" : "Edit"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  size="small"
                  onClick={this.handleOnDelete}
                >
                  Delete
                </Button>
              </List>
            </div>
          );
        })}
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
//export default (withRouter(withStyles(styles)(MediaCard)));
