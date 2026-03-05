import { TileKind, TileKindType } from "./enums/TileKind";
import Tile from "./Tile";

export default class Board 
{
    /**
     * @property - Coordenadas vizinhas de uma célula sem diagonais.
     */
    private static readonly neighborsCoordinates: {dx: number; dy: number}[] = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
    ];
    /**
     * @property - Possibilidades genéricas para um Tile.
     */
    private static readonly options: TileKindType[] = [
        TileKind.Grass,
        TileKind.HighMontain,
        TileKind.LowMontain,
        TileKind.Water
    ];
    private width: number;
    private height: number;
    private value: Tile[][] = [];

    private constructor(width: number, height: number) 
    {
        this.width = width;
        this.height = height;
        this.build();
    }

    /**
     * Cria um novo Board, classe gerenciadora de células.
     * @param width - Tamanho x do grid.
     * @param height - Tamanho y do grid.
     * @returns - Uma nova instância do tipo Board.
     */
    public static create(width: number, height: number): Board {
        return new Board(width, height)
    } 

    /**
     * Cria o grid do Board com um Tile por célula.
     */
    private build(): void {
        this.value = []
        for (let y: number = 0; y < this.height; y++) {
            this.value.push([])
            for (let x: number = 0; x < this.width; x++) {
                this.value[y].push(Tile.create(x, y, Board.options))
            }
        }
    }

    /**
     * Busca o Tile com a menor entropia.
     * @returns - A célula de menor entropia 
     * (a primeira com possibilidades válidas).
     */
    public lessEntropy(): Tile | null {
        let size: number = 0;
        // Nota - Representa o maior valor possível, inalcançável.
        let less: number = Infinity;
        let chosen: Tile | null = null;

        for (const row of this.value) {
            for (const cell of row) {
                if (!cell.collapsed) {
                    size = cell.possibilities.length;
                }

                // Nota - "se possui alguma possibilidade".
                if (size < less && size > 0) {
                    less = size;
                    chosen = cell;
                }
            }
        }

        return chosen
    }

    public get board(): Tile[][] {
        return this.value;
    }

    /**
     * Busca se todas as células estão colapsadas.
     * @returns - Verdadeiro todas as células do grid
     * estiverem colapsadas.
     */
    public allCollapsed(): boolean {
        return this.value
            .reduce(x => x)
            .every(x => x.collapsed);
    }

    /**
     * Busca os vizinhos de ums célula.
     * @param cell - Célula da qual buscaremos seus vizinhos
     * sem considerar a diagonal.
     * @returns - Um array de Tiles vizinhos.
     */
    public neighbors(cell: Tile): Tile[] {
        const neighbors: Tile[] = [];
        
        for (const { dx, dy } of Board.neighborsCoordinates) {
            let currentY: number = cell.y + dy
            let currentX: number = cell.x + dx

            // Nota - se for menor do que o início do array,
            // pega do final.
            if (currentY < 0) {
                currentY = this.value.length - 1;
            }

            if (currentX < 0) {
                currentX = this.value[0].length - 1;
            }

            // Nota - se for maior do que o tamanho do array,
            // pega do começo.
            if (currentY >= this.value.length) {
                currentY = 0;
            }

            if (currentX >= this.value[0].length) {
                currentX = 0;
            }

            neighbors.push(this.value[currentY][currentX]);
        }
        
        return neighbors;
    }
}