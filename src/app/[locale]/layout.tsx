import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Locale } from "../../../i18n.config";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/context/cart-provider";
import AuthProviders from "@/components/session-provider/session-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: "Bright gallery",
    description: t("Main.Desc"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${raleway.className} ${raleway.variable} ${inter.variable} antialiased text-default text-textColor font-normal leading-[1.4] tracking-[-2%]`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProviders>
            <CartProvider>
              <Header locale={locale} />
              <main>{children}</main>
              <Footer />
              <Toaster
                toastOptions={{
                  success: {
                    style: { background: "#4CAF50", color: "white" },
                  },
                  error: {
                    style: { background: "#F44336", color: "white" },
                    iconTheme: {
                      primary: "white",
                      secondary: "red",
                    },
                  },
                }}
                position="top-center"
              />
            </CartProvider>
          </AuthProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
