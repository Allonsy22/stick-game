class Game {
  constructor(props) {
    const { canvas, size = 3, player, opponent } = props;
    this.canvas = canvas;
    this.size = 2 * size - 1;
    this.player = player;
    this.opponent = opponent;
    this.horizontalLineIndexes = [];
    this.verticalLinesIndexes = [];
    this.squareIndexes = [];
    this.squares = [];
    this.availableMoves = [];
    this.isAvailableTurn = player === 'Red' ? true : false; // first player always is Red
  }

  newGame() {
    this.initGameField();
    this.squareIndexes.forEach(square => {
      this.addSquare(square.i, square.j);
    });
    this.availableMoves = [...this.verticalLinesIndexes, ...this.horizontalLineIndexes];
  }

  initGameField() {
    for (let i = 0; i < this.size; i++) {
      const row = document.createElement('div');
      row.classList.add('Row');
      for (let j = 0; j < this.size; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
          row.appendChild(this.initElement({ i, j, type: "Point" }));
          continue;
        }
        if (i % 2 === 0 && j % 2 !== 0) {
          row.appendChild(this.initElement({ i, j, type: "Horizontal" }));
          this.horizontalLineIndexes.push({ i, j });
          continue;
        }
        if (i % 2 !== 0 && j % 2 === 0) {
          row.appendChild(this.initElement({ i, j, type: "Vertical" }));
          this.verticalLinesIndexes.push({ i, j });
          continue;
        }
        if (i % 2 !== 0 && j % 2 !== 0) {
          row.appendChild(this.initElement({ i, j, type: "Square" }));
          this.squareIndexes.push({ i, j });
        }
      }
      this.canvas.appendChild(row);
    }
  }

  addSquare(i, j) {
    const top = document.querySelector(`[data-i='${i - 1}'][data-j='${j}']`);
    const right = document.querySelector(`[data-j='${j + 1}'][data-i='${i}']`);
    const bottom = document.querySelector(`[data-i='${i + 1}'][data-j='${j}']`);
    const left = document.querySelector(`[data-j='${j - 1}'][data-i='${i}']`);
    const square = document.querySelector(`[data-j='${j}'][data-i='${i}']`);
    this.squares.push(new Square({ square, top, right, bottom, left }));
  }

  initElement(props) {
    // i, j - coords
    // type: "Point", "Horizonal", "Vertical", "Square"
    const { i, j, type } = props;
    const element = document.createElement('div');
    element.dataset.i = i;
    element.dataset.j = j;
    element.classList.add(type);
    element.addEventListener('click', (event) => this.makeMove(event));
    return element;
  }

  makeMove(event) {
    // player: 'Red' or 'Blue'
    const element = event.target
    const i = parseInt(element.dataset.i);
    const j = parseInt(element.dataset.j);
    // return true/false
    if (this.checkIsAvailableMove(i, j) && this.isAvailableTurn) {
      this.availableMoves = this.availableMoves.filter(coords => {
        return coords.i !== i || coords.j !== j;
      });
      element.classList.add(this.player);
      this.nextTurn();
    }
  }

  checkIsAvailableMove(i, j) {
    let isAvailable;
    this.availableMoves.forEach(coords => {
      if (coords.i === i && coords.j === j) {
        isAvailable = true;
        return;
      }
    })
    return isAvailable;
  }

  checkForNextTurn() {
    this.squares.forEach( square => {
      square.checkSquare(this.player);
    });
  }

  nextTurn() {
    this.checkForNextTurn();
    const opponent = this.opponent;
    this.opponent = this.player;
    this.player = opponent;
    // this.isAvailableTurn = !this.isAvailableTurn;
  }

  getCurrentPlayer() {
    return this.player;
  }
}

class Square {
  constructor(props) {
    const { square, top, right, bottom, left } = props;
    this.square = square;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  checkSquare(player) {
    if (this.checkForClass(this.top)
      && this.checkForClass(this.right)
      && this.checkForClass(this.bottom)
      && this.checkForClass(this.left)) {
        this.square.classList.add(player);
        return true;
    }
    return false;
  }

  checkForClass(element) {
    if (element.classList.contains('Blue')
      || element.classList.contains('Red')) return true;
    return false;
  }
}

export default Game;