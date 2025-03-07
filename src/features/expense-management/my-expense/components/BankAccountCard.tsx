import { bankAccountDbTable } from "@/drizzle/schema";
import { formatter } from "@/lib/helper/formatters";
import React from "react";

type Props = {
  bankAccounts: (typeof bankAccountDbTable.$inferSelect)[];
};

export const BankAccountList = ({ bankAccounts }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {bankAccounts.map((bankAccount) => (
        <BankAccountItem bankAccount={bankAccount} key={bankAccount.id} />
      ))}
    </div>
  );
};

export const BankAccountItem = ({
  bankAccount,
}: {
  bankAccount: typeof bankAccountDbTable.$inferSelect;
}) => {
  return (
    <div className="flex items-center justify-between border-dashed border border-gray-500 shadow-md space-y-1 rounded-md p-3 min-w-28">
      <div className="">
        <h1 className="font-bold text-lg">{bankAccount.name}</h1>
        <p className="text-xs font-thin text-gray-500">Current Balance</p>
        <span className="font-bold text-2xl">
          {formatter.format(Number(bankAccount.balance))}
        </span>
      </div>
    </div>
  );
};
