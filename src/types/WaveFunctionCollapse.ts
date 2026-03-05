import { TileKindType } from "./enums/TileKind";
import Board from "./Board";
import Rules from "./Rules";
import Queue from "./structures/Queue";
import Tile from "./Tile";

export default class WaveFunctionCollapse {
    private board: Board;
    private rules: Rules;

    private constructor(width: number, height: number) {
        this.board = Board.create(width, height);
        this.rules = Rules.create();
    }

    /**
     * Cria uma nova WaveFunctionCollapse, classe gerenciadora.
     * @param width - Tamanho x do grid.
     * @param height - Tamanho y do grid.
     * @returns - Uma nova instância do tipo WaveFunctionCollapse.
     */
    public static create(width: number, height: number): WaveFunctionCollapse {
        return new WaveFunctionCollapse(width, height)
    }

    /**
     * Propaga as condições da célula inicial.
     * @param startCell - Célula da qual parte a propagação.
     * @throws - Erro para caso algum vizinho não tenha 
     * possibilidade válida.
     */
    private propagate(startCell: Tile): void {
        const queue: Queue<Tile> = new Queue<Tile>([startCell]);
        let cell: Tile;

        // Nota - "enquanto as possibilidades dos vizinhos diminuirem".
        while (!queue.empty()) {
            cell = queue.dequeue()!;
            for (const neighbor of this.board.neighbors(cell)) {
                    const possibilities: TileKindType[] = [];
                    // Nota - se vizinho já foi colapsado, não repetimos.
                    if (neighbor.collapsed) {
                        continue;
                    }

                    // Nota - percorremos todas as possibilidades do vizinho
                    // para pegarmos as possíveis possibilidades para nosso
                    // vizinho.
                    for (const possibility of neighbor.possibilities) {
                        let valid: boolean = false;

                        for (const currentPossibility of cell.possibilities) {
                            if (this.rules.compatible(currentPossibility, possibility)) {
                                valid = true;
                                break;
                            }
                        }

                        if (valid) {
                            possibilities.push(possibility);
                        }
                    }

                    // Nota - vizinho não tem mais para onde ir.
                    if (possibilities.length === 0) {
                        throw Error('Sem possibilidades possíveis.');
                    }

                    // Nota - "se vizinho tiver menos possibilidadas, teste ele".
                    if (possibilities.length < neighbor.possibilities.length) {
                        neighbor.possibilities = possibilities;
                        queue.enqueue(neighbor);
                    }
                }
        }
    }

    /**
     * Executa a criação de nosso mapa procedural
     * 
     * @param onAdd - Um callback para executar para cada tile executado.
     * @returns - Um grid com os Tiles produzidos.
     * 
     * @throws - Um erro caso não haja solução válida (sem célula com 
     * a menor entropia).
     */
    public run(onAdd?: (x: Tile) => void): Tile[][] {
        // Nota - enquanto não tivermos todos os nodos
        // visitados e colapsados...
        while (!this.board.allCollapsed()) {
            const cell: Tile | null = this.board.lessEntropy();

            if (!cell) {
                throw Error("No valid solution.");
            }

            // Nota - bloqueia a célula
            cell.collapse();
            if (onAdd) onAdd(cell);

            // Nota - propaga as alterações de nossa célula
            this.propagate(cell);
        }

        return this.board.board;
    }
}