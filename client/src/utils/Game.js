class Game {
  constructor(props) {
    const { canvas, size = 3 } = props;
    this.canvas = canvas;
    this.size = 2 * size - 1;
    this.horizontalLineIndexes = [];
    this.verticalLinesIndexes = [];
    this.squareIndexes = [];
    this.squares = [];
    this.availableMove = [];
  }

  prepareToGame() {
    this.initGameField();
    this.squareIndexes.forEach( square => {
      this.addSquare(square.i, square.j);
    });
    console.log(this.squares);
  }

  initGameField() {
    for (let i = 0; i < this.size; i++) {
      const row = document.createElement('div');
      row.classList.add('Row');
      for (let j = 0; j < this.size; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
          row.appendChild(initElement({ i, j, type: "Point" }));
          continue;
        }
        if (i % 2 === 0 && j % 2 !== 0) {
          row.appendChild(initElement({ i, j, type: "Horizontal" }));
          this.horizontalLineIndexes.push({i, j});
          continue;
        }
        if (i % 2 !== 0 && j % 2 === 0) {
          row.appendChild(initElement({ i, j, type: "Vertical" }));
          this.verticalLinesIndexes.push({i, j});
          continue;
        }
        if (i % 2 !== 0 && j % 2 !== 0) {
          row.appendChild(initElement({ i, j, type: "Square" }));
          this.squareIndexes.push({i, j});
        }
      }
      this.canvas.appendChild(row);
    }
  }

  addSquare(i, j) {
    console.log(i, j);
    const top = document.querySelector(`[data-i='${i - 1}'][data-j='${j}']`);
    const right = document.querySelector(`[data-j='${j + 1}'][data-i='${i}']`);
    const bottom = document.querySelector(`[data-i='${i + 1}'][data-j='${j}']`);
    const left = document.querySelector(`[data-j='${j - 1}'][data-i='${i}']`);
    this.squares.push(new Square({top, right, bottom, left}));
  }
}

class Square {
  constructor(props) {
    const { top, right, bottom, left } = props;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
}

function initElement(props) {
  // i, j - coords
  // type: "Point", "Horizonal", "Vertical", "Square"
  const { i, j, type } = props;
  const element = document.createElement('div');
  element.dataset.i = i;
  element.dataset.j = j;
  element.classList.add(type);
  return element;
}

export default Game;