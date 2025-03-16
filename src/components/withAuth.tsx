import { ComponentType } from "react"
import { redirect } from "next/navigation"
import { auth} from "@clerk/nextjs/server"




export type WithAuthProps = {
    userId : NonNullable<Awaited<ReturnType<typeof auth>>['userId']>
}

export const withAuth = <P extends WithAuthProps>(
    WrappedComponent: ComponentType<P>
) => {
    return async (props: Omit<P, keyof WithAuthProps>) => {
        const session = await auth()
        const { userId } = session

        if (!userId) {
            redirect('/sign-in')
        }

        return <WrappedComponent {...(props as P)} userId={userId}/>
    }
}