"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { format } from "date-fns";
import { Trx } from "@/drizzle/types";

export const trxColumns: ColumnDef<Trx>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "variant",
    header: "Variant",
  },
  {
    accessorKey: "managementSystemName",
    header: "Management System Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <span>{format(row.original.createdAt, "MMMM dd, yyyy")}</span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ row }) => (
      <span>{format(row.original.updatedAt, "MMMM dd, yyyy")}</span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
