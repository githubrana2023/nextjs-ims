import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

import { UserRole } from "@/features/user/types"

declare module "next-auth" {
    i
    interface Session {
        user: {
            id:string;
            email:string;
            role:UserRole;
        } & DefaultSession["user"]
      }
  }

declare module "next-auth/jwt" {
    interface JWT {
        id: sting;
        email: string;
        role: UserRole;
    }
}