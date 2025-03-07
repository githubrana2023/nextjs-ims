import { UserRole } from "@/drizzle/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";


const client = await clerkClient()

type User = {
    id: string;
    name: string;
    clerkUserId: string;
    phone: string;
    email: string;
    role: UserRole
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}



export const currentUser = async () => {
    const { userId, sessionClaims, redirectToSignIn } = await auth()

    return {
        userId: sessionClaims?.dbId,
        clerkUserId: userId,
        role: sessionClaims?.role,
        phone: sessionClaims?.phone,
        redirectToSignIn
    }
}




export const syncClerkUserMetadata = async (user: User) => {

    return client.users.updateUserMetadata(user.clerkUserId, {
        publicMetadata: {
            dbId: user.id,
            role: user.role,
            phone: user.phone,
        }
    })
}