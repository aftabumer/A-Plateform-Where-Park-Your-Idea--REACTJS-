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
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
// import purple from '@material-ui/core/colors/purple';
// import Form from "./Form";

const styles = theme => ({
  card: {
    margin: "0 auto",
    margin: "5% 20% 5% 20%",
    padding: "5px 10px",
    maxWidth: "100%",
    color: "purple",
    boxShadow: theme.shadows[12]
    //   outline: "none",
    //   width: 'auto',
    //   display: "flex",
    //   flexWrap: "wrap",
    //   flex:'33%',
    //   float: 'left',
    //   width: '33.33%',
    //   padding: '5px',
    //   content: "",
    // clear: 'both',
    // display: 'table',
  },

  description: {
    marginBottom: "10%",
    border: "solid",
    borderWidth: "1px"
  },

  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    display: "inline",
    flexWrap: "wrap",
    flexGrow: 1,
    // width: "100%",
    // maxWidth: 360,
    // // backgroundColor: theme.palette.background.paper
    // backgroundColor: 'pink'
  },
  list: {
    maxWidth: "auto"
    // backgroundColor: theme.palette.background.paper
    // backgroundColor: "pink"
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
  },
  style: {
    // marginLeft:'40px',
    textAlign: "center",
    // fontWeight:'500',
    // fontSize: "Helvetica Bold",
    // fontFamily: "Open Sans Regular"
    font: "small-caps bold 24px/1 sans-serif"
  },

  margin: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  menu: {
    width: 200
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
      e_name: "",
      e_title: "",
      e_description: "",
      ideas: [],
      user_id: user_id
    };
  }

  componentDidMount() {
    this.handleOnClick();
  }

  handleOnClick = () => {
    let { name, title, description, data } = this.state; //object destructing
    let obj = { name, title, description };

    var url = "http://localhost:8000/getIdea";

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
        if (response.status === 200) {
          console.log("data fethed", response.data);

          this.setState({ ideas: response.data });
        } else if (response.status === 204) {
          console.log("unable to fetch", response.data);
          alert("unable to fetch");
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
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleEdit = index => {
    let ideas = this.state.ideas.map((item, i) =>
      i === index ? { ...item, editStatus: true } : item
    );

    this.setState({ ideas });
  };

  handleSave = index => {
    let ideas = this.state.ideas.map((item, i) =>{
      const {e_name, idea_title, e_description} = this.state
      debugger
      return i === index
        ? {
            ...item,
            editStatus: false,
            name: e_name,
            idea_title: idea_title,
            title: idea_title,
            description: e_description
          }
        : item
        });
    debugger
    this.setState({ ideas });
  };

  handleOnDelete = (idea,index) => {



    var idea_id=idea.idea_id
    var idea_title=idea.idea_title
    var url = 'http://localhost:8000/deleteIdea'
 
    
    let obj={
        idea_id
    }
 
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj), // body data type must match "Content-Type" header
 
    }).then((response) => {
 
      return response.json()
    }).then((response) => {
      if (response.status === 200) {
        console.log('idea deleted', response.data)
        alert(idea_title+" deleted succesfully");
        //   window.location.href="/index.html";
        let ideas = this.state.ideas;
        ideas.splice(index, 1);
        this.setState({
          ideas: ideas
        });
      }
      else { // when error
        console.log('record is not inserted Error: ', response.error)
 
        alert("unable to delete");
      
 
      }
      // alert('Record has been insert successfully')
    }).catch((err) => {
      console.log('Error occured in deletion', err)
       alert(err)
    }) // parses response to JSON  
 
 
  };

  render() {
    const { classes } = this.props;
    //console.log(this.state.data);

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
        {this.state.ideas &&
          this.state.ideas.length &&
          this.state.ideas.map((idea, i) => {
            let idd = parseInt(localStorage.getItem("user_id"));
            if (idd !== idea.user_id) return;
            return (
              <Grid item xs={6}>
                <Card
                  className={classes.card}
                  style={{ backgroundColor: "#e3f2fd" }}
                >
                  <h2 className={classes.style}>{idea.idea_title}</h2>
                  <CardContent>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      rowsMax="4"
                      value={idea.description}
                      className={classes.textField}
                      style={{
                        font: "small-caps bold 24px/1 sans-serif",
                        textAlign: "center"
                      }}
                      margin="normal"
                      fullWidth
                    />
                    <div className={classes.ideaby}>
                      <h4
                        style={{
                          font: "small-caps bold 24px/1 sans-serif",
                          textAlign: "right"
                        }}
                      >
                        Idea by : {idea.user_name}
                      </h4>
                    </div>
                  </CardContent>

                  {/* <p>{idea.user_name}</p>
              <p>{idea.idea_title}</p>
              <p>{idea.description}</p> */}
                  <List className={classes.list} container justify="center">
                    <ListItem alignItems="flex-center">
                      <ListItemText
                        primary={
                          idea.editStatus ? (
                            <input
                              name="user_name"
                              value={this.state.user_name}
                              onChange={this.handleOnChange}
                            />
                          ) : (
                            idea.name
                          )
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {idea.editStatus ? (
                                <input
                                  name="idea_title"
                                  value={this.state.idea_title}
                                  onChange={this.handleOnChange}
                                />
                              ) : (
                                ''
                              )}
                            </Typography>
                            <br />
                            {idea.editStatus ? (
                              <input
                                name="e_description"
                                value={this.state.e_description}
                                onChange={this.handleOnChange}
                              />
                            ) : (
                              ''
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
                        idea.editStatus
                          ? () => this.handleSave(i)
                          : () => this.handleEdit(i)
                      }
                      size="small"
                    >
                      {idea.editStatus ? "Save" : "Edit"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      size="small"
                      onClick={()=>this.handleOnDelete(idea)}
                    >
                      Delete
                    </Button>
                  </List>
                
                </Card>
                </Grid>
            );
          })}
          </Grid>
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
