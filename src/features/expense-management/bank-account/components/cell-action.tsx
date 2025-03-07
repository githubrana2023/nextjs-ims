"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BankNameColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertModel } from "@/components/modals/alertModal";
import { useAppDispatch, useModal } from "@/hooks/redux";
import { onClose, onOpen } from "@/lib/redux/slices/modal-slice";
import { deleteBankAccountAction } from "../actions/delete-bank-account-actions";
import { useTransition } from "react";
import { useSetParams } from "@/hooks/use-setParams";

interface CellActionProps {
  data: BankNameColumns;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const { managementSystemId } = useParams();
  const [setSearchParams, searchParams] = useSetParams();
  const [isPending, startTransaction] = useTransition();
  const dispatch = useAppDispatch();
  const { isOpen, type } = useModal();
  const bankId = searchParams.get("bankId");
  const open = isOpen && type === "alert" && !!bankId;

  const onDelete = () => {
    if (!bankId) return;

    startTransaction(async () => {
      try {
        const res = await deleteBankAccountAction(bankId, managementSystemId);
        if (res?.success) {
          toast.success(res?.message);
          return;
        }
        if (!res?.success && res?.message) {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("make sure you remove all categories using this category");
      } finally {
        dispatch(onClose());
        setSearchParams("bankId", bankId);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <AlertModel
          isOpen={open}
          onClose={() => {
            setSearchParams("bankId", bankId);
            dispatch(onClose());
          }}
          onConfirm={() => onDelete()}
          loading={isPending}
        />
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${managementSystemId}/my-expense/bank/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSearchParams("bankId", data.id);
              dispatch(onOpen("alert"));
            }}
          >
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
