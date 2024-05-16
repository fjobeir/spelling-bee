import { useTranslations } from "next-intl";
import { FC } from "react";

const Footer: FC = () => {
    const t = useTranslations();
    return (
        <footer className="flex justify-center h-20 bg-primary items-center text-white">&copy; {t('app.allrights')}</footer>
    )
}

export default Footer;