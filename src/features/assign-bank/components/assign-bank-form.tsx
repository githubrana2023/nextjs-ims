"use client";

import { assignBankAction } from "@/features/assign-bank/actions/assign";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { bankAccountDbTable, transactionNameDbTable } from "@/drizzle/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { assignBankFormSchema, AssignBankFormValue } from "../schema";
import toast from "react-hot-toast";
import { CardWrapper } from "@/components/CardWrapper";

type AssignBankFormProps = {
  currentTrxName: typeof transactionNameDbTable.$inferSelect | undefined;
  banksAccounts: (typeof bankAccountDbTable.$inferSelect)[];
};

export const AssignBankForm = ({
  banksAccounts,
  currentTrxName,
}: AssignBankFormProps) => {
  const isSource = currentTrxName?.variant === "SOURCE";
  const isReceive = currentTrxName?.variant === "RECEIVE";
  const isBoth = currentTrxName?.variant === "BOTH";
  // !Hooks
  const [isPending, startTransition] = useTransition();
  const [selectedBankAccountId, setSelectedBankAccountId] = useState("");
  const assignBankForm = useForm<AssignBankFormValue>({
    resolver: zodResolver(assignBankFormSchema),
    defaultValues: {
      sourceBankAccountId: "",
      receiveBankAccountId: "",
      transactionNameId: currentTrxName?.id,
    },
  });

  const { control, handleSubmit } = assignBankForm;

  // if(!currentTrxName)

  const onSubmit = handleSubmit((assignBankFormValue) => {
    startTransition(async () => {
      try {
        console.log("clicked");
        const res = await assignBankAction(assignBankFormValue);

        if (res?.success) {
          assignBankForm.reset();
          toast.success(res.message);
        }
        if (!res?.success && res?.message) {
          toast.error(res?.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
  //! assets

  const receiveToBanks = banksAccounts.filter(
    (account) => account.id !== selectedBankAccountId
  );

  return (
    <CardWrapper
      title={`Assign Bank To Transaction Name (${currentTrxName?.name})`}
      description="Give access to your transaction name to add & deduct money"
    >
      <Form {...assignBankForm}>
        <form onSubmit={onSubmit} className="flex flex-col items-start gap-2">
          {(isSource || isBoth) && (
            <FormField
              control={control}
              name="sourceBankAccountId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Source Bank</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedBankAccountId(value);
                        field.onChange(value);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Source Bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banksAccounts.map((account) => (
                          <SelectItem value={account.id} key={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {(isReceive || isBoth) && (
            <FormField
              control={control}
              name="receiveBankAccountId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Receive To</FormLabel>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Source Bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {receiveToBanks.map((account) => (
                          <SelectItem value={account.id} key={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button disabled={isPending} type="submit">
            Assign
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
