import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/profile_white.png";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { getUserID } from "components/Internal/Checks.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import CommonComps from "components/Internal/CommonComps.js";

import { connect } from "react-redux";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonProps: {
        LoginAlertProps: {
          openLoginRequired: false,
          FuncParams: "test",
        },
      },
      userProfile: {
        email: "max.mustermann@gmail.com",
        firstName: "Maximilian",
        lastName: "Mustermann",
        plz: "123456",
        city: "Musterstadt",
        street: "Maximilianstraße",
        aboutMe: "Ich bin Max.",
      },
    };
  }

  // For redux and others
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
    }
  }

  componentDidMount() {
    this.fetchTable();
  }

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("UserProfile", false).then((doc_data) => {
      if (doc_data != null) this.setState({ userProfile: doc_data });
      // Cannot get data -> set default data from parent class
      // this.setState({ userProfile: this.state.user });
      // else ;
    });
  };

  // Is called when table is changed
  uploadProfile = () => {
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData("UserProfile", this.state.userProfile);
    if (success == false) this.displayLogin();
  };

  // Nice function: Sets states automatically
  profileChange = (property, event) => {
    var changedValue = event.target.value;
    this.setState({
      userProfile: { ...this.state.userProfile, [property]: changedValue },
    });
  };

  // todo: Find a way to cluster/extract it to a common place
  displayLogin = () => {
    console.log("displaylogin");
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />

        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profil</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      inputProps={{
                        value: this.state.userProfile.email,
                        onChange: (e) => this.profileChange("email", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Vorname"
                      id="firstName"
                      inputProps={{
                        value: this.state.userProfile.firstName,
                        onChange: (e) => this.profileChange("firstName", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Nachname"
                      id="lastName"
                      inputProps={{
                        value: this.state.userProfile.lastName,
                        onChange: (e) => this.profileChange("lastName", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postleitzahl"
                      id="plz"
                      inputProps={{
                        value: this.state.userProfile.plz,
                        onChange: (e) => this.profileChange("plz", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Wohnort"
                      id="city"
                      inputProps={{
                        value: this.state.userProfile.city,
                        onChange: (e) => this.profileChange("city", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Straße"
                      id="street"
                      inputProps={{
                        value: this.state.userProfile.street,
                        onChange: (e) => this.profileChange("street", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Über mich"
                      id="aboutMe"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.userProfile.aboutMe,
                        onChange: (e) => this.profileChange("aboutMe", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.uploadProfile} round>
                  Speichern
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>Patient</h6>
                <h4 className={classes.cardTitle}>
                  {this.state.userProfile.firstName}{" "}
                  {this.state.userProfile.lastName}
                </h4>
                <h4 className={classes.cardTitle}>
                  {this.state.userProfile.city}
                </h4>
                <p className={classes.description}>
                  {this.state.userProfile.aboutMe}
                </p>
                <Button color="primary" onClick={this.shareProfile} round>
                  Share
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const UserProfileWithRedux = connect(mapStateToProps)(UserProfile);

export default withStyles(styles)(UserProfileWithRedux);
