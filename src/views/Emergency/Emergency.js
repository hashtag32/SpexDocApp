import { checkUser } from "components/Internal/Checks.js";
import { getUserID } from "components/Internal/Checks.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const styles = {
  margin: {
    margin: "0",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  ref: "https://google.de",
};

class Emergency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      OrganDonationData: {
        RadioSelection: "Nein",
        TextBoxJAAusnahme: "",
        TextBoxJANur: "",
        TextBoxNeinNachlass: "",
      },
      predispositionTable: {
        name: "EmergencyPredisposition",
        columns: [
          { title: "Vorerkrankung", field: "predisposition" },
          { title: "Diagnose seit", field: "diagnosis_year" },
        ],
        data: [
          {
            predisposition: "Kreislaufschwäche",
            diagnosis_year: "2010",
          },
        ],
      },
      medicationTable: {
        name: "EmergencyMedication",
        columns: [
          { title: "Medikament", field: "medication" },
          { title: "Rhythmus", field: "rythme" },
        ],
        data: [
          {
            medication: "IbuHEXAL",
            rythme: "2x Täglich",
          },
        ],
      },
      contactTable: {
        name: "EmergencyContacts",
        columns: [
          { title: "Name", field: "name" },
          { title: "Beziehung", field: "relation" },
          { title: "Telefonnummer", field: "phone" },
          { title: "Adresse", field: "address" },
        ],
        data: [
          {
            name: "Nora Tilmann",
            relation: "Mutter",
            rythme: "01522722892",
            rythme: "Seestraße 24, München",
          },
        ],
      },
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("OrganDonationData", false).then((doc_data) => {
      if (doc_data != null) this.setState({ OrganDonationData: doc_data });
    });
  };

  uploadProfile = () => {
    console.log("update");
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData(
      "OrganDonationData",
      this.state.OrganDonationData
    );
    if (success == false) this.displayLogin();
  };

  // Nice function: Sets states automatically
  inputChange = async (property, event) => {
    var changedValue = event.target.value;
    this.setState(
      {
        OrganDonationData: {
          ...this.state.OrganDonationData,
          [property]: changedValue,
        },
      },
      () => {
        this.uploadProfile();
      }
    );
  };

  radioChange = (event) => {
    this.setState(
      {
        OrganDonationData: {
          ...this.state.OrganDonationData,
          RadioSelection: event.target.value,
        },
      },
      () => {
        this.uploadProfile();
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Vorerkrankungen</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <EditableTableReport
                tableOptions={this.state.predispositionTable}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Medikamente</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <EditableTableReport tableOptions={this.state.medicationTable} />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Angehörige</h4>
              <p className={classes.cardCategoryWhite}>Kontaktdaten</p>
            </CardHeader>
            <CardBody>
              <EditableTableReport tableOptions={this.state.contactTable} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Organspende</h4>
              <p className={classes.cardCategoryWhite}>
                Weitere Infos{" "}
                <a target="_blank" href="https://www.organspende-info.de">
                  {" "}
                  hier
                </a>
              </p>
            </CardHeader>
            <CardBody>
              <FormControl component="fieldset">
                <FormGroup>
                  <RadioGroup
                    aria-label="ge2nder"
                    name="gender1"
                    value={this.state.OrganDonationData.RadioSelection}
                    onChange={this.radioChange}
                  >
                    <FormControlLabel
                      value="JaTod"
                      control={<Radio />}
                      style={{ color: "black" }}
                      label={
                        <div>
                          <Typography variant="body1">
                            JA, ich gestattet, dass nach der ärztlichen
                            Festellung meines Todes meinem Körper Organe und
                            Gewebe entnommen werden.
                          </Typography>
                        </div>
                      }
                    />

                    <br />
                    <br />

                    <FormControlLabel
                      value="JAAusnahme"
                      control={<Radio />}
                      style={{ color: "black" }}
                      label={
                        <div>
                          <Typography variant="body1">
                            JA, ich gestatte dies, mit Ausnahme folgender
                            Organe/Gewebe:
                          </Typography>

                          <CustomInput
                            inputProps={{
                              value: this.state.OrganDonationData
                                .TextBoxJAAusnahme,
                              onChange: (e) =>
                                this.inputChange("TextBoxJAAusnahme", e),
                            }}
                            formControlProps={{
                              className: classes.margin,
                              fullWidth: true,
                            }}
                          />
                        </div>
                      }
                    />

                    <br />
                    <br />

                    <FormControlLabel
                      value="JANur"
                      control={<Radio />}
                      style={{ color: "black" }}
                      label={
                        <div>
                          <Typography variant="body1">
                            JA, ich gestatte dies, jedoch nur für folgende
                            Organe/Gewebe:
                          </Typography>

                          <CustomInput
                            inputProps={{
                              value: this.state.OrganDonationData.TextBoxJANur,
                              onChange: (e) =>
                                this.inputChange("TextBoxJANur", e),
                            }}
                            formControlProps={{
                              className: classes.margin,
                              fullWidth: true,
                            }}
                          />
                        </div>
                      }
                    />

                    <br />
                    <br />

                    <FormControlLabel
                      value="Nein"
                      control={<Radio />}
                      style={{ color: "black" }}
                      label="NEIN, ich widerspreche einer Entnahme von Organen oder Geweben."
                    />
                    <br />
                    <br />

                    <FormControlLabel
                      value="NeinNachlass"
                      control={<Radio />}
                      style={{ color: "black" }}
                      label={
                        <div>
                          <Typography variant="body1">
                            Über JA oder NEIN soll dann folgende Person
                            entscheiden:
                          </Typography>

                          <CustomInput
                            inputProps={{
                              value: this.state.OrganDonationData
                                .TextBoxNeinNachlass,
                              onChange: (e) =>
                                this.inputChange("TextBoxNeinNachlass", e),
                            }}
                            formControlProps={{
                              className: classes.margin,
                              fullWidth: true,
                            }}
                          />
                        </div>
                      }
                    />
                  </RadioGroup>
                </FormGroup>
              </FormControl>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Emergency.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Emergency);
