import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const TimerComponent: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(1500);
    const [whiteTime, setWhiteTime] = useState(1500);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
        // eslint-disable-next-line
    }, [currentPlayer])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev -1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev -1);
    }

    const handleRestart = () => {
        setWhiteTime(1500);
        setBlackTime(1500);
        restart();
    }

    return (
        <div className="timer-parent">
            <button onClick={handleRestart}>Новая игра</button>
            <h2>Чёрные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default TimerComponent;