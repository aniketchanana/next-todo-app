import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/utils/theme";
import Head from "next/head";
import "remixicon/fonts/remixicon.css";
import { TodoProvider } from "@/context/TodoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Head>
        <title>Todo application</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </TodoProvider>
  );
}
