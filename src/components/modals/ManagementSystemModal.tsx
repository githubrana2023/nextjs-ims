"use client";
import { ManagementSystemForm } from "@/features/expense-management/management-system/components/ManagementSystemForm";
import { Modal } from "@/components/Modal";
import { useAppDispatch, useModal } from "@/hooks/redux";
import { MODAL_TYPE, onClose } from "@/lib/redux/slices/modal-slice";

const ManagementSystemModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useModal();
  const isManagementSystemModalTriggered =
    isOpen && type === MODAL_TYPE.MANAGEMENT_SYSTEM;

  const onCloseModal = () => {
    dispatch(onClose());
  };

  return (
    <Modal
      isOpen={isManagementSystemModalTriggered}
      onClose={onCloseModal}
      title="Open Your Expense Management System"
      description="Create your first management system"
    >
      <ManagementSystemForm />
    </Modal>
  );
};

export default ManagementSystemModal;
