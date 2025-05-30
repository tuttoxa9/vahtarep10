import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Работа Вахтой: для граждан РФ и РБ",
    default: "Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом",
  },
  description:
    "Мы создали инновационное пространство для поиска работы вахтовым методом. Современный подход, лучшие предложения, надежные работодатели.",
  keywords: [
    "вахта",
    "работа вахтой",
    "вакансии вахтовым методом",
    "работа с проживанием",
    "вахтовый метод",
    "работа для граждан РФ и РБ",
  ],
  authors: [{ name: "Работа Вахтой: для граждан РФ и РБ" }],
  creator: "Работа Вахтой: для граждан РФ и РБ",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://rabotavahtoy.ru",
    siteName: "Работа Вахтой: для граждан РФ и РБ",
    title: "Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом",
    description:
      "Мы создали инновационное пространство для поиска работы вахтовым методом. Современный подход, лучшие предложения, надежные работодатели.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
