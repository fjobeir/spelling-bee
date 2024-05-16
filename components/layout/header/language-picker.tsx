'use client';

import { LOCALES } from "@/config/constants";
import { Locale } from "@/types/misc";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";

const LanguagePicker: FC = () => {
    const { locale: currentLangauge} = useParams()

    return (
        <ul className="flex gap-2">
            {
                Object.keys(LOCALES).map((locale) => (
                    <li key={locale}>
                        <Link href={`/${locale}`} locale={locale} className={`text-white ${locale === currentLangauge && 'font-bold'}`}>
                            {LOCALES[locale as Locale].name}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default LanguagePicker;