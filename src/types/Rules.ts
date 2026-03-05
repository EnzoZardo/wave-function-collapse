import { TileKind, TileKindType } from "./enums/TileKind";

export default class Rules {
    private construct() {}

    /**
     * Cria uma nova Rules, classe de regras de Tiles.
     * @returns - Uma nova instância do tipo Rules.
     */
    public static create(): Rules {
        return new Rules();
    }

    /**
     * Verifica se uma célula (seu tipo, no caso) segue as regras.
     * @param reference - Referência para a verificação das regras.
     * @param neighbor - Vizinho de nossa referência.
     * @returns - Verdadeiro caso a referência se encaixe nas regras
     * para sua vizinhança.
     */
    public compatible(reference: TileKindType, neighbor: TileKindType): boolean {
        switch (reference) {
            case TileKind.Water:
                return neighbor === TileKind.Water 
                    || neighbor === TileKind.Grass;
            case TileKind.LowMontain:
                return neighbor === TileKind.Grass
                    || neighbor === TileKind.Water
                    || neighbor === TileKind.LowMontain;
            case TileKind.Grass:
                return true;
            case TileKind.HighMontain:
                return neighbor === TileKind.LowMontain
                    || neighbor === TileKind.HighMontain;
            default: 
                return false;
        }
    }
}