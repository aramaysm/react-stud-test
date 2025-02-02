import React, { useEffect } from "react";
import { Header } from "../layouts/Header";
import { TableLayout } from "../layouts";
import {
  ActionsButtonsTable,
  ColumnPropertiesTable,
  EnumTypeInput,
  InputDialog,
  Student,
} from "../models";
import { Dialog } from "../components/Dialogs";
import { GeneralContext } from "../contexts/GeneralContext";
import { DialogAlert } from "../components/Dialogs/DialogAlert";
import { DialogConfirm } from "../components/Dialogs/DialogConfirm";

export const ManagementStudents = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState<Student | any>({});
  const [selectedRows, setSelectedRows] = React.useState<Student[] | any[]>([]);
  const [isMultiple, setIsMultiple] = React.useState<boolean>(false);
  const [checkeds, setCheckeds] = React.useState<Student[] | any[]>([]); 
  const [alertInfo, setAlertInfo] = React.useState({
    color: "danger",
    title: "Error",
    content: "Error",
  });
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [openDialogConf, setOpenDialogConf] = React.useState<boolean>(false);
  const {
    students,
    addStudents,
    editStudents,
    getAllStudents,
    removeStudent,
    getIdStudent,
    removeMultipleStudent,
    getAllGrades,
    grades
  } = React.useContext(GeneralContext);

  const onEdit = (data: any) => {
    setSelectedRow(data);
    setOpenDialog(true);
  };

  const onSaveDataDialog = async (data: any) => {
    if (data.id) {
      //edit
      const newData = {...data, grade: data.grade.id}
      await editStudents(newData, data.id).then((next: any) => {
        if (next.errorMsg) {
          setAlertInfo({
            color: "danger",
            title: "Error",
            content: next.errorMsg,
          });
          setOpenAlert(true);
        } else {
          setOpenDialog(false);
          setAlertInfo({
            color: "success",
            title: "Information",
            content: "Student edited successfully!!",
          });
          setOpenAlert(true);
          getAllStudents();
          
          setSelectedRow({});
        }
      });
    } else {
      //add
      
      await addStudents(data).then((result: any) => {
        
        if (result.errorMsg !== undefined) {
          setAlertInfo({
            color: "danger",
            title: "Error",
            content: result.errorMsg,
          });          
          setOpenAlert(true);
          
        } else {
          setAlertInfo({
            color: "success",
            title: "Information",
            content: "Student added successfully!!",
          });
          setOpenAlert(true);
          getAllStudents();
          setSelectedRow({});
          setOpenDialog(false);
        }
      });
    }
  };

  const actionsTable: ActionsButtonsTable[] = [
    {
      icon: "edit",
      color: "warning",
      onClick: (data: any) => {
        onEdit(data);
      },
    },
    {
      icon: "trash",
      color: "danger",
      onClick: (data: any) => {
        setIsMultiple(false);
        setSelectedRow(data);
        setOpenDialogConf(true);
      },
      
    },
  ];

  const dataInputs: InputDialog[] = [
    {
      type: EnumTypeInput.TEXT,
      key: "firstName",
      label: "Firstname",
      errorMsg: "Introduce just letters",
    },
    {
      type: EnumTypeInput.TEXT,
      key: "lastName",
      label: "Lastname",
      errorMsg: "Introduce just letters",
    },
    {
      type: EnumTypeInput.EMAIL,
      key: "email",
      label: "Email",
      errorMsg: "Invalid format of email"
    },
    {
      type: EnumTypeInput.NUMBER,
      key: "age",
      label: "Age",
      errorMsg: "Introduce just numbers",
    },
    {
      type: EnumTypeInput.SELECT,
      key: "grade",
      label: "Grade",
      options: grades,
    },
  ];
  

  const onDelete = async(data:any) => {
    setOpenDialogConf(false);
    await removeStudent(data.id).then((next: any) => {
        if (next.errorMsg) {
          setAlertInfo({
            color: "danger",
            title: "Error",
            content: next.errorMsg,
          });
          setOpenAlert(true);
        } else {
          setOpenDialog(false);
          setAlertInfo({
            color: "success",
            title: "Information",
            content: "Student deleted successfully!!",
          });
          setOpenAlert(true);
          getAllStudents();
          
          setSelectedRow({});
        }
      });
  }

  const onMultipleDelete = async() => {
    setOpenDialogConf(false);
    await removeMultipleStudent(selectedRows).then((next: any) => {
        if (next.errorMsg) {
          setAlertInfo({
            color: "danger",
            title: "Error",
            content: next.errorMsg,
          });
          setOpenAlert(true);
        } else {
          setOpenDialog(false);
          setAlertInfo({
            color: "success",
            title: "Information",
            content: "Students deleted successfully!!",
          });
          setOpenAlert(true);
          getAllStudents();          
          setSelectedRow({});
          setSelectedRows([]);
        }
      });
  }

  const onRowSelect = (data: any) => {

    setSelectedRow(data);

    const rowsOld = selectedRows;
    
    const found = selectedRows?.findIndex((item)=> item=== data.id);
    

    if(found && found !== -1){       
        setSelectedRows(selectedRows.splice(found, 1));        
    }
    else{
        rowsOld.push(data.id);
        setSelectedRows(rowsOld)
    }

   
  }

  useEffect(() => {
    getAllStudents();
    getAllGrades(10, 0);
  }, []);

  

  return (
    <div className="w-full">
      <Header
        title={"Manage Students"}
        buttons={[
          {
            label: "Delete",
            onClick: () => {
                setIsMultiple(true);
                setOpenDialogConf(true);
            },
            color: "danger",
            icon: "minus-circle",
            disabled: selectedRows.length < 2
          },
          {
            label: "New Student",
            onClick: () => {
              setSelectedRow({});
              setOpenDialog(true);
            },
            color: "success",
            icon: "plus-circle",
          },
        ]}
      />
      <div className="p-2">
        <TableLayout
          selectedRows={selectedRows}
          dataTable={students}
          columnsProperties={columns}
          onSelectRow={(dataSelected) => onRowSelect(dataSelected)}
          actions={actionsTable}
        />
      </div>
      <DialogAlert
        title={alertInfo.title}
        content={alertInfo.content}
        openDialog={openAlert}
        closeDialog={() => setOpenAlert(false)}
        color={alertInfo.color}
      />
      <DialogConfirm title={"Confirmation"} content={"Are you sure than delete these element?"}
       openDialog={openDialogConf} closeDialog={()=> setOpenDialogConf(false)}
        saveInfo={()=> isMultiple ? onMultipleDelete() : onDelete(selectedRow)} color={"warning"} />
      <Dialog
        title={selectedRow.id ? "Edit student" : "New student"}
        openDialog={openDialog}
        closeDialog={() => {
          setSelectedRow({});
          setOpenDialog(false);
        }}
        saveInfo={(data) => {
          onSaveDataDialog(data);
        }}
        dataInputs={dataInputs}
        data={selectedRow}
       
      />
    </div>
  );
};

const columns: ColumnPropertiesTable[] = [
  {
    field: "firstName",
    header: "FirstName",
  },
  {
    field: "lastName",
    header: "LastName",
  },
  {
    field: "email",
    header: "Email",
  },
  {
    field: "age",
    header: "Age",
  },
  {
    field: "grade",
    header: "Grade",
  },
];

