"use client";
import { TransactionNameModal } from "@/components/modals/transaction-name-modal";
import ManagementSystemModal from "@/components/modals/ManagementSystemModal";
import { BankAccountModal } from "@/components/modals/bankAccountModal";
// import { StoreModal } from ".";

export const ModalProvider = () => {
  return (
    <>
      <ManagementSystemModal />
      <BankAccountModal />
      <TransactionNameModal />
    </>
  );
};
