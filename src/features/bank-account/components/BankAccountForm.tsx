"use client";

import { useAppDispatch, useModal } from "@/hooks/redux";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  bankAccountFormSchema,
  BankAccountFormValue,
} from "../schemas/bank-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BankAccountDefaultValues,
  BankAccountInputLabel,
  BankAccountInputPlaceholder,
  BankAccountInputType,
} from "../constants/bank-account-constants";
import { insertBankAccount } from "../actions/insert-bank-account-actions";
import ReuseableInput from "@/components/ReuseableInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { BankAccount } from "@/drizzle/types";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MODAL_TYPE, onClose, onOpen } from "@/lib/redux/slices/modal-slice";
import { updateBankAccountAction } from "../actions/update-bank-account-action";
import { AlertModel } from "@/components/modals/alertModal";
import Heading from "@/components/Heading";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { deleteBankAccountAction } from "../actions/delete-bank-account-actions";

type BankAccountFormProps = {
  title?: string;
  description?: string;
  initialBankAccount?: BankAccount;
};
export const BankAccountForm = ({
  initialBankAccount,
  title,
  description,
}: BankAccountFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const { isOpen, type } = useModal();
  const open = isOpen && type === MODAL_TYPE.ALERT;
  const redirectUrl = `/${params.managementSystemId}/my-expense/bank`;

  const bankAccountForm = useForm({
    resolver: zodResolver<BankAccountFormValue>(bankAccountFormSchema),
    defaultValues: initialBankAccount
      ? {
          name: initialBankAccount.name,
          balance: Number(initialBankAccount.balance),
        }
      : {
          name: "",
          balance: 0,
        },
  });

  const { control, handleSubmit } = bankAccountForm;

  const onInsertBankAccount = async (formValue: BankAccountFormValue) => {
    const res = await insertBankAccount(formValue);
    console.log(res);
  };

  const onUpdateBankAccount = async (
    formValue: BankAccountFormValue,
    bankId: (typeof params)[number],
    managementSystemId: (typeof params)[number]
  ) => {
    const res = await updateBankAccountAction(
      formValue,
      bankId,
      managementSystemId
    );

    console.log(res);
  };

  const onDelete = async () => {
    try {
      const res = await deleteBankAccountAction(
        params.bankId,
        params.managementSystemId
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("make sure you remove all categories using this category");
    } finally {
      dispatch(onClose());
    }
  };

  const onSubmit = handleSubmit((formValue) => {
    startTransition(async () => {
      if (initialBankAccount) {
        await onUpdateBankAccount(
          formValue,
          params.bankId,
          params.managementSystemId
        );
      } else {
        await onInsertBankAccount(formValue);
      }
    });
  });

  return (
    <>
      {initialBankAccount && (
        <>
          <AlertModel
            isOpen={open}
            onClose={() => dispatch(onClose())}
            onConfirm={onDelete}
            loading={false}
          />
          <div className="flex items-center justify-between">
            <Heading
              title={title as string}
              description={description as string}
            />
            {initialBankAccount && (
              <Button
                variant="destructive"
                disabled={false}
                size="sm"
                onClick={() => dispatch(onOpen(MODAL_TYPE.ALERT))}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Separator />
        </>
      )}
      <Form {...bankAccountForm}>
        <form onSubmit={onSubmit}>
          <div className="w-full max-w-96 flex flex-col justify-center gap-3">
            {initialBankAccount ? (
              <div className="w-full max-w-80">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{BankAccountInputLabel.name}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={BankAccountInputPlaceholder.name}
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{BankAccountInputLabel.balance}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={BankAccountInputPlaceholder.balance}
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <ReuseableInput
                control={control}
                defaultValues={BankAccountDefaultValues}
                inputLabel={BankAccountInputLabel}
                inputPlaceholder={BankAccountInputPlaceholder}
                inputType={BankAccountInputType}
                isPending={isPending}
              />
            )}

            <Button type="submit" disabled={isPending}>
              {initialBankAccount ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
