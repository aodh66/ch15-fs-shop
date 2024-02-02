import "@/styles/globals.css";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { UIProvider } from "@/components/contexts/UI.context";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            staleTime: 1000 * 10,
            retry: process.env.NODE_ENV === "production",
            refetchOnWindowFocus: process.env.NODE_ENV === "production",
          },
        },
      })
  );

  return (
    <>
      <CssBaseline />
      <UserProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Hydrate state={pageProps.dehydratedState}>
              <UIProvider>
                <Component {...pageProps} />
              </UIProvider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}
