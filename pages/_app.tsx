import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { CartStateContextProvider } from "../components/Cart/CartContex";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient();
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps | any) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CartStateContextProvider>
          <Layout>
            <DefaultSeo {...SEO} />
            <QueryClientProvider client={client}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Layout>
        </CartStateContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
