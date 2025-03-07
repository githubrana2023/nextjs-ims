"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";

export type BankNameColumns = {
  id: string;
  name: string;
  balance: string;
  managementSystemId: string;
  managementSystemName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const bankNameColumns: ColumnDef<BankNameColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "managementSystemName",
    header: "Management System Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div>{format(row.original.createdAt, "MMMM dd, yyyy")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ row }) => (
      <div>{format(row.original.updatedAt, "MMMM dd, yyyy")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
