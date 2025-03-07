"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import React from "react";
import { TrxNameColumns, trxNameColumns } from "./Columns";
import { useAppDispatch } from "@/hooks/redux";
import { MODAL_TYPE, onOpen } from "@/lib/redux/slices/modal-slice";
import { pluralFormatter } from "@/lib/helper/formatters";

interface TrxNamesPageClientProps {
  data: TrxNameColumns[];
}

export const TrxNamesPageClient = ({ data }: TrxNamesPageClientProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={pluralFormatter(data.length, {
            singular: "Transaction Name",
            plural: "Transactions Name",
          })}
          description="Manage Transaction Name for your expense management"
        />
        <Button onClick={() => dispatch(onOpen(MODAL_TYPE.TRX_NAME))}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />

      <DataTable columns={trxNameColumns} data={data} searchKey="name" />
    </>
  );
};
