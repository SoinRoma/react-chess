import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Queen} from "./figures/Queen";

export class Board {
    cells: Cell[][] = [];

    // Инициализация ячеек в доске
    public initCells() {
        // Проходимя по двум циклам по строке и по столбцу
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if((i+j)%2 !==0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); // Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); // Белые ячейки
                }
            }
            this.cells.push(row);
        }
    }

    public getCell(x:number, y:number){
        return this.cells[y][x]
    }

    public addFigures(){
        new Queen(Colors.WHITE, this.getCell(3, 6))
    }
}