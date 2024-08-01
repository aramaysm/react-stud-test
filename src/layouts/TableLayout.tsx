import { Table } from "../components/Table";
import { ActionsButtonsTable, ColumnPropertiesTable } from "../models";


interface TableLayoutProps {
  dataTable: any[];
  columnsProperties: ColumnPropertiesTable[];
  onSelectRow: (rowSelected: any) => void;
  actions?: ActionsButtonsTable[];
  selectedRows?: any[]
}

export const TableLayout: React.FC<TableLayoutProps> = ({dataTable, columnsProperties, onSelectRow,selectedRows, actions}:TableLayoutProps) => {

    return (
        <>
        <Table dataTable={dataTable} columnsProperties={columnsProperties} 
        onSelectRow={onSelectRow} selectedRows={selectedRows} actions={actions} />
        
        </>
    )
}

 