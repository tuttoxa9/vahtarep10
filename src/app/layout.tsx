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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "вахта",
    "работа вахтой",
    "вакансии вахтовым методом",
    "работа с проживанием",
    "вахтовый метод",
    "работа для граждан РФ и РБ",
    "вахтовая работа",
    "удаленная работа",
    "трудоустройство",
    "карьера",
  ],
  authors: [{ name: "Работа Вахтой: для граждан РФ и РБ" }],
  creator: "Работа Вахтой: для граждан РФ и РБ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vahta1.ru",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://vahta1.ru",
    siteName: "Работа Вахтой: для граждан РФ и РБ",
    title: "Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом",
    description:
      "Мы создали инновационное пространство для поиска работы вахтовым методом. Современный подход, лучшие предложения, надежные работодатели.",
    images: [
      {
        url: "https://vahta1.ru/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Работа Вахтой: для граждан РФ и РБ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом",
    description:
      "Мы создали инновационное пространство для поиска работы вахтовым методом. Современный подход, лучшие предложения, надежные работодатели.",
    images: ["https://vahta1.ru/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" sizes="180x180" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff1414" />
        <meta name="msapplication-TileColor" content="#ff1414" />

        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(102585697, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/102585697"
              style={{position:'absolute', left:'-9999px'}}
              alt=""
            />
          </div>
        </noscript>

        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4WF52RFWV5"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4WF52RFWV5');
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
