import { FC, useMemo } from "react";

type Props = {
    letter: string;
    onClick: () => void;
    location: number;
}

const Hex: FC<Props> = ({ letter, location, onClick }) => {
    let locationClasses = useMemo(() => {
        switch (location) {
            case 0:
                // the one in the middle
                return 'top-[34%] left-[30%]';
            case 1:
                return 'top-[17%] left-0';
            case 2:
                return 'top-[17%] left-[60%]';
            case 3:
                return 'top-0 left-[30%]';
            case 4:
                return 'top-[51%] left-0';
            case 5:
                return 'top-[68%] left-[30%]';
            default:
                return 'top-[51%] left-[60%]';
        }
    }, [location]);
    
    return (
        <div 
            className={`absolute inline-block items-center justify-center w-[35%] filter-goo hex cursor-pointer ${location === 0 ? 'text-primary' : 'text-gray-300'} ${locationClasses}`}
            onClick={onClick}>
        <style jsx>{`
            .hex::before {
                content: '';
                display: block;
                background: currentColor;
                padding-top: 86.6%;
                clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            }
        `}</style>
            <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold uppercase">{letter}</div>
        </div>
    )
};

export default Hex;