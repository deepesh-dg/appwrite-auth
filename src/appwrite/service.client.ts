import conf from "@/conf/conf";
import { Constants } from "@/conf/constants";
import { Client, Account, ID } from "appwrite";
import { setCookie } from "cookies-next";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
};
type LoginUserAccount = {
    email: string;
    password: string;
};

export class AppwriteService {
    public appwriteClient = new Client();
    public account: Account;

    constructor() {
        this.appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.appwriteClient);
    }

    private async setToken() {
        try {
            const { jwt } = await this.account.createJWT();
            setCookie(Constants.JWT_TOKEN, jwt);
        } catch (error) {}
    }

    // create a new record of user inside appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
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
            const session = await this.account.createEmailSession(email, password);
            await this.setToken();
            return session;
        } catch (error) {
            throw error;
        }
    }

    async isLoggedIn() {
        return Boolean(await this.getCurrentUser());
    }

    async getCurrentUser() {
        await this.setToken();
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite client service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    loginWithGoogle() {
        this.account.createOAuth2Session(
            "google",
            new URL("/auth/login", window.location.href).href,
            new URL("/auth/login", window.location.href).href
        );
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite client service :: logout() :: " + error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;
