import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Canvas, Dialog } from '../../componets';
import Button from 'react-bootstrap/Button';
import './StartPage.css';

class StartPage extends Component {

  render() {
    return (
      <div className="StartPage-container">
        <h2>Dots and Boxes</h2>
        <Dialog/>
        <Canvas size={2} />
        <div display="flex">
          <Button 
            variant="primary" 
            className="StartPage-button" 
            onClick={() => this.showCreateDialog()}
          >Create Game</Button>
          <Button 
            variant="primary" 
            className="StartPage-button" 
            onClick={() => this.showJoinDialog()}
          >Join Game</Button>
        </div>
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