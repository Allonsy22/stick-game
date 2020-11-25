const assert = require('assert');
const Game = require('../game/Game');

const game = new Game();
game.newGame(3);

describe("game logic test for game 3x3", function () {
  it("should return 12 available moves when game started", function () {
    const availableMoves = game.getAvailableMoves();
    assert.equal(availableMoves.length, 12);
  });
});

describe("game logic test for game 3x3", function () {
  it("should return true value for available move", function () {
    const bool = game.isAvalaibleMove(0, 1);
    assert.equal(bool, true);
  });
});

describe("game logic test for game 3x3", function () {
  it("should return false value for unavailable move", function () {
    const bool = game.isAvalaibleMove(0, 0);
    assert.equal(bool, false);
  });
});

describe("game logic test for game 3x3", function () {
  it("should return 11 available moves when made move", function () {
    game.makeMove({i: 0, j: 1});
    const availableMoves = game.getAvailableMoves();
    assert.equal(availableMoves.length, 11);
  });
});

describe("game logic test for game 3x3", function () {
  it("should return false when game is't over", function () {
    game.makeMove({i: 0, j: 1});
    const gameIsOver = game.isGameOver();
    assert.equal(gameIsOver, false);
  });
});

describe("game logic test for game 3x3", function () {
  it("should return true when game over", function () {
    const availableMoves = game.getAvailableMoves();
    availableMoves.forEach( move => {
      game.makeMove({i: move.i, j: move.j});
    });
    const gameIsOver = game.isGameOver();
    assert.equal(gameIsOver, true);
  });
});