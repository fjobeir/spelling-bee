'use client';
import { FC } from "react";
import { ModalProps } from "@/types/modal";
import CloseIcon from "../icons/close";


const Modal: FC<ModalProps> = ({ title, children, actions, onClose }) => {
    const closeModal = () => {
        if (onClose) {
            onClose();
        }
    }
    return (
        <>
            <div className="fixed w-screen h-screen top-0 left-0 z-40 bg-black bg-opacity-20 backdrop-blur-md" onClick={closeModal} />
            <div className="fixed w-96 md:w-1/2 max-w-[calc(100%-24px)] z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-gray-300 rounded-lg overflow-hidden drop-shadow-md bg-white">
                <div className="min-h-10 bg-gray-100 border-b border-solid border-gray-300 text-gray-600 flex items-center justify-between px-3">
                    <span>{title}</span>
                    <button className="bg-transparent border-none" onClick={closeModal}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-3">{children}</div>
                {actions && (
                    <>
                        {actions.map((action, index) => (
                            <button key={index} {...action} type="button" />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Modal;