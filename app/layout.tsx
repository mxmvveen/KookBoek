import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

import Header from "./ui/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={roboto.variable}>
      <body style={{ margin: 0 }} className={`antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
          </ThemeProvider>
        </AppRouterCacheProvider>
        {children}
      </body>
    </html>
  );
}
