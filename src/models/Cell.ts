import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
    // Координаты ячейки и цвет (не меняются)
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    // Фигура на ячейки (любая или ничего)
    figure: Figure | null;
    board: Board;
    // Может ли фигура переместиться
    available: boolean;
    // Для реакт ключей
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    moveFigure(target: Cell) {
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target);
            // меняем фигуру на новое место, а старое место удаляем
            target.figure = this.figure;
            this.figure = null;
        }
    }

}