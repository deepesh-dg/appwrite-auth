import conf from "@/conf/conf";
import { Client, Databases, Account } from "appwrite";

const client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
