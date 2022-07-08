import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from '../../images/black-rook.png';
import whiteLogo from '../../images/white-rook.png';

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROCK;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)){
            return false;
        }
        if (this.cell.isEmptyDiagonal(target)){
            return true;
        }
        return false;
    }
}