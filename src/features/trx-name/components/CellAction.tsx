"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrxNameColumns } from "./Columns";
import { Button } from "@/components/ui/button";
import { Cable, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertModel } from "@/components/modals/alertModal";
import { useAppDispatch, useModal } from "@/hooks/redux";
import { MODAL_TYPE, onClose, onOpen } from "@/lib/redux/slices/modal-slice";
import { useSetParams } from "@/hooks/use-setParams";

interface CellActionProps {
  data: TrxNameColumns;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const { managementSystemId } = useParams();
  const [setSearchParams, searchParams] = useSetParams();
  const dispatch = useAppDispatch();
  const { isOpen, type } = useModal();
  const trxId = searchParams.get("trxId");
  const isAlertModalOpen = isOpen && type === MODAL_TYPE.ALERT && !!trxId;

  const onDelete = async () => {
    try {
      toast.success("category deleted successfully ");
    } catch (error) {
      console.log(error);
      toast.error("make sure you remove all categories using this category");
    } finally {
      dispatch(onClose());
      setSearchParams("trxId", trxId);
    }
  };

  return (
    <>
      <DropdownMenu>
        <AlertModel
          isOpen={isAlertModalOpen}
          onClose={() => {
            setSearchParams("trxId", trxId);
            dispatch(onClose());
          }}
          onConfirm={() => onDelete()}
          loading={false}
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
              router.push(
                `/${managementSystemId}/my-expense/trx-name/${data.id}`
              )
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSearchParams("trxId", data.id);
              dispatch(onOpen(MODAL_TYPE.ALERT));
            }}
          >
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/${managementSystemId}/my-expense/trx-name/${data.id}`
              );
            }}
          >
            <Cable className="mr-2 h-4 w-4 " />
            Assign
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
