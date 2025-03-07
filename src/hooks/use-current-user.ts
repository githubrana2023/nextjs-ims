import { useSession } from "@clerk/nextjs"


export const useCurrentUser = () => {
    const { session } = useSession()
    return session?.user
}