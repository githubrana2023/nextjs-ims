import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Control, FieldValues } from "react-hook-form"
import { Input } from "./ui/input"
import { Component } from "react"

type ReuseableInputType<T extends FieldValues> = {
    control:Control<T>,
    name:string
}& Component<

export const ReuseableInput = <T extends FieldValues,>({control,name}:ReuseableInputType<T>)=>{
    return(
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    )
}