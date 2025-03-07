"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import React from "react";
import { BankNameColumns, bankNameColumns } from "./columns";
import { useAppDispatch } from "@/hooks/redux";
import { MODAL_TYPE, onOpen } from "@/lib/redux/slices/modal-slice";
import { pluralFormatter } from "@/lib/helper/formatters";

interface BankNameClientProps {
  data: BankNameColumns[];
}

export const BankAccountClient = ({ data }: BankNameClientProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={pluralFormatter(data.length, {
            singular: "Bank Name",
            plural: "Banks Name",
          })}
          description="Manage Bank Name for your expense management"
        />
        <Button onClick={() => dispatch(onOpen(MODAL_TYPE.BANK_ACCOUNT))}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />

      <DataTable columns={bankNameColumns} data={data} searchKey="name" />
    </>
  );
};
