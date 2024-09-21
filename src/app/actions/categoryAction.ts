'use server'

import prisma from "@/db";

export async function getCategoriesAction(){
    try {
        const categories = await prisma.category.findMany();
        
        return {
            success: true,
            data: categories
        }
        
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            messaeg: "Failed to get categories"
        }
    }

}

export async function getAllEventAction(id: string){
    try {
        const event = await prisma.event.findMany({
            where: {
                categoryId: parseInt(id)
            },
            include: {
                category: true
            }
        });
        
        if(event) {
            return {
                success: true,
                data: event
            }
        }
        
        return {
            success: false,
            messaeg: "No event found"
        }
        
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            messaeg: "Failed to get event"
        }
    }
}