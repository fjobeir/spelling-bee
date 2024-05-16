import { HTMLProps, ReactNode } from "react";

export type ModalProps = {
    children: ReactNode;
    onClose?: () => void;
    title: string;
    actions?: Array<HTMLProps<HTMLButtonElement>>;
}