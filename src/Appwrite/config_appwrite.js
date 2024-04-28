import config from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class DBService{
    client =new Client();
    db;
    storage;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.db=new Databases(this.client)
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,img,status,userId}){
        try {
            return await this.db.createDocument(config.appwriteDBId,config.appwriteCollectionId,slug,{
                title,
                content,
                img,
                status,
                userId
            })
        } catch (error) {
            console.log("Error :: Config Service :: createPost",error);
        }
    }

    async updatePost(slug,{title,content,img,status}){
        try {
            return await this.db.updateDocument(config.appwriteDBId,appwriteCollectionId,slug,{
                title,
                content,
                img,
                status
            })
        } catch (error) {
            console.log("Error :: Config Service :: updatePost",error);
        }
    }

    async deletePost(slug){
        try {
            await this.db.deleteDocument(config.appwriteDBId,appwriteCollectionId,slug)
            return true;
        } catch (error) {
            console.log("Error :: Config Service :: deletePost",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.db.getDocument(config.appwriteDBId,config.appwriteCollectionId,slug);
            
        } catch (error) {
            console.log("Error :: Config Service :: getPost",error);
        }

        return false;
    }

    async listPost(queries=[Query.equal("status","active")]){
        try {
            return await this.db.listDocuments(config.appwriteDBId,config.appwriteCollectionId,queries,100,0);
        } catch (error) {
            console.log("Error :: Config Service :: listPost",error);
        }
        return false;
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file);
        } catch (error) {
            console.log("Error :: Config Service :: uploadFile",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketId,fileId)
            return true;
        } catch (error) {
            console.log("Error :: Config Service :: deleteFile",error);
        }
        return false
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId,fileId)
    }

    
}

const DBservice=new DBService();
export default DBservice;