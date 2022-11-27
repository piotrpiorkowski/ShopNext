import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla5la74s4m4t01tb64vue02a/master",
  cache: new InMemoryCache(),
});
