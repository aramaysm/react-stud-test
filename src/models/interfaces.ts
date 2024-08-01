import { EnumTypeInput } from ".";

export interface ButtonProps {
    label: string,
    onClick: ()=> void,
    disabled?: boolean,
    color: string,
    icon?: string;
}

export interface ColumnPropertiesTable {
    field: string,
    header: string,
    maxWidth?: string,
}

export interface ActionsButtonsTable {
    icon: string,
    color: string,
    onClick: (data:any)=> void
}

export interface OptionsSelect {
    id: string,
    label: string
}

export interface InputDialog {
    type: EnumTypeInput,
    label: string,
    key: string,
    options?: OptionsSelect[]
}

export interface Student{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    grade: string,
}