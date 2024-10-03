import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
        session: ({ session, token }) => {
            return session;
        },
        jwt: ({ token, user }) => {
            return token;
        },
    },
};
export default authOptions;
