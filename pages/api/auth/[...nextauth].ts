import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { authorizedApolloClient } from "../../../graphql/apolloClient";
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from "../../../generated/graphql";

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Logowanie hasłem",

      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const userByEmail = await authorizedApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: {
            email: credentials.username,
          },
        });

        if (!userByEmail.data.account?.password) {
          return null;
        }

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          userByEmail.data.account.password
        );

        if (!arePasswordsEqual) {
          return null;
        }

        return userByEmail.data.account;
      },
    }),
  ],
});
