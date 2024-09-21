'use server'
import prisma from "@/db";
import { auth } from "@/lib/auth";
// import { revalidatePath } from "next/cache";

export async function updateUserToAdminAction(){
    
    const session = await auth();

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

export async function getUserEventsAction(){
    try {
        const session = await auth();
        if(!session ||!session.user?.email){
            throw new Error("Unauthorized");
        }

        const userWithEvents = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                event: true
            }
        });

        if(!userWithEvents) {
            return {
                success: false,
                message: "Error fetching the Events"
            }
        }

        return {
            success: true,
            events: userWithEvents.event,
            message: "Fetched user events successfully",
        }
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to get user events",
        }
    }
}