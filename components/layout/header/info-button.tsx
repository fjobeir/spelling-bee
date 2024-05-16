'use client';
import InformationIcon from "@/components/icons/information";
import Modal from "@/components/modals/modal";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

const InfoButton: FC = () => {
    const t = useTranslations('modals.info');
    const [showInfo, setShowInfo] = useState<boolean>(false);
    return (
        <>
            <button
                className="bg-white text-primary rounded-md p-1 hover:scale-90 transition-all duration-300"
                onClick={() => setShowInfo(prev => !prev)}>
                <InformationIcon />
            </button>
            {showInfo && (
                <Modal title={t('title')} onClose={() => setShowInfo(prev => !prev)}>
                    <p>{t('description')}</p>
                </Modal>
            )}
        </>
    )
};

export default InfoButton;