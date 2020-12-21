import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <input
          style={{ display: "none" }}
          id="upload-photo"
          ref={(ref) => (this.fileInput = ref)}
          name="upload-photo"
          type="file"
          onChange={(ev) => this.props.uploadImageAction(this.props.medRecord,ev)}

        />
        <Fab
          className={classes.fab}
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
          onClick={() => this.fileInput.click() }
        >
          <AddIcon /> Upload Photo
        </Fab>
      </div>
    );
  }
}

UploadImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadImage);
