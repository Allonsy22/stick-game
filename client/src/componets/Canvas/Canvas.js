import React, { Component } from 'react';
import Game from '../../utils/Game';
import './Canvas.css';

export default class Canvas extends Component {
  state = {
    game: null,
  };

  componentDidMount() {
    let { game } = this.state;
    const canvas = document.getElementById('canvas');
    game = new Game({
      canvas: canvas,
      size: 3,
      player: 'Red',
      opponent: 'Blue',
    });
    game.newGame();
    this.setState({ game });
  };

  render() {
    return (
      <div id="canvas" className="Canvas"></div>
    )
  }
}