import { hash } from 'bcryptjs';
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zod";

import Github from "next-auth/providers/github";
import prisma from "@/db";
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Github({
            async profile(profile){
                let user = await prisma.user.findUnique({
                    where: {
                        email : profile.email || ""
                    }
                });
                

                if (!user){
                    const dummyPassword = await hash("oauth_user", 10); 
                    user = await prisma.user.create({
                        data: {
                            name: profile.name || "",
                            email: profile.email || "",
                            password: dummyPassword,
                        }
                    })
                }

                return {
                    id: profile.id as unknown as string,
                    name: profile.name,
                    email: profile.email,
                    isAdmin: false,
                }
            }
        }),

        Credentials({
            credentials: {
                name: {label: "Name", type: "text", placeholder: "Name"},

                email: {label: "Email", type: "email", placeholder: "Email"},

                password: {label: "Password", type: "password", placeholder: "Password"},
            },

            async authorize(credentials){
                let user = null;


                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success){
                    console.error("Invalid credentials", parsedCredentials.error.errors)
                    return null;
                }
                
                const { email } = parsedCredentials.data;

                user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                

                if (!user){ 
                    user = await prisma.user.create({
                        data: {
                            name: parsedCredentials.data.name,
                            email: parsedCredentials.data.email,
                            password: await hash(parsedCredentials.data.password, 10),
                        }
                    })
                }
                console.log(user);
                

                return {
                    id: String(user.id),
                    name: user.name, 
                    email: user.email,
                    isAdmin: user.isAdmin,
                };
            }
        })
    ],

    callbacks: {
        authorized({ request: {nextUrl} , auth}) {

            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl;

            const role = auth?.user.isAdmin || false;

            if(pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }

            if(pathname.startsWith("/page2") && role !== true) {
                return Response.redirect(new URL('/', nextUrl));
            }

            return !!auth;
        },

        async jwt({token, user , trigger, session}) {
            
            if(user) {
                token.id = user.id as string;
                token.isAdmin = user.isAdmin;
                token.name = user.name || "user";
                token.email = user.email || "user@example.com";
            }

            if(trigger === "update" && session){
                token = { ...token , ...session}
            }

            return token;
        },

        async session({ session, token}) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            session.user.name = token.name
            session.user.email = token.email;

            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    }
})
