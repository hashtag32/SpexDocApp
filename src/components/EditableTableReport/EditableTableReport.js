import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Button from "components/CustomButtons/Button.js";
import CommonComps from "components/Internal/CommonComps.js";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { getPublicKey } from "components/Internal/Extraction.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";

class EditableTableReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      data: this.props.tableOptions.data,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };

    this.tableChanged = this.tableChanged.bind(this);
    this.fetchTable = this.fetchTable.bind(this);
  }

  componentDidMount() {
    this.fetchTable();
  }

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = () => {
    this.fetchTable();
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    return readDBData(
      this.props.tableOptions.name,
      this.props.tableOptions.name == "Emergency"
    ).then((doc_data) => {
      if (doc_data == null)
        // Cannot get data -> set default data from parent class
        this.setState({ data: this.props.tableOptions.data });
      else this.setState({ data: doc_data });
    });
  };

  // Is called when table is changed
  tableChanged = () => {
    var success = writeDBData(this.props.tableOptions.name, this.state.data);
    if (success == false) this.displayLogin();
  };

  // todo: Find a way to cluster/extract it to a common place
  displayLogin = () => {
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
  };

  render() {
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <MaterialTable
          boxShadow={0}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          title=""
          columns={this.props.tableOptions.columns}
          options={{
            headerStyle: {
              color: "#9c27b0",
              padding: 15,
              paddingLeft: 5,
            },
            actionsColumnIndex: 10,
            cellStyle: {
              padding: 5,
              paddingLeft: 5,
            },
            rowStyle: {
              fontSize: 13,
              fontWeight: 300,
            },
          }}
          data={this.state.data}
          localization={{
            body: {
              emptyDataSourceMessage: "Keine Einträge",
              addTooltip: "Hinzufügen",
              deleteTooltip: "Löschen",
              editTooltip: "Bearbeiten",
              filterRow: {
                filterTooltip: "Filter",
              },
              editRow: {
                deleteText: "Diese Zeile wirklich löschen?",
                cancelTooltip: "Abbrechen",
                saveTooltip: "Speichern",
              },
            },
            grouping: {
              placeholder: "Spalten ziehen ...",
              groupedBy: "Gruppiert nach:",
            },
            header: {
              actions: "Aktionen",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} von {count}",
              labelRowsSelect: "Zeilen",
              labelRowsPerPage: "Zeilen pro Seite:",
              firstAriaLabel: "Erste Seite",
              firstTooltip: "Erste Seite",
              previousAriaLabel: "Vorherige Seite",
              previousTooltip: "Vorherige Seite",
              nextAriaLabel: "Nächste Seite",
              nextTooltip: "Nächste Seite",
              lastAriaLabel: "Letzte Seite",
              lastTooltip: "Letzte Seite",
            },
            toolbar: {
              addRemoveColumns: "Spalten hinzufügen oder löschen",
              nRowsSelected: "{0} Zeile(n) ausgewählt",
              showColumnsTitle: "Zeige Spalten",
              showColumnsAriaLabel: "Zeige Spalten",
              exportTitle: "Export",
              exportAriaLabel: "Export",
              exportName: "Export als CSV",
              searchTooltip: "Suche",
              searchPlaceholder: "Suche",
            },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                  this.tableChanged();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                  this.tableChanged();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                  this.tableChanged();
                }, 600);
              }),
          }}
        />
      </div>
    );
  }
}

export default EditableTableReport;
