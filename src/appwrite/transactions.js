import config from "./appwrite_config";
import { Client, Databases, Query, ID } from "appwrite";
 
export class Transactions{

    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
    }

    async addTransaction({userId, date, amount, mode, category, isRecurring, message, remaining_balance }){

        try {
            const transaction_id = ID.unique();
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteTransactionsCollectionId,
                transaction_id,
                {
                    userId,
                    transaction_id,
                    amount,
                    mode,
                    category,
                    isRecurring,
                    message,
                    date,
                    remaining_balance
                }
            )
        } catch (error) {
            console.log('Appwrite Error : createTransaction : ', error);
        }
    }

    async viewTransactions(userId, {queries}){

        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteTransactionsCollectionId,
                [
                    Query.equal('userId', userId),
                    Query.limit(queries?.limit || 10),
                    Query.offset(queries?.offset || 0), 
                ]
            )
        } catch (error) {
            console.log('Appwrite Error : viewTransactions : ', error);
        }
    }

    async getTransaction(transaction_id){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteTransactionsCollectionId,
                [
                    Query.equal('transaction_id',transaction_id)
                ]
            )
        } catch (error) {
            console.log('Appwrite Error : getTransaction : ', error);
        }
    }

    async removeTransaction(transaction_id){

        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteTransactionsCollectionId,
                transaction_id
            )
            return true;
        } catch (error) {
            console.log('Appwrite Error : removeTransaction : ', error);
        }
    }

}

const transactions = new Transactions();
export default transactions