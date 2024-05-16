import { useTranslations } from "next-intl";
import { FC } from "react";
import LanguagePicker from "./language-picker";
import InfoButton from "./info-button";

const Header: FC = () => {
    const t = useTranslations()
    return (
        <header className="bg-primary">
            <div className="container px-3 mx-auto flex items-center justify-between h-20">
                <h1 className="text-white text-2xl font-bold">{t('app.name')}</h1>
                <div className="flex items-center gap-3">
                    <LanguagePicker />
                    <InfoButton />
                </div>
            </div>
        </header>
    )
}

export default Header;