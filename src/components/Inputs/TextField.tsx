import React from "react";
import { EnumTypeInput } from "../../models";
import "../../styles/inputs.scss";

interface TextFieldProps {
  label: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  color: string;
  value?: string;
  type: EnumTypeInput;
  key: string;
  errorMsg: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  onChange,
  disabled,
  value,
  type,
  errorMsg,
  color
}: TextFieldProps) => {

    const [error, setError]= React.useState(false);

    const onChangeInput = (event: any) => {
        setError(false);
        const regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g

        if(type === EnumTypeInput.NUMBER){
            if(event.target.validity.valid)
                onChange(event.target.value)
            else setError(true);
        }
        else if(type === EnumTypeInput.TEXT) {
          if(regex.test(event.target.value) )
              onChange(event.target.value)
          else setError(true);
      }
        else{
            onChange(event.target.value)
        }
            

    }

  return (
    <div className="row ">
      <input
        type="text"
        pattern={type === EnumTypeInput.NUMBER ? "[0-9]*" : type === EnumTypeInput.TEXT ? "[a-zA-Z]*" : "" }
        placeholder={label}
        onChange={(event) => onChangeInput(event)}
        className={"w-full border-" + error ? 'danger' : "primary" }
        defaultValue={value}
      />
      {error ?
       <div className="p-0 m-0 w-full just-start" style={{height: '15px'}}>
        <h5 className="color-danger " >{errorMsg}</h5>
        </div>
        : null}
    </div>
  );
};
