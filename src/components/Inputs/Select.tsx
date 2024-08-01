import { EnumTypeInput, OptionsSelect } from "../../models";
import "../../styles/inputs.scss";

interface SelectProps {
  options: OptionsSelect[];
  label: string;
  onChange: (data: any) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  onChange,
}: SelectProps) => {
  return (
    <div className="row ">
      <select onChange={(event) => onChange(event.target.value)}>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
