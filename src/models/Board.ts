import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";

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

    }

    // Добавление кололей
    private addKings() {

    }

    // Добавление ферзей
    private addQueens() {

    }

    // Добавление ладьей
    private addRocks() {

    }

    // Добавление слонов
    private addBishops() {

    }


    // Добавление фигур
    public addFigures() {
        this.addPawns();
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addQueens();
        this.addRocks();
    }
}