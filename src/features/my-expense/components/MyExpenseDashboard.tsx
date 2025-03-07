import React from "react";
import { BankAccountList } from "./BankAccountCard";
import { bankAccountDbTable } from "@/drizzle/schema";

type MyExpenseDashboardProps = {
  bankAccounts: (typeof bankAccountDbTable.$inferSelect)[];
};
const MyExpenseDashboard = ({ bankAccounts }: MyExpenseDashboardProps) => {
  return <BankAccountList bankAccounts={bankAccounts} />;
};

export default MyExpenseDashboard;
