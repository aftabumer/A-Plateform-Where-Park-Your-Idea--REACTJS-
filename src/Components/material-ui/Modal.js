import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;
  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    // width: theme.spacing.unit * 50,
    backgroundColor: '#e1bee7',
    boxShadow: theme.shadows[8],
    // padding: theme.spacing.unit * 4,
    outline: "none",
    
    
  },
  button: {
    margin: theme.spacing.unit,
  },
  centre: {
    position: "absolute",
  },
});

class SimpleModal extends React.Component {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  goto = path => {
    this.props.history.push(path);
  };


  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <Button  onClick={this.handleOpen} className={classes.paper}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          
          
          // onClose={this.handleClose}
        >
       
          <div style={getModalStyle()} className={classes.paper} >
            {/* <SimpleModalWrapped /> */}
            <p style={{font: 'small-caps bold 24px/1 sans-serif', textAlign:'center'}}>You are here to ?</p>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.goto('/Idea')}
              >
                View Ideas
                
              </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.goto('/SignIn')}
            >
              Post Ideas
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default (withRouter(withStyles(styles)(SimpleModalWrapped)));
