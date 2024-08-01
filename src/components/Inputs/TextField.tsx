import { EnumTypeInput } from '../../models'
import '../../styles/inputs.scss'

interface TextFieldProps {
    label: string,
    onChange: (value: string)=> void,
    disabled?: boolean,
    color: string,
    value?: string,
    type: EnumTypeInput.TEXT | EnumTypeInput.NUMBER,
    key: string,
}

export const TextField: React.FC<TextFieldProps> = ({label, onChange, disabled, value}:TextFieldProps) => {

    return (
        <input type="text" placeholder={label}
        onChange={(event)=> onChange(event.target.value)}
        defaultValue={value}
       
        />
    )
}