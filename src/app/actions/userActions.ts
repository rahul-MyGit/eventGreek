'use server'
import prisma from "@/db";
import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";

export async function updateUserToAdminAction(){
    console.log('inside action');
    
    const session = await auth();
    console.log("session from action", session);
    

    if(!session || !session.user?.email){
        throw new Error("Unauthorized");
    }

    try {
        await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                isAdmin: true
            }
        });

        return {
            success: true,
            message: "User updated to admin successfully",
        }
    } catch (error) {
        console.log("Failed to update the user: ", error);
        return {
            success: false,
            message: "Failed to update the user",
        }
    }
}