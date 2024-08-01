import { ActionsButtonsTable, ColumnPropertiesTable } from "../../models";
import { CheckBox } from "../Inputs";

interface TableProps {
  dataTable: any[];
  columnsProperties: ColumnPropertiesTable[];
  onSelectRow: (rowSelected: any) => void;
  actions?: ActionsButtonsTable[];
  selectedRows?: any[];
}

export const Table: React.FC<TableProps> = ({
  dataTable,
  columnsProperties,
  actions,
  onSelectRow,
  selectedRows,
}: TableProps) => {


  const isSelected = (id: number) => {
    const found = selectedRows?.find((item) => item === id);
    console.log("Found",selectedRows, id);
    if (found && found !== -1) return true;
    else return false;
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {columnsProperties.map((col) => (
            <th>{col.header}</th>
          ))}
          {actions ? <th>Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {dataTable?.map((row) => (
          <tr >
            <td>
              <CheckBox
                onChange={() => onSelectRow(row)}
                value={isSelected(row.id)}
              />
            </td>
            {columnsProperties.map((col) => (
              <td>{typeof row[col.field] === 'object' ? row[col.field]['label'] : row[col.field] }</td>
            ))}
            {actions ? (
              <td>
                {actions.map((act) => (
                  <i
                    onClick={() => act.onClick(row)}
                    className={
                      "m-1 bx bx-sm bxs-" + act.icon + " color-" + act.color
                    }
                  ></i>
                ))}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
