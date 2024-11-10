import { metadata } from "./metadata";
import { roboto } from "@/app/_fonts/fonts";
import "./globals.css";
import Navbar from "./_components/navbar";
import LayoutWrapper from "./_components/RootLayout"; // Importe o LayoutWrapper

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${roboto.className} font-sans flex`}>
        <Navbar />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
