import React from "react";
import { Modal } from "@/components/Modal";
import { useAppDispatch, useModal } from "@/hooks/redux";
import { MODAL_TYPE, onClose } from "@/lib/redux/slices/modal-slice";
import { TransactionNameForm } from "@/features/trx-name/components/TrxNameForm";

export const TransactionNameModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen, type } = useModal();
  const open = isOpen && type === MODAL_TYPE.TRX_NAME;

  return (
    <Modal
      title="Create Your Transaction Name"
      description="Manage Transaction Name"
      isOpen={open}
      onClose={() => {
        dispatch(onClose());
      }}
    >
      <TransactionNameForm />
    </Modal>
  );
};
