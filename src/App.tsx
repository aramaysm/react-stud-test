import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/styles.scss";
import { Button } from "./components/Button";
import { CheckBox, TextField } from "./components/Inputs/";
import { Header } from "./layouts/Header";
import { Table } from "./components/Table";
import {
  ActionsButtonsTable,
  ColumnPropertiesTable,
  EnumTypeInput,
  InputDialog,
} from "./models";
import { Dialog } from "./components/Dialogs";
import { ManagementStudents } from "./features/ManagementStudents";

function App() {
  

  return (
    <div className="App w-full">
      <ManagementStudents />
    </div>
  );
}

export default App;
