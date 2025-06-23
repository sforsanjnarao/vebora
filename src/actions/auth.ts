"use server";

import { prismaClient } from "@/lib/prismaClient";
import { currentUser } from "@clerk/nextjs/server";


export async function onAuthenticateUser() {
    try{
        const user=await currentUser();
        if (!user) {
            return {
                status: 403
            };
      }
      const userExists= await prismaClient.user.findUnique({
        where: {
            clerkId: user.id
        },
      })

      if(userExists){
        return {
            user: userExists,
            status: 200
        };
      }
      const newUser = await prismaClient.user.create({
        data: {
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            name: user.firstName + " " + user.lastName,
            profileImage: user.imageUrl || ""
        }
      })
      if(!newUser){
        return {
            status: 500,
            messages: "Failed to create user in database",
        };
      }
        return {
            user: newUser,
            status: 201
        };

    } catch (error) {
        console.error("Error fetching user:", error);
        return {
            // isAuthenticated: false,
            status: 500
        };
    }
}