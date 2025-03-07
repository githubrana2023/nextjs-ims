import NextAuth from "next-auth"

import authConfig from "@/auth.config"


import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"
import { signOut } from "./auth"

const { auth } = NextAuth(authConfig)


export default auth(async function middleware(req) {
    // Your custom middleware logic goes here
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)



    // if (isApiAuthRoute) {
    //     return
    // }

    // if (isAuthRoute) {
    //     if (isLoggedIn) {

    //         return Response.redirect(new URL(`/owner`, nextUrl))
    //     }
    //     return
    // }
    // if (!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL('/auth/login', nextUrl))
    // }
    return
})



export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};