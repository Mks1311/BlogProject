import { get } from "react-hook-form";
import config from "../config/config.js";

import { Client,Account,ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account=new Account(this.client);
    }

    async createAccount ({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique() ,email,password,name);
            if(userAccount){
                return this.LogIn({email,password})
            }
            return userAccount;
        }catch(error){
            console.log("Error :: Appwrite Service :: createAccount",error);
        }
    }

    async LogIn({email,password}){
        try{
            await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            console.log("Error :: Appwrite Service :: LogIn",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error :: Appwrite Service :: getCurrentUser",error);
        }
        return null;
    }

    async LogOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error :: Appwrite Service :: LogOut",error);
        }
    }

}

const authService= new AuthService();

export default authService;

