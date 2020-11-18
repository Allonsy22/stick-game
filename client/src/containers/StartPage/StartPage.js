import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Canvas } from '../../componets';
import './StartPage.css';

class StartPage extends Component {
  render() {
    return (
      <div className="StartPage-container">
        <Canvas size={3}/>
        <button onClick={() => this.props.createGame(this.props.size)}>New Game</button>
        <button onClick={this.props.joinGame}>Join Game</button>
        <p>Player: {this.props.player}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
    size: state.game.size,
    availableMoves: state.game.availableMoves,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    createGame: (size) => dispatch(actions.createGame(size)),
    joinGame: () => dispatch(actions.joinGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);