import React from "react";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Circle, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import fetchWrapper from "@/context/fetch-wrapper";
import { MAN_API_URL } from "@/context/auth-man";
import { VerifiedUser } from "@/types";

/**
 * The possible formats of a column besides the defaults specified in your interface.
 */
type ColumnFormat = "currency" | "user" | "status";
const token = localStorage.getItem("man_auth");

const handleDeleteUser = async(id: any) => {
  const options = {
    method: "DELETE",
    redirect: 'follow',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await fetchWrapper(
    `${MAN_API_URL}/users/${id}`,
    options
  );
  const status = response.status;
  if (status == 204) {
    window.alert("Deletion successful")
    window.location.reload();
  }
}


export class DataTableColumns<Columns, ColumnHeader> {
  /**
   * An array of columns in the data table.
   * @type {ColumnDef<Columns>[]}
   */
  columns: ColumnDef<Columns>[];
  /**
   * A array of actions that can be performed on each entry in a data table.
   * @type {React.FunctionComponentElement<any>[]}
   */
  actions: React.FunctionComponentElement<any>[];

  /**
   * Initialize data table columns based on the provided column headers.
   * @class
   * @param {ColumnHeader[]} columnHeaders - An array of column headers. Should match your Columns interface
   * @classdesc To use this class, you must declare an interface that represent the shape of your data, and a
   * type the reprsent the possible headers for your columns. Both must match exactly.
   * @example
   * interface SampleColumns {
   *   id: string;
   *   name: string;
   *   email: string;
   *   hoursWorked: number;
   * }
   * @example
   * type SampleColumnHeader = "name" | "email" | "hoursWorked";
   */
  constructor(columnHeaders: ColumnHeader[]) {
    try {
      this.columns = [
        ...columnHeaders.map((header) => ({
          id: header as string,
          accessorKey: header,
          header: this.toHeader(header),
        })),
      ];
      this.actions = [];
    } catch {
      throw new Error("Could not create data table columns.");
    }
  }
  /**
   * Returns the columns.
   * @returns Columns.
   */
  getColumns() {
    return this.columns;
  }
  /**
   * Format a column header in camel case as a header in title case
   * @param {ColumnHeader} header - The header to be formatted
   * @returns The header in title case
   */
  toHeader(header: ColumnHeader): string {
    const data = header as string;
    let result = "";
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      if (i == 0) {
        result += char.toUpperCase();
        continue;
      }
      if (char == char.toUpperCase() && i != 0) {
        result += " " + char;
        continue;
      }
      result += char;
    }
    return result;
  }
  /**
   * Formats a specified column based on the format provided
   * @param {ColumnHeader} header - The header to be formatted
   * @param {ColumnFormat} format - The new format for the header
   * @returns this object
   */
  formatColumn(header: ColumnHeader, format: ColumnFormat) {
    // Saving current columns
    let tempColumns = this.columns;
    try {
      const headerString = header as string;
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].id == headerString) {
          if (format == "currency") {
            this.columns[i].cell = function ({ row }) {
              const amount = parseFloat(row.getValue("amount"));
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(amount);

              return React.createElement(
                "div",
                { className: "text-right font-medium" },
                formatted
              );
            };
          } else if (format == "user") {
            this.columns[i].cell = function ({ row }) {
              const { name, email, avatar }: any =
                row.getValue("residentAssistant");
              return React.createElement(
                "div",
                { className: "flex space-x-2" },
                avatar,
                React.createElement(
                  "div",
                  { className: "flex flex-col justify-center" },
                  React.createElement("h1", { className: "text-sm" }, name),
                  React.createElement(
                    "p",
                    { className: "text-sm text-muted-foreground" },
                    email
                  )
                )
              );
            };
          } else if (format == "status") {
            this.columns[i].cell = function ({ row }) {
              const status = row.getValue("status");
              if (status == "Clocked In") {
                return React.createElement(
                  Badge,
                  { variant: "outline" },
                  React.createElement(Circle, {
                    className: "fill-primary stroke-none h-2 w-2 mr-1",
                  }),
                  status as string
                );
              } else if (status == "Clocked Out" || status == "Pending") {
                return React.createElement(
                  Badge,
                  { variant: "outline" },
                  React.createElement(Circle, {
                    className: "fill-muted-foreground stroke-none h-2 w-2 mr-1",
                  }),
                  status as string
                );
              }
            };
          }
        }
      }
    } catch {
      // Restoring columns
      this.columns = tempColumns;
      throw new Error("Could not format column");
    }
    return this;
  }
  /**
   * Adds an actions column to the data table
   * @returns this object
   */
  addActionColumn() {
    // Saving current columns
    let tempColumns = this.columns;
    try {
      let actionColumn: ColumnDef<Columns> = {
        id: "actions",
        cell: ({row}) => {
          const data:any = row.original;
          const actionDropdown = React.createElement(
            DropdownMenu,
            null,
            React.createElement(
              DropdownMenuTrigger,
              { asChild: true },
              React.createElement(
                Button,
                { variant: "ghost", className: "h-8 w-8 p-0" },
                React.createElement(
                  "span",
                  { className: "sr-only" },
                  "Open menu"
                ),
                React.createElement(MoreHorizontal, { className: "h-4 w-4" })
              )
            ),
            React.createElement(
              DropdownMenuContent,
              { align: "end" },
              React.createElement(DropdownMenuLabel, null, "Actions"),
              React.createElement(
                DropdownMenuItem,
                {onClick: () => handleDeleteUser(data.id)},
                "Delete user account"
              ),
            )
          );
          return actionDropdown;
        },
      };
      this.columns.push(actionColumn);
    } catch {
      // Restoring columns
      this.columns = tempColumns;
      throw new Error("Could not add action column");
    }
    return this;
  }

  /**
   * Adds a new possible for the data table entries
   * @param label - the label for the action
   * @param actionHandler - The callback function to be executed when the action is triggered
   * @returns this object
   */
  // addAction(label: string, actionHandler?: () => void) {
  //   // Saving current actions
  //   let tempActions = this.actions;
  //   try {
  //     let newAction = React.createElement(
  //       DropdownMenuItem,
  //       { onClick: console.log(data) },
  //       label
  //     );
  //     this.actions.push(newAction);
  //   } catch {
  //     // Restoring actions
  //     this.actions = tempActions;
  //     throw new Error(`Could not add ${label} action`);
  //   }
  //   return this;
  // }
  /**
   * Makes the specified column header sortable, asc or desc.
   * @param header - The header to make sortable.
   * @returns this object
   */
  makeSortable(header: ColumnHeader) {
    // Saving current columns
    let tempColumns = this.columns;
    try {
      const headerString = header as string;
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].header == headerString) {
          this.columns[i].header = ({ column }) =>
            React.createElement(DataTableColumnHeader, {
              column: column as Column<unknown, unknown>,
              title: this.toHeader(header),
            });
        }
      }
    } catch {
      // Restoring columns
      this.columns = tempColumns;
      throw new Error(`Could not make ${header} sortable`);
    }
    return this;
  }
  /**
   * Add a column that makes the data entries selectable.
   * @returns this object
   */
  addSelectColumn() {
    // Saving current columns
    let tempColumns = this.columns;

    try {
      let selectColumn: ColumnDef<Columns> = {
        id: "select",
        header: ({ table }) =>
          React.createElement(Checkbox, {
            checked:
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate"),
            onCheckedChange: (value) =>
              table.toggleAllPageRowsSelected(!!value),
            "aria-label": "Select all",
          }),
        cell: ({ row }) =>
          React.createElement(Checkbox, {
            checked: row.getIsSelected(),
            onCheckedChange: (value) => row.toggleSelected(!!value),
            "aria-label": "Select row",
          }),
      };
      this.columns = [selectColumn, ...this.columns];
    } catch {
      // Restoring columns
      this.columns = tempColumns;
      throw new Error("Could not add a select column");
    }
    return this;
  }
}
