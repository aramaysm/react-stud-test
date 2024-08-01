import '../../styles/inputs.scss'

interface CheckBoxProps {
    label?: string,
    onChange: ()=> void,
    disabled?: boolean,
    value:boolean 
}

export const CheckBox: React.FC<CheckBoxProps> = ({label, onChange, disabled, value}:CheckBoxProps) => {

    return (
        <div>
            <input type="checkbox" checked={value} value={label} onChange={onChange} />
        </div>
        
    )
}