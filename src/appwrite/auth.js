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

    async createAccount({userEmail, userPassword}){
        try {
            return await this.account.create( ID.unique(), userEmail, userPassword, '0');
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

    async updateBalance(wallet_balance){
        try {
            await this.account.updateName(wallet_balance);
            return true;
        } catch (error) {
            console.log("Appwrite service :: updateBalance (FAKE) :: error", error);
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

}

const authService = new AuthService();
export default authService