"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  transactionNameFormSchema,
  TransactionNameFormValue,
} from "../schemas/transaction-name";
import { Form } from "@/components/ui/form";
import ReuseableInput from "@/components/ReuseableInput";
import {
  transactionNameInputDefaultValue,
  transactionNameInputLabel,
  transactionNameInputPlaceholder,
  transactionNameInputType,
} from "../constants/transaction-name";
import ReuseableSelect from "@/components/ReuseableSelect";
import { transactionNameVariantEnum } from "@/drizzle/schema";
import { Button } from "@/components/ui/button";
import { insertTrxName } from "../actions/insertTrxName";
import { useAppDispatch } from "@/hooks/redux";
import { useParams, useRouter } from "next/navigation";

export const TransactionNameForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const trxNameForm = useForm<TransactionNameFormValue>({
    resolver: zodResolver(transactionNameFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { control, handleSubmit } = trxNameForm;

  const onSubmit = (formValue: TransactionNameFormValue) => {
    startTransition(async () => {
      const res = await insertTrxName(formValue);
      console.log(res);
    });
  };

  return (
    <Form {...trxNameForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center gap-3">
          <ReuseableInput
            control={control}
            defaultValues={transactionNameInputDefaultValue}
            inputLabel={transactionNameInputLabel}
            inputPlaceholder={transactionNameInputPlaceholder}
            inputType={transactionNameInputType}
            isPending={isPending}
          />
          <ReuseableSelect
            control={control}
            defaultValues={{
              variantId: undefined,
            }}
            selectLabel={{ variantId: "Transaction Variant" }}
            selectPlaceholder={{ variantId: "Select a Variant" }}
            data={{
              variantId: transactionNameVariantEnum.map((variant) => ({
                id: variant,
                label: variant,
              })),
            }}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
