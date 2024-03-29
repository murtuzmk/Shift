import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  filterFns,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options";
import { DataTableFilterBar } from "@/components/ui/data-table/data-table-filter-bar";
import { DataTableBody } from "@/components/ui/data-table/data-table-body";
import DataTableFilterOptions from "./data-table-filter-options";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addFilterBar?: boolean;
  filter?: string;
  addViewOptions?: boolean;
  filterOption?: string;
  setFilterOption?: React.Dispatch<React.SetStateAction<string>>;
  filters?: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  addFilterBar,
  filter,
  addViewOptions,
  filterOption,
  setFilterOption,
  filters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center">
        {addFilterBar && filter && (
          <DataTableFilterBar table={table} filter={filter} />
        )}
        {filterOption && setFilterOption && filters && (
          <DataTableFilterOptions
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            filters={filters}
          />
        )}
        {addViewOptions && <DataTableViewOptions table={table} />}
      </div>
      <div className="rounded-md border">
        <DataTableBody table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
