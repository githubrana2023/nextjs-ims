"use client";

import { bankAccountDbTable, transactionNameDbTable } from "@/drizzle/schema";
import { AssignBankForm } from "@/features/expense-management/assign-bank/components/assign-bank-form";
import React from "react";

type TrxNameDetailsClientProps = {
  currentTrxName: typeof transactionNameDbTable.$inferSelect | undefined;
  bankAccounts: (typeof bankAccountDbTable.$inferSelect)[];
};
const TrxNameDetailsClient = ({
  currentTrxName,
  bankAccounts,
}: TrxNameDetailsClientProps) => {
  return (
    <AssignBankForm
      currentTrxName={currentTrxName}
      banksAccounts={bankAccounts}
    />
  );
};

export default TrxNameDetailsClient;
