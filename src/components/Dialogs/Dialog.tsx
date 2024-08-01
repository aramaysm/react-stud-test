import React from "react";
import "../../styles/inputs.scss";
import { Button } from "../Button";
import { Select, TextField } from "../Inputs";
import { EnumTypeInput, InputDialog } from "../../models";

interface DialogProps {
  title: string;
  openDialog: boolean;
  closeDialog: () => void;
  saveInfo: (data: any) => void;
  dataInputs: InputDialog[];
  data?: any;
  
}

export const Dialog: React.FC<DialogProps> = ({
  openDialog,
  closeDialog,
  saveInfo,
  dataInputs,
  title,
  data,
 
}: DialogProps) => {


    const[newData, setNewData] = React.useState(data);
    const[isvalid, setIsValid] = React.useState(false);

    React.useEffect(()=>{
      setNewData(data);
      setIsValid(false)
    },[data[dataInputs[0].key]]);


    const onChangeInput = (key: string, value: string) => {
      const oldData = newData;
      oldData[key] = value;
      setNewData(oldData);
      isValid()
    }

    const isValid = () => {
      const values = Object.values(newData);
      const found = values.findIndex((item)=> item === "" || item === null);
      
      setIsValid(values.length < dataInputs.length-1 || found !== -1 ? false : true)
      
    }

  return openDialog ? (
    <div className="dialog">
      <div id="header-dialog" className="row">
        <h4>{title}</h4>
      </div>
      <div className="column gap-1 mt-1">
        {dataInputs.map((input) =>
          input.type === EnumTypeInput.TEXT ||
          input.type === EnumTypeInput.NUMBER  || input.type === EnumTypeInput.EMAIL ? (
            <TextField
              errorMsg={input.errorMsg ? input.errorMsg : ""}
              key={input.key}
              type={input.type}
              label={input.label}
              onChange={(value) => {onChangeInput(input.key, value)}}
              color={""}
              value={newData[input.key] ? newData[input.key] : newData[input.key]}
            />
          ) : input.type === EnumTypeInput.SELECT ? (
            <Select
              options={input.options ? input.options : []}
              label={input.label}
              onChange={(value) => onChangeInput(input.key, value)}
            />
          ) : (
            <></>
          )
        )}
      </div>

      <div className="row just-center gap-1 mt-2">
        <Button label={"Cancel"} onClick={closeDialog} color={"secondary"} />
        <Button label={"Save"} onClick={()=> saveInfo(newData)} color={"primary"}
        disabled={!isvalid} />
      </div>
    </div>
  ) : (
    <></>
  );
};
