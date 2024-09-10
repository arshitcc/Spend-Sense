const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTransactionsCollectionId : String(import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID),
    appwriteUsersCollectionId : String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
}

export default config