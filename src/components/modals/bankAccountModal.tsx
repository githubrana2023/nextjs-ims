"use client";
import { Modal } from "@/components/Modal";
import { useAppDispatch, useModal } from "@/hooks/redux";
import { MODAL_TYPE, onClose } from "@/lib/redux/slices/modal-slice";
import { BankAccountForm } from "@/features/bank-account/components/BankAccountForm";

export const BankAccountModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useModal();
  const isManagementSystemModalTriggered =
    isOpen && type === MODAL_TYPE.BANK_ACCOUNT;

  const onCloseModal = () => {
    dispatch(onClose());
  };

  return (
    <Modal
      isOpen={isManagementSystemModalTriggered}
      onClose={onCloseModal}
      title="Create Your Bank Account"
      description="Create Bank"
    >
      <BankAccountForm />
    </Modal>
  );
};
