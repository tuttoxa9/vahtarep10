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
    "Высокооплачиваемая вахтовая работа для граждан России и Беларуси. Зарплата от 100,000₽, бесплатное жилье, питание. Подай заявку сегодня!",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
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
    "высокая зарплата вахта",
    "работа вахтой 100000 рублей",
    "вахта с проживанием россия беларусь",
    "высокооплачиваемая вахта",
    "стабильная работа вахтой",
    "вахтовая работа с жильем",
    "заработок на вахте",
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
      "Высокооплачиваемая вахтовая работа для граждан России и Беларуси. Зарплата от 100,000₽, бесплатное жилье, питание. Подай заявку сегодня!",
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
      "Лучшие вакансии вахтой с высокой зарплатой. Проверенные работодатели, стабильный доход, полный соцпакет. Для граждан РФ и РБ.",
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

        {/* SEO мета-теги */}
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow" />
        <meta name="yandex" content="all,noodp" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Yandex.Webmaster verification */}
        <meta name="yandex-verification" content="0d805610cfa9353f" />

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

        {/* JSON-LD структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Работа Вахтой: для граждан РФ и РБ",
              "url": "https://vahta1.ru",
              "description": "Высокооплачиваемая вахтовая работа для граждан России и Беларуси. Зарплата от 100,000₽, бесплатное жилье, питание. Подай заявку сегодня!",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vahta1.ru/vacancies?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Работа Вахтой: для граждан РФ и РБ",
                "url": "https://vahta1.ru",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vahta1.ru/logo2.svg"
                }
              }
            })
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
