import { sendResponse } from "@/lib/helper"
import { auth } from "@clerk/nextjs/server"
import { Schema } from "zod"


export const withAuthCreateAction = <T, TData = unknown>(
    schema: Schema<T>,
    fn: (payload: T, userId: string) => Promise<ReturnType<typeof sendResponse<TData>>>
) => {
    return async (formValue: T) => {
        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')

        const validation = schema.safeParse(formValue)
        if (!validation.success) return sendResponse(false, null, 'Invalid Fields!')

        return await fn(formValue, userId)
    }
}


type FnArg<T> = { id: string, currentStoreId: string, userId: string, payload: T }

export const withAuthUpdateAction = <T, TData = unknown>(
    schema: Schema<T>,
    fn: ({
        id,
        currentStoreId,
        userId,
        payload
    }: FnArg<T>) => Promise<ReturnType<typeof sendResponse<TData>>>
) => {
    return async (id: string, currentStoreId: string, payload: T) => {
        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')

        const validation = schema.safeParse(payload)
        if (!validation.success) return sendResponse(false, null, 'Invalid Fields!')

        return await fn({ id, currentStoreId, userId, payload })
    }
}


export const withAuthDeleteAction = <TData>(
    fn: (id: string, currentStoreId: string, userId: string) => Promise<ReturnType<typeof sendResponse<TData>>>
) => {
    return async (id: string, currentStoreId: string) => {
        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')
        return await fn(id, currentStoreId, userId)
    }
}

export type WithAuthCreateActionArgType<T> = Parameters<typeof withAuthCreateAction<T>>[number]
export type WithAuthUpdateActionArgType<T> = Parameters<typeof withAuthUpdateAction<T>>[number]
export type WithAuthDeleteActionArgType = Parameters<typeof withAuthDeleteAction>[number]