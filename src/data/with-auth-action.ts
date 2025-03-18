import { sendResponse } from "@/lib/helper"
import { auth } from "@clerk/nextjs/server"


export const withAuthCreateAction = <T,TData>(
    fn:(formValue:T,userId:string)=>Promise<ReturnType<typeof sendResponse<TData>>>
)=>{
    return async (payload:T)=>{
        const {userId} = await auth()
        if(!userId) return sendResponse(false,null,'Unauthenticated Access!')
        return await fn(payload,userId)
    }
}


export const withAuthUpdateAction = <T,TData>(
    fn:(id:string,formValue:T,userId:string)=>Promise<ReturnType<typeof sendResponse<TData>>>
)=>{
    return async (id:string,payload:T)=>{
        const {userId} = await auth()
        if(!userId) return sendResponse(false,null,'Unauthenticated Access!')
        return await fn(id,payload,userId)
    }
}

export const withAuthDeleteAction = <TData>(
    fn:(id:string,userId:string)=>Promise<ReturnType<typeof sendResponse<TData>>>
)=>{
    return async (id:string)=>{
        const {userId} = await auth()
        if(!userId) return sendResponse(false,null,'Unauthenticated Access!')
        return await fn(id,userId)
    }
}