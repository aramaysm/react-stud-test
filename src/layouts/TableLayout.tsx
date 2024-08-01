import React from "react";
import { PaginationTable, Table } from "../components/Table";
import { ActionsButtonsTable, ColumnPropertiesTable } from "../models";

interface TableLayoutProps {
  dataTable: any[];
  columnsProperties: ColumnPropertiesTable[];
  onSelectRow: (rowSelected: any) => void;
  actions?: ActionsButtonsTable[];
  selectedRows?: any[];
}

export const TableLayout: React.FC<TableLayoutProps> = ({
  dataTable,
  columnsProperties,
  onSelectRow,
  selectedRows,
  actions,
}: TableLayoutProps) => {
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(0);

  return (
    <div className="row gap-2 just-end">
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        dataTable={dataTable}
        columnsProperties={columnsProperties}
        onSelectRow={onSelectRow}
        selectedRows={selectedRows}
        actions={actions}
      />
      <div className="w-2 ">
        <PaginationTable
          page={page}
          totalItems={dataTable.length}
          itemsPerPage={rowsPerPage}
          onChange={(data) => setPage(data)}
        />
      </div>
    </div>
  );
};
