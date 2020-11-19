import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Canvas, Button } from '../../componets';
import './StartPage.css';

class StartPage extends Component {
  render() {
    return (
      <div className="StartPage-container">
        <Canvas size={2}/>
        <div display="flex">
          <Button text="Create Game" type="Create"/>
          <Button text="Join Game" type="Join"/>
        </div>
        <button onClick={() => this.props.createGame(2)}>New Game</button>
        <button onClick={this.props.joinGame}>Join Game</button>
        <p>Player: {this.props.player}</p>
        <p>Winner: {this.props.winner}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
    size: state.game.size,
    winner: state.game.winner,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    createGame: (size) => dispatch(actions.createGame(size)),
    joinGame: () => dispatch(actions.joinGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);