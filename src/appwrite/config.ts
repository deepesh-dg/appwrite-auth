import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
    // create a new record of user inside appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // create login feature
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {}

        return false;
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.log("Appwrite client service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log("Appwrite client service :: logout() :: " + error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;
