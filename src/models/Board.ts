import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {Knight} from "./figures/Knight";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Rook} from "./figures/Rook";
import {Bishop} from "./figures/Bishop";

export class Board {
    cells: Cell[][] = [];

    // Инициализация ячеек в доске
    public initCells() {
        // Проходимя по двум циклам по строке и по столбцу
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); // Белые ячейки
                }
            }
            this.cells.push(row);
        }
    }

    // Функция для отрисовки новой доски
    public getCopyBoard (): Board  {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard
    }

    // Функция для определения может ли фигура ходить на ячейку (на какие ячейки может ходить)
    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }


    // Получение координат
    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    // Добавление пешок
    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    // Добавление коней
    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    // Добавление кололей
    private addKings() {
        new King(Colors.BLACK, this.getCell(3, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    }

    // Добавление ферзей
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(4, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }

    // Добавление ладьей
    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(2, 0));
        new Rook(Colors.BLACK, this.getCell(5, 0));
        new Rook(Colors.WHITE, this.getCell(2, 7));
        new Rook(Colors.WHITE, this.getCell(5, 7));
    }

    // Добавление слонов
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(0, 0));
        new Bishop(Colors.BLACK, this.getCell(7, 0));
        new Bishop(Colors.WHITE, this.getCell(0, 7));
        new Bishop(Colors.WHITE, this.getCell(7, 7));
    }


    // Добавление фигур
    public addFigures() {
        this.addPawns();
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addQueens();
        this.addRooks();
    }
}