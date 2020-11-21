import React from "react";
import ReactDOM from "react-dom";
import Button from "components/CustomButtons/Button.js";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import ModalFile from "components/ModalFile/ModalFile.js";

// const { FloatingActionButton, SvgIcon, MuiThemeProvider, getMuiTheme } = MaterialUI;
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  root2: {
    maxWidth: 345,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class ShowFile extends React.Component {
  constructor(props) {
    super(props);
    const script = document.createElement("script");

    script.src =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    script.async = true;

    document.body.appendChild(script);
    // highlight-range{3}
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fileInput = React.createRef();
    // Data pipeline to child class ModalFile
    this.propName = "testName";
    // this.child = React.createRef();

    this.state = {
      open: false,
    };
  }

  openModal = () => {
    // this.state.open=true;
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onChangeHandler = (event) => {
    // this.child.current.openModal(event);

    console.log("fired");
    console.log(this.propName);
  };

  handleSubmit(event) {
    // highlight-range{3}
    event.preventDefault();

    console.log("fired");

    var fileToUpload = event.target.files[0];
    var fileName = fileToUpload.name;

    console.log(fileToUpload);
    alert(`Uploaded file - ${fileName}`);

    // Create a root reference
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef
      .child(fileName)
      .put(fileToUpload)
      .then(function (snapshot) {
        console.log("Uploaded file!");
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root2}>
        <CardActionArea onClick={this.openModal}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            square
            image="https://firebasestorage.googleapis.com/v0/b/spexdoc.appspot.com/o/digital-doctor.jpg?alt=media&token=8aaa0e5a-c75f-4047-9e39-c6a99e4de451"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Dr. Wilder
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              20.11.2020
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Stuttgart
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" align="center" color="primary">
            Teilen
          </Button>
        </CardActions>
        <div>
          <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
            >
              Befund
            </DialogTitle>
            <DialogContent dividers>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                square
                image="https://firebasestorage.googleapis.com/v0/b/spexdoc.appspot.com/o/digital-doctor.jpg?alt=media&token=8aaa0e5a-c75f-4047-9e39-c6a99e4de451"
                title="Contemplative Reptile"
              />
              <Typography variant="h3" gutterBottom>
                Diagnose
              </Typography>
              <Typography variant="body1" gutterBottom>
                Allergie festgestellt.
              </Typography>
              <Typography variant="h3" gutterBottom>
                Therapie
              </Typography>
              <Typography variant="body1" gutterBottom>
                
                Es wurde eine Hyposensibilisierung durchgeführt. Keine weiteren
                Komplikationen bekannt.,
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
              >
                18.11.2020, Dr. Wilder
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    );
  }
}

ShowFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFile);
