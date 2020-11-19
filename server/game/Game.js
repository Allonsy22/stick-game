class Game {
  constructor() {
    this.size = null;
    this.availableMoves = [];
    this.squares = [];
    this.firstPlayer = 'Red';
    this.secondPlayer = 'Blue';
  };

  newGame(props) {
    const { size = 3 } = props;
    this.size = 2 * size - 1;
    this.availableMoves = [];
    this.squares = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i % 2 === 0 && j % 2 !== 0) {
          this.availableMoves.push({ i, j });
          continue;
        }
        if (i % 2 !== 0 && j % 2 === 0) {
          this.availableMoves.push({ i, j });
          continue;
        }
        if (i % 2 !== 0 && j % 2 !== 0) {
          this.squares.push(this.getSquare(i, j));
        }
      }
    }
  }

  makeMove(coords) {
    const { i, j } = coords;
    const filledSquareCoords = [];
    if (this.isAvalaibleMove(i, j)) {
      this.availableMoves = this.availableMoves.filter(coords => {
        return coords.i !== i || coords.j !== j;
      });
      this.squares.forEach(square => {
        if (square.isSquareFilled(i, j)) {
          filledSquareCoords.push(square.getSquareCoords());
        }
      });

      if (filledSquareCoords.length > 0) {
        return {
          nextTurn: true,
          filledSquareCoords,
          availableMoves: this.getAvailableMoves(),
        };
      } else {
        return {
          nextTurn: false,
          availableMoves: this.getAvailableMoves(),
        };
      }
    }
    return {
      nextTurn: true, 
      availableMoves: this.getAvailableMoves(),
    }
  }

  isAvalaibleMove(i, j) {
    let isAvailable = false;
    this.availableMoves.forEach(coords => {
      if (coords.i === i && coords.j === j) {
        isAvailable = true;
        return;
      }
    })
    return isAvailable;
  }

  isNextTurn() {

  }

  getSquare(i, j) {
    const top = { i: i - 1, j };
    const right = { i, j: j + 1 };
    const bottom = { i: i + 1, j };
    const left = { i, j: j - 1 };
    return new Square({ squareCoords: { i, j }, top, right, bottom, left });
  }

  getAvailableMoves() {
    return this.availableMoves;
  }
}

class Square {
  constructor(props) {
    const { squareCoords, top, right, bottom, left } = props;
    // squareCoords, top, right, bottom, left - are all object with coords
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.squareCoords = squareCoords;
    this.owned = false;
  }

  getSquareCoords() {
    return this.squareCoords;
  }

  isSquareFilled(i, j) {
    this.fillLine(i, j);
    if (!this.owned
      && this.top === 'filled'
      && this.right === 'filled'
      && this.bottom === 'fillde'
      && this.left === 'filled') {
      this.owned = true;
      return true;
    };
    return false;
  }

  fillLine(i, j) {
    if (this.checkLine(this.top, i, j)) this.top = 'filled';
    if (this.checkLine(this.right, i, j)) this.right = 'filled';
    if (this.checkLine(this.bottom, i, j)) this.bottom = 'filled';
    if (this.checkLine(this.left, i, j)) this.left = 'filled';
  }

  checkLine(line, i, j) {
    return line.i === i && line.j === j;
  }
}

module.exports = Game;