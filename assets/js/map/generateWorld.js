import MapTile from './tiles';
import BASE_TILES from './tiles/BASE_TILES';
import noise from '../utils/noise';
import mapRange from '../utils/rangeMap';

export const genAltGrid = function ({width, height}, params) { // grid, centre, wl1, wl2) {
  const MAP = [...Array(height).keys()].map(i => Array(width).fill(new MapTile(99)));

  let rSqrd = 2 * Math.pow(Math.min(width, height), 2);

  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      let xSqrd = Math.pow(x - width / 2, 2);
      let ySqrd = Math.pow(y - height / 2, 2);
      let dSq = xSqrd + ySqrd;
      let d = dSq / rSqrd;

      // let e = params.octaves[0] * noise(x / params.wl1, y / params.wl1) + 0.2 * noise(x / params.wl2, y / params.wl2) - 20 * Math.pow(d, 2);
      let e = params.octaves.reduce((acc, oct) => {
        return acc + oct.val * noise(x / oct.wl, y / oct.wl);
      }, 0);
      e -= 20 * Math.pow(d, 2);

      if (e < -10) {
        e = -10;
      } else if (e > 1) {
        e = 1;
      }
      console.log(e);
      e = mapRange(e, -10, 1, 0, 7);

      MAP[y][x] = new MapTile(e);
    }
  }
  return MAP;
}

// class World {
//   constructor(gridWidth, gridHeight) {
//     this.gridWidth = gridWidth;
//     this.gridHeight = gridHeight;
//     this.size = this.gridWidth * this.gridHeight;
//     this.rSquared = 2 * Math.pow(Math.min(this.gridWidth, this.gridHeight), 2);
//     this.centre = {
//       x: this.gridWidth / 2,
//       y: this.gridHeight / 2
//     };

//     this.altGrid = [];
//     this.moistureGrid = [];
//     this.tempGrid = [];
//     this.genAltGrid(this.altGrid, this.centre, 100, 20);
//     // this.genNoiseGrid(this.moistureGrid, 150);
//     this.genTempGrid(this.tempGrid, 300);

//     this.coloursGrid = [];
//     this.genColoursGrid();
//   }

//   genAltGrid({width, height}, params) { // grid, centre, wl1, wl2) {
//     const MAP = [...Array(height).keys()].map(i => Array(width).fill(new MapTile(99)));
//     for (let x = 0; x < this.gridWidth; x++) {
//       grid[x] = new Array();
//       for (let y = 0; y < this.gridHeight; y++) {
//         let xSqrd = Math.pow(x - centre.x, 2);
//         let ySqrd = Math.pow(y - centre.y, 2);
//         let dSq = xSqrd + ySqrd;
//         let d = dSq / this.rSquared;

//         grid[x][y] = 0.8 * noise(x/wl1, y/wl1) + 0.2 * noise(x / wl2, y / wl2) - 20 * Math.pow(d, 2);
//       }
//     }
//   }
  
//   genTempGrid(grid, wl) {
//     for (let x = 0; x < this.gridWidth; x++) {
//       grid[x] = new Array();
//       for (let y = 0; y < this.gridHeight; y++) {
//         grid[x][y] = noise(x/wl, y/wl) + 0.5 * noise(x * 2 / wl, y * 2 / wl);
//       }
//     }
//   }

//   genColoursGrid() {
//     for (let x = 0; x < this.gridWidth; x++) {
//       this.coloursGrid[x] = new Array();
//       for (let y = 0; y < this.gridHeight; y++) {
//         if (this.altGrid[x][y] < 0.3) {
//           this.coloursGrid[x][y] = {
//             h: Math.round(map(this.altGrid[x][y], 0, 0.3, 160, 210)),
//             // h: Math.round(map(this.altGrid[x][y] + 0.25 * this.tempGrid[x][y], 0, 0.55, 160, 210)),
//             // h: Math.round(map(this.moistureGrid[x][y] + 1.5 * this.tempGrid[x][y], 0, 2.5, 140, 180)),
//             // s: Math.round(map(this.tempGrid[x][y] - this.altGrid[x][y] / 4, 0, 1, 0, 100)),
//             s: 80,
//             b: Math.round(map(this.altGrid[x][y], 0, 0.3, 30, 70))
//           };
//         } else {
//           this.coloursGrid[x][y] = {
//             h: Math.round(map(this.tempGrid[x][y], 0, 1, 10, 120)),
//             // h: Math.round(map(this.moistureGrid[x][y] + 1.5 * this.tempGrid[x][y], 0, 1, 20, 120)),
//             s: Math.max(Math.round(map(this.tempGrid[x][y] - this.altGrid[x][y] / 2, 0, 1, 0, 100)), 0),
//             b: Math.round(map(this.tempGrid[x][y], 0, 1, 100, 30))
//             // b: Math.round(map(this.altGrid[x][y], 0, 1, 65, 100))
//           };
//         }
//       }
//     }
//   }

//   draw(pos, viewHeight) {
//     for (let x = pos.x - viewHeight, i = 0; x < pos.x + viewHeight; x++) {
//       for (let y = pos.y - viewHeight, j = 0; y < pos.y + viewHeight; y++) {
//         // let hsbColour = `hsb(${this.coloursGrid[x][y].h}, ${this.coloursGrid[x][y].s}%, ${this.coloursGrid[x][y].b}%)`;
//         // stroke(hsbColour);
//         // strokeWeight(4);
//         // point(i * (0.5 * width / viewHeight), j * (0.5 * height / viewHeight));

//         fill(this.coloursGrid[x][y].h, this.coloursGrid[x][y].s, this.coloursGrid[x][y].b);
//         rect(i * (0.5 * width / viewHeight), j * (0.5 * height / viewHeight), 0.5 * width / viewHeight, 0.5 * height / viewHeight);
//         j++;
//       }
//       i++;
//     }
//   }
// }