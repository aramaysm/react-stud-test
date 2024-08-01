import React from "react";
import { ActionsButtonsTable, ColumnPropertiesTable } from "../../models";
import { CheckBox } from "../Inputs";

interface TableProps {
  dataTable: any[];
  columnsProperties: ColumnPropertiesTable[];
  onSelectRow: (rowSelected: any) => void;
  actions?: ActionsButtonsTable[];
  selectedRows?: any[];
  page: number;
  rowsPerPage: number;
}

export const Table: React.FC<TableProps> = ({
  dataTable,
  columnsProperties,
  actions,
  onSelectRow,
  selectedRows,
  page,
  rowsPerPage,
}: TableProps) => {


  const isSelected = (id: number) => {
    const found = selectedRows?.find((item) => item === id);
    console.log(found)
    if (found && found !== -1) return true;
    else return false;
  };


  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {columnsProperties.map((col) => (
            <th key={'head'+col.field }>{col.header}</th>
          ))}
          {actions ? <th>Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {dataTable
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          ?.map((row) => (
            <tr key={row.id}>
              <td>
                <CheckBox
                  onChange={() => onSelectRow(row)}
                  value={isSelected(row.id)}
                />
              </td>
              {columnsProperties.map((col) => (
                <td key={col.field + row.id}>
                  {typeof row[col.field] === "object"
                    ? row[col.field]["label"]
                    : row[col.field]}
                </td>
              ))}
              {actions ? (
                <td>
                  {actions.map((act) => (
                    <i
                      key={act.icon}
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
