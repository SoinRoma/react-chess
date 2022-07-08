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

    // Проверка на пустую клетку
    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if(target.figure){
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    // Проверка вертикали на наличие вражеских фигур
    isEmptyVertical(target: Cell): boolean {
        // Проверяем чтобы столбы совпадали(у выделенной фигуры и других фигур)
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    // Проверка горизонтали на наличие вражеских фигур
    isEmptyHorizontal(target: Cell): boolean {
        // Проверяем чтобы строки совпадали(у выделенной фигуры и других фигур)
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    // Проверка диагонали на наличие вражеских фигур
    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absY !== absX) {
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    // Обновление области видимости фигуры после смены хода
    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            // меняем фигуру на новое место, а старое место удаляем
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

}