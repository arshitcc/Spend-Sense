import config from "./appwrite_config";
import { Client, Account, Databases } from "appwrite";

export class User {

    client = new Client();
    account = new Account(this.client);
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
    }

    async addUser(data) {
        try {
            
            const user = await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteUsersCollectionId, 
                data.userId, 
                { 
                    ...data,
                }
            );

            return user;
        } catch (error) {
            console.error("Error adding user: ", error);
            throw error;
        }
    }

    async removeUser(userId) {
        try {
            
            await this.account.delete(userId);

            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                userId
            );

            return true;

        } catch (error) {
            console.error("Error removing user: ", error);
            throw error;
        }
    }

    async getUser(userId) {
        try {

            const userDocument = await this.databases.getDocument(
                config.appwriteDatabaseId, 
                config.appwriteUsersCollectionId, 
                userId
            );

            return {
                ...userDocument
            };
        } catch (error) {
            console.error("Error getting user: ", error);
            throw error;
        }
    }

    async updateEmail({userId, newEmail}) {
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteUsersCollectionId, 
                userId, 
                { userEmail: newEmail }
            );
        } catch (error) {
            console.error("Error updating email: ", error);
            throw error;
        }
    }

    async updatePhone({userId, newPhone}) {
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteUsersCollectionId, 
                userId, 
                { phone: newPhone }
            );
        } catch (error) {
            console.error("Error updating phone: ", error);
            throw error;
        }
    }

    async updateBalance({userId, newBalance}){
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteUsersCollectionId,
                userId,
                { balance : newBalance }
            )
        } catch (error) {
            console.error("Error updating Balance: ", error);
            throw error;
        }
    }
}

const user = new User();
export default user
