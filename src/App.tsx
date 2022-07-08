import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFiguresComponent from "./components/LostFiguresComponent";
import TimerComponent from "./components/TimerComponent";

function App() {

    const [board, setBoard] = useState(new Board());
    const [whitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() =>{
        restart();
        setCurrentPlayer(whitePlayer);
        // eslint-disable-next-line
    }, []);

    function restart(){
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    // Переключение игрока
    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className="background">
            <TimerComponent currentPlayer={currentPlayer} restart={restart} />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div className="lost-parent">
                <LostFiguresComponent title="Белые фигуры" figures={board.lostWhiteFigures}/>
                <LostFiguresComponent title="Чёрные фигуры" figures={board.lostBlackFigures}/>
            </div>
        </div>
    );
}

export default App;
