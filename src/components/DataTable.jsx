import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  // Memoize the header to prevent re-renders unless columns change
  const tableHeader = React.useMemo(
    () => (
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.field} style={{ width: column.width }}>
              {column.headerName}
            </TableHead>
          ))}
          {(onEdit || onDelete) && (
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
    ),
    [columns, onEdit, onDelete]
  );

  return (
    <div className="rounded-md border border-light-muted-text/20 dark:border-dark-muted-text/20 bg-light-background dark:bg-dark-background">
      <Table>
        {tableHeader}
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {/* Check if a custom render function is provided */}
                    {column.renderCell
                      ? column.renderCell({ row })
                      : row[column.field]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(row)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(row)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="h-24 text-center text-light-muted-text dark:text-dark-muted-text"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
