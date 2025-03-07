"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "../ui/button";
interface AlertModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const AlertModel = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModelProps) => {
  const [isMounded, setIsMounded] = useState(false);

  useEffect(() => {
    setIsMounded(true);
  }, []);

  if (!isMounded) {
    return null;
  }

  return (
    <Modal
      title="Are you sure you?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
