'use client';
import { FC } from "react";

type Props = {
    words: Array<string> 
}

const GuessedWords: FC<Props> = ({ words }) => {
    return (
        <div className="flex items-center gap-1 flex-wrap min-h-7">
            {words.map((word, index) => (
                <span key={index} className="inline-flex px-2 py-1 items-center gap-1 bg-green-200 rounded-full text-sm">
                    {word}
                </span>
            ))}
        </div>
    )
};

export default GuessedWords;