"use client";
import Heading from "@/components/Heading";
import { pluralFormatter } from "@/lib/helper/formatters";
import { Button } from "@/components/ui/button";
import { MODAL_TYPE, onOpen } from "@/lib/redux/slices/modal-slice";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";
import { trxColumns } from "./Columns";
import { useAppDispatch } from "@/hooks/redux";
import { Trx } from "@/drizzle/types";

type Props = {
  // trxNames: {
  //   id: string;
  //   name: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  //   managementSystemId: string;
  //   variant: "BOTH" | "SOURCE" | "RECEIVE";
  //   assignReceiveBanks: {
  //     createdAt: Date;
  //     updatedAt: Date;
  //     transactionNameId: string;
  //     receiveBankAccountId: string;
  //     receiveBankAccount: BankAccount;
  //   }[];
  //   assignSourceBanks: {
  //     createdAt: Date;
  //     updatedAt: Date;
  //     transactionNameId: string;
  //     sourceBankAccountId: string;
  //     sourceBankAccount: BankAccount;
  //   }[];
  // }[];
  // bankAccounts: {
  //   id: string;
  //   label: string;
  // }[];
  data: Trx[];
};

export const TrxClient = ({ data }: Props) => {
  // const params = useParams();
  const dispatch = useAppDispatch();
  // if (trxNames.length < 1) {
  //   redirect(`${params.managementSystemId}/my-expense/trx`);
  // }

  // if (bankAccounts.length < 1) {
  //   redirect(`${params.managementSystemId}/my-expense/bank`);
  // }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={pluralFormatter(data.length, {
            singular: "Transaction",
            plural: "Transactions",
          })}
          description="Manage Transaction for your expense management"
        />
        <Button onClick={() => dispatch(onOpen(MODAL_TYPE.TRX_NAME))}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />

      <DataTable columns={trxColumns} data={data} searchKey="name" />
    </>
  );
};
