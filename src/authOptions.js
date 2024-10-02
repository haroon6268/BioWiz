import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
};
export default authOptions;
