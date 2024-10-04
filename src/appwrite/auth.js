import config from "./appwrite_config";
import {Client, Account, ID} from "appwrite"

export class AuthService {

    client = new Client();
    account;

    constructor(){ 
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({userFullName, userEmail, userPassword}){
        try {
            return await this.account.create( ID.unique(), userEmail, userPassword, userFullName);
        } 
        catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;   
        }
    }

    async userLogin({userEmail, userPassword}){
        try {
            return await this.account.createEmailPasswordSession(userEmail, userPassword);
        } 
        catch (error) {
            console.log("Appwrite service :: userLogin :: error", error);
            throw error;
        }
    }

    async userLogOut(){
        try {
            await this.account.deleteSessions();
            return true;
        } 
        catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            return false;
        }
    }

    async getCurrentSession(){ 
        try {
            return await this.account.get();   
        } 
        catch (error) {
            console.log("Appwrite service :: getCurrentSession :: error");
        }

        return null;
    }

    async verifyEmail({userId, secret}){
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error")
        }
    }

    async createEmailVerify(){
        try {
            return await this.account.createVerification('http://arshitcc-spend-sense.vercel.app/signup');
        } catch (error) {
            console.log("Appwrite service :: create verify Email :: error");
        }
    }

}

const authService = new AuthService();
export default authService