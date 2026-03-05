import { TileKindType } from "./enums/TileKind";

export default class Tile {
    public x: number;
    public y: number;
    public collapsed: boolean = false;
    public possibilities: TileKindType[] = [];
    public chosen: TileKindType | undefined;

    private constructor(x: number, y: number, possibilities: TileKindType[]) {
        this.x = x;
        this.y = y;
        this.possibilities = possibilities;
    }

    /**
     * Cria uma nova instância do tipo Tile.
     * @param x - Posição x no grid (board).
     * @param y - Posição y no grid (board).
     * @param possibilities - Tipos de tiles possíveis para escolha.
     * @returns - Uma nova instância Tile.
     */
    public static create(x: number, y: number, possibilities: TileKindType[]): Tile {
        return new Tile(x, y, possibilities);
    }

    /**
     * Colapsa uma célula, escolhendo aleatóriamente uma 
     * de suas possibilidadeds para que ela seja a escolhida.
     */
    public collapse(): void {
        let choice: TileKindType = this.possibilities[Math.floor(Math.random() * this.possibilities.length)]
        this.chosen = choice;
        this.possibilities = [choice];
        this.collapsed = true
    }
}