'use server'
import { ManagementSystemFormValue } from "../schema"
import { getUserById } from "@/features/users/db/user"
import { currentUser } from "@/services/clerk"
import { getManagementSystemByUserId } from "../db/getManagementSystem"
import { db } from "@/drizzle/db"
import { managementSystemDbTable } from "@/drizzle/schema"

export const insertManagementSystemAction = async (formValue: ManagementSystemFormValue) => {
    try {
        //^ checking user authenticated or not
        const user = await currentUser()
        if (!user.userId) return {
            success: false,
            data: null,
            message: 'Unauthenticated User!'
        }

        //^ checking logged in user already registered in our db or not
        const existUser = await getUserById(user.userId)
        if (!existUser) return {
            success: false,
            data: null,
            message: 'Unauthenticated User!'
        }

        //^ if user logged in & registered in our db then checking management system exists or not under that user
        const existManagementSystem = await getManagementSystemByUserId(existUser.id)
        if (existManagementSystem) return {
            success: false,
            data: null,
            message: 'Forbidden Access!'
        }

        //^ if user logged in & registered in our db then checking management system not exists under that user
        const [newManagementSystem] = await db.insert(managementSystemDbTable).values({ ...formValue, userId: existUser.id }).returning()


        //^ if user logged in & registered in our db then checking management system not exists under that user
        if (!newManagementSystem) return {
            success: false,
            data: null,
            message: 'Failed to Create Management System!'
        }
        return {
            success: true,
            data: newManagementSystem,
            message: 'Created Successful!'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: 'Failed to Create Management System!',
            error
        }
    }
}