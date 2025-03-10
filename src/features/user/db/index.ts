import { db } from "@/drizzle/db"
import { usersTable } from "@/drizzle/schema"
import { _log } from "@/lib/helper/send-response"
import { eq } from "drizzle-orm"


export const getUserById = async (id:string) => {
    try {
        return await db.query.usersTable.findFirst({where:eq(usersTable.id,id)})
    } catch (error) {
        _log(error)
    }
}

export const getUserByEmail = async (email:string) => {
    try {
        return await db.query.usersTable.findFirst({where:eq(usersTable.email,email)})
    } catch (error) {
        _log(error)
    }
}