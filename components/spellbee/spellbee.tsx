'use client';
import useCounterDown from "@/hooks/use-counter-down";
import { DictionaryItem } from "@/types/dictionary";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import GuessedWords from "./guessed-words";
import Hex from "./hex";
import UndoIcon from "../icons/undo";
import SendIcon from "../icons/send";

type Props = {
    dictionary: DictionaryItem;
}

const SpellBee: FC<Props> = ({ dictionary }) => {
    const t = useTranslations();
    const { time, addTime, formattedTime } = useCounterDown(60);
    const { mustUsed, restOfLetters, words } = dictionary;
    const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [impression, setImpression] = useState<string>('');
    
    useEffect(() => {
        const percentage = (correctGuesses.length / words.length) * 100;
        if (percentage === 0) {
            setImpression('😕');
        } else if (percentage < 10) {
            setImpression('🙂');
        } else if (percentage < 50) {
            setImpression('😄');
        } else {
            setImpression('🥳');
        }
    }, [correctGuesses, words.length]);

    const updateGuess = (guess: string) => {
        if (time === 0) {
            alert(t('game.errors.timeUp'));
            return;
        }
        if ([mustUsed, ...restOfLetters].includes(guess) || guess === 'Backspace' || guess === 'Enter' || guess === 'capslock') {
            if (guess === 'Enter') {
                submitGuess();
            } else if (guess === 'Backspace') {
                setCurrentGuess(currentGuess.slice(0, -1));

            } else {
                setCurrentGuess(currentGuess + guess);
            }
        } else {
            alert(t('game.errors.invalidCharacter'));
        }
    }

    const submitGuess = () => {
        if (correctGuesses.includes(currentGuess)){
            // already guessed
            alert(t('game.errors.alreadyGuessed'));
            return;
        }
        if (words.includes(currentGuess)){
            setCorrectGuesses([...correctGuesses, currentGuess])
            addTime(15);
            setCurrentGuess('')
        } else {
            alert(t('game.errors.wrongGuess'));
        }
    }
    return (
        <div className="container mx-auto px-3">
            <div className="relative max-w-xl mx-auto mb-20 flex flex-col gap-5">
                {/* Progress */}
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2">
                        <span className="text-sm">{correctGuesses.length} / {words.length}</span>
                        <span>{impression}</span>
                    </p>
                    <span>{formattedTime}</span>
                </div>
                <div className="w-full h-4 border border-solid border-gray-200 rounded-full bg-gray-100 mb-">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(correctGuesses.length / words.length) * 100}%` }} />
                </div>
                {/* Correctly Guessed Words */}
                <GuessedWords words={correctGuesses} />
                {/* Input */}
                <input 
                    disabled={time === 0} 
                    className="bg-white text-center text-5xl uppercase py-2"
                    value={currentGuess} 
                    onKeyDown={(e) => {
                        updateGuess(e.key);
                    }} />
                {/* Letters */}
                <div className="relative w-[285px] h-[300px] mx-auto">
                    {[mustUsed, ...restOfLetters].map((letter, index) => (
                            <Hex letter={letter} key={index} onClick={() => updateGuess(letter)} location={index} />
                        ))
                    }
                </div>
                <div className="flex justify-center gap-3">
                    <button className="rounded-full py-2 px-4 inline-flex items-center gap-2 bg-red-100" onClick={() => updateGuess('Backspace')}>
                        <UndoIcon />
                        <span>Undo</span>
                    </button>
                    <button className="rounded-full py-2 px-4 inline-flex items-center gap-2 bg-green-100" onClick={() => updateGuess('Enter')}>
                        <span>Send</span>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpellBee;