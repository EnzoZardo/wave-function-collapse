import WaveFunctionCollapse from './types/WaveFunctionCollapse';
import { TileKindColors } from './types/enums/TileKind';
import { Application, Graphics } from 'pixi.js';
import Tile from './types/Tile';

const width: number = 20;
const height: number = 20;

const app = new Application();
const canvas = document.querySelector('.canvas')! as HTMLElement;
const wave = WaveFunctionCollapse.create(width, height);

const graphics: Graphics[] = [];

(async () => {
  await app.init({ background: '#bb9310', resizeTo: canvas });
  
  const tileHeight: number = app.screen.height / height;
  const tileWidth: number = app.screen.width / width;

  wave.run((tile: Tile) => {
    if(!tile.collapsed) return;

    const graphic = new Graphics()
      .rect(
        tile.x * tileWidth,
        tile.y * tileHeight, 
        tileWidth, 
        tileHeight)
      .fill(TileKindColors[tile.chosen!]);

    graphics.push(graphic)
  });
  
  let timer = 0
  let index = 0
  app.ticker.speed = 0.5
  app.ticker.add((delta) => {
    timer += delta as unknown as number;
    if (timer < 100000) return;
    timer = 0;
    
    if (index < graphics.length -1)  {
      app.stage.addChild(graphics[index]);
      index++
    }
  });

  canvas.appendChild(app.canvas);
})();
