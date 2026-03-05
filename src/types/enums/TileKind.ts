export const TileKind = {
    Grass: 0,
    Water: 1,
    HighMontain: 2,
    LowMontain: 3,
} as const;

export const TileKindColors = {
    [TileKind.Grass]: 'green',
    [TileKind.Water]: 'blue',
    [TileKind.HighMontain]: '#800020',
    [TileKind.LowMontain]: '#6E260E',
} as const;

export type TileKindType = (typeof TileKind)[keyof typeof TileKind]