"use client";
import { useForm } from "react-hook-form";
import {
  managementSystemFormSchema,
  ManagementSystemFormValue,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  managementSystemDefaultValues,
  managementSystemInputLabel,
  managementSystemInputPlaceholder,
  managementSystemInputType,
} from "../constants";
import { useTransition } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ReuseableInput from "@/components/ReuseableInput";
import { insertManagementSystemAction } from "../actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onClose } from "@/lib/redux/slices/modal-slice";
import { useAppDispatch } from "@/hooks/redux";

export const ManagementSystemForm = () => {
  //^ hooks
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const managementSystemForm = useForm<ManagementSystemFormValue>({
    resolver: zodResolver(managementSystemFormSchema),
    defaultValues: managementSystemDefaultValues,
  });

  //^ variables
  const { control, handleSubmit } = managementSystemForm;

  const onSubmit = handleSubmit((formValue) => {
    startTransition(async () => {
      const res = await insertManagementSystemAction(formValue);

      if (res.success && res.data) {
        dispatch(onClose());
        toast.success(res.message);
        router.push(`/${res.data.id}`);
        return;
      }
      if (!res.success) {
        toast.error(res.message);
      }
    });
  });

  return (
    <div>
      <Form {...managementSystemForm}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center gap-3">
            <ReuseableInput
              control={control}
              defaultValues={managementSystemDefaultValues}
              inputType={managementSystemInputType}
              inputLabel={managementSystemInputLabel}
              inputPlaceholder={managementSystemInputPlaceholder}
              isPending={isPending}
            />
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
