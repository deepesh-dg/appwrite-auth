import conf from "@/conf/conf";
import { Constants } from "@/conf/constants";
import { Client, Account } from "appwrite";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class AppwriteService {
    public appwriteClient = new Client();
    public account: Account;
    public cookies;

    constructor(cookies: ReadonlyRequestCookies) {
        this.appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.cookies = cookies;
        if (cookies.has(Constants.AUTH_TOKEN_NAME)) {
            this.appwriteClient.setJWT(cookies.get(Constants.AUTH_TOKEN_NAME)?.value as string);
        }
        this.account = new Account(this.appwriteClient);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite server service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async logout() {
        this.cookies.delete(Constants.AUTH_TOKEN_NAME);
        this.cookies.delete(Constants.JWT_TOKEN);
    }
}

// const appwriteService = new AppwriteService();

export default AppwriteService;
