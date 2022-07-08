import {Colors} from "../Colors";
import logo from '../../images/black-bishop.png';
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = 'Фигура',
    KING = 'Король',
    KNIGHT = 'Конь',
    PAWN = 'Пешка',
    QUEEN = 'Ферзь',
    ROCK = 'Ладья',
    BISHOP = 'Слон',

}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    // Функция куда можно ходить фигурам
    canMove(target: Cell): boolean {
        // Условие, что своих фигур есть нельзя
        if(target.figure?.color === this.color){
            return false;
        }
        // Короля есть нельзя
        if(target.figure?.name === FigureNames.KING){
            return false;
        }
        return true;

    }

    moveFigure(target: Cell) {

    }
}