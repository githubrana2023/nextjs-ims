"use client";

import { CardWrapper } from "@/components/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { trxFormSchema, TrxFormValue } from "../schemas/create";
import { trxDefaultValues } from "../constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BankAccount } from "@/drizzle/types";
// import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { insertTrxAction } from "../actions/insertTrx";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";

type Props = {
  bankAccounts: { id: string; label: string }[];
  trxNames: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    managementSystemId: string;
    variant: "BOTH" | "SOURCE" | "RECEIVE";
    assignReceiveBanks: {
      createdAt: Date;
      updatedAt: Date;
      transactionNameId: string;
      receiveBankAccountId: string;
      receiveBankAccount: BankAccount;
    }[];
    assignSourceBanks: {
      createdAt: Date;
      updatedAt: Date;
      transactionNameId: string;
      sourceBankAccountId: string;
      sourceBankAccount: BankAccount;
    }[];
  }[];
};

export const TrxForm = ({ trxNames }: Props) => {
  const [selectedTrxNameId, setSelectedTrxNameId] = useState("");
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const trxForm = useForm<TrxFormValue>({
    resolver: zodResolver(trxFormSchema),
    defaultValues: {
      ...trxDefaultValues,
      managementSystemId: params.managementSystemId as string,
    },
  });

  const { control, handleSubmit } = trxForm;

  const onSubmit = handleSubmit((trxFormValue) => {
    startTransition(async () => {
      try {
        const res = await insertTrxAction(trxFormValue);

        console.log({ res });
      } catch (error) {
        console.log(error);
      }
    });
  });

  const selectedTrxName = trxNames.find(({ id }) => id === selectedTrxNameId);

  const isSource = selectedTrxName?.variant === "SOURCE";
  const isReceive = selectedTrxName?.variant === "RECEIVE";
  const isBoth = selectedTrxName?.variant === "BOTH";

  return (
    <CardWrapper
      title="Transactions Form"
      description="Keep Record Of Your Transactions"
    >
      <Form {...trxForm}>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="flex items-center justify-between gap-1">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-[4]">
                  <FormLabel>Transaction Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g. Shopping"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex-[2]">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      placeholder="e.g. 70"
                      min={1}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    rows={6}
                    className="max-h-2"
                    placeholder={`Example-
1.Fish 1kg - 150, many more items `}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    onValueChange={field.onChange}
                    placeholder="e.g. tomorrow at 3pm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="transactionNameId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                      setSelectedTrxNameId(v);
                    }}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Transaction Name" />
                    </SelectTrigger>
                    <SelectContent>
                      {trxNames.map((trxName) => (
                        <SelectItem key={trxName.id} value={trxName.id}>
                          {trxName.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedTrxName && (
            <>
              {(isSource || isBoth) && (
                <FormField
                  control={control}
                  name="sourceBankAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Source Banks</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Source Bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedTrxName &&
                              selectedTrxName.assignSourceBanks.map(
                                ({ sourceBankAccount }) => (
                                  <SelectItem
                                    key={sourceBankAccount.id}
                                    value={sourceBankAccount.id}
                                  >
                                    {sourceBankAccount.name}
                                  </SelectItem>
                                )
                              )}
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
                    <FormItem>
                      <FormLabel>Assigned Receive Banks</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Receive Bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedTrxName &&
                              selectedTrxName.assignReceiveBanks.map(
                                ({ receiveBankAccount }) => (
                                  <SelectItem
                                    key={receiveBankAccount.id}
                                    value={receiveBankAccount.id}
                                  >
                                    {receiveBankAccount.name}
                                  </SelectItem>
                                )
                              )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          <Button type="submit" disabled={isPending} className="w-full mt-3">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
