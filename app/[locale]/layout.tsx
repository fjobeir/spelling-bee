import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header/header";
import { Locale } from "@/types/misc";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import '../globals.css';
import { getMessages } from "next-intl/server";

type Props = Readonly<{
	children: ReactNode;
	params: {
		locale: Locale;
	};
}>;


export default async function RootLayout({ children, params: { locale } }: Props) {
  // you can attach this value in the locals variable, but since we are sure of having EN,TR only, we make it static
  const direction = 'ltr'
  const messages = await getMessages();
  return (
    <html lang={locale} dir={direction} className="bg-gray-50 min-h-screen">
			<body className={direction}>
        <NextIntlClientProvider locale={locale} messages={{
          ...messages
        }}>
          <svg className="invisible absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />    
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            </svg>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        </body>
    </html>
  )
}