import { NextAuthOptions } from "next-auth";
import prisma from "../../../../prisma/db";
import  CredentialsProvider   from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import role from "../../../../types/next-auth.d";





const options: NextAuthOptions =
{
    providers: [  
        CredentialsProvider ({
            name: 'Username and Password',
            id: "password",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username..." },
                password: {  label: "Password", type: "password" }
            },
            

            authorize: async (credentials) => {
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials!.username
                    }
                })

                if(!user)
                {
                    return null;
                }   


                const match = await bcrypt.compare(credentials!.password, user.password);

                if(match)
                {
                    return user
                }
                else
                {
                    return null;
                }

            }



        }),
     ],

     callbacks: {
        async jwt({ token, account, user}) {
            if (account) {
                token.role = user.role
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role || "USER";
            }
            return session;
        }
}
};

export default options;
