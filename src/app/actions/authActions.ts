'use server';

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function userSignInAction({name, email, password} : {
    name: string,
    email: string,
    password: string
}){
    try {
        await signIn("credentials", {name, email, password, redirectTo: "/"})
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: "Invalid credentials"
                    }

                default:
                    return {
                        message: "An error occurred ! Somethin went wrong"
                    }
            }
        }

        throw error
        
    }
}

export async function githubSignInAction(){
    await signIn("github", {redirectTo: "/"});
}

export async function userSignOutAction(){
    await signOut({redirectTo: "/auth/signin"});
}
