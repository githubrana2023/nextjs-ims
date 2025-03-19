import { sendResponse } from "@/lib/helper"
import { auth } from "@clerk/nextjs/server"


export const withAuthCreateAction = <T, TData>(
    fn: (formValue: T, userId: string) => Promise<ReturnType<typeof sendResponse<TData>>>
) => {
    return async (payload: T) => {
        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')
        return await fn(payload, userId)
    }
}


export const withAuthUpdateAction = <T, TData>(
    fn: (id: string, formValue: T, userId: string) => Promise<ReturnType<typeof sendResponse<TData>>>
) => {
    return async (id: string, payload: T) => {
        const { userId } = await auth()
        if (!userId) return sendResponse(false, null, 'Unauthenticated Access!')
        return await fn(id, payload, userId)
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

export type WithAuthCreateActionType = Parameters<typeof withAuthCreateAction>[number]
export type WithAuthDeleteActionType = Parameters<typeof withAuthDeleteAction>[number]
export type WithAuthUpdateActionType = Parameters<typeof withAuthUpdateAction>[number]