'use client';
import useCounterDown from "@/hooks/use-counter-down";
import { DictionaryItem } from "@/types/dictionary";
import { useTranslations } from "next-intl";
import { FC, ReactNode, useEffect, useState } from "react";
import GuessedWords from "./guessed-words";
import Hex from "./hex";
import UndoIcon from "../icons/undo";
import SendIcon from "../icons/send";
import Modal from "../modals/modal";

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
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<{title: string; message: ReactNode|string}>({title: '', message: ''});

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
            setFeedback({title: t('game.error'), message: <>
                <p>{t('game.errors.timeUp')}</p>
                <button onClick={() => window.location.reload()} className="underline">{t('game.actions.newGame')}</button>
            </>});
            return;
        }
        if (['Meta', 'Control', 'Alt', 'Shift'].includes(guess)) {
            return;
        }
        if ([mustUsed, ...restOfLetters, 'Backspace', 'Enter'].includes(guess)) {
            if (guess === 'Enter') {
                submitGuess();
            } else if (guess === 'Backspace') {
                setCurrentGuess(currentGuess.slice(0, -1));
            } else {
                setCurrentGuess(currentGuess + guess);
            }
        } else {
            setFeedback({title: t('game.error'), message: t('game.errors.invalidCharacter')});
        }
    }

    const submitGuess = () => {
        if (correctGuesses.includes(currentGuess)){
            // already guessed
            setFeedback({title: t('game.error'), message: t('game.errors.alreadyGuessed')});
            return;
        }
        if (words.includes(currentGuess)){
            setCorrectGuesses([...correctGuesses, currentGuess])
            addTime(15);
            setCurrentGuess('')
        } else {
            shakeInput();
        }
    }

    const shakeInput = () => {
        setIsShaking(true);
        setTimeout(() => {
            setIsShaking(false);
        }, 500);
    };

    return (
        <>
        <div className="container mx-auto px-3">
            <div className="relative max-w-xl mx-auto flex flex-col gap-5">
                {/* Progress */}
                <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2">
                        <span className="text-sm">{correctGuesses.length} / {words.length}</span>
                        <span>{impression}</span>
                    </p>
                    <span className={`${time === 0 && 'text-red-300'}`}>{formattedTime}</span>
                </div>
                <div className="w-full h-4 border border-solid border-gray-200 rounded-full bg-gray-100 mb-">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(correctGuesses.length / words.length) * 100}%` }} />
                </div>
                {/* Correctly Guessed Words */}
                <GuessedWords words={correctGuesses} />
                {/* Input */}
                <input 
                    disabled={time === 0} 
                    className={`bg-white text-center text-5xl uppercase py-2 border border-solid border-gray-200 rounded-md ${time === 0 ? 'bg-gray-100' : ''} ${isShaking ? 'animate-shake' : ''}`}
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
                        <span>{t('game.actions.undo')}</span>
                    </button>
                    <button className="rounded-full py-2 px-4 inline-flex items-center gap-2 bg-green-100" onClick={() => updateGuess('Enter')}>
                        <span>{t('game.actions.send')}</span>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
        {
            feedback.title && <Modal title={feedback.title} onClose={() => {
                setFeedback({title: '', message: ''});
            }}>{feedback.message}</Modal>
        }
        </>
    );
};

export default SpellBee;