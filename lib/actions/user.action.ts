'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"

export const signIn = async() => {
    try {
        //Mutation/Database
    } catch (error) {
        console.error('Error',error)
    }
}
export const signUp = async(userData:SignUpParams) => {
    try {
        const {email, password, firstName, lastName} = userData 
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            userData.email,
            userData.password,
            `${firstName} ${lastName}`
        );
        
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("my-custom-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
    } catch (error) {
        console.error('Error',error)
    }
}


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }