import { Table } from "@tanstack/react-table";
import { Input } from "../input";

interface DataTableFilterBarProps<TData> {
  table: Table<TData>;
  filter: string;
}

export function DataTableFilterBar<TData>({
  table,
  filter,
}: DataTableFilterBarProps<TData>) {
  return (
    <Input
      placeholder={`Filter ${filter}...`}
      value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        table.getColumn(filter)?.setFilterValue(event.target.value);
      }}
      className="max-w-sm"
    />
  );
}
