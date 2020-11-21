import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Canvas } from '../../componets';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

class GamePage extends Component {
  renderSpiner() {
    return (
      <Row>
        <Spinner animation="border"></Spinner>
        <span>Waiting for opponent</span>
      </Row>
    )
  };

  render() {
    const { 
      player, 
      winner, 
      size,
      roomCode,
      user: currentUser, 
      isLoggedIn,
      isOpponentReady,
     } = this.props;

    if (!currentUser || !isLoggedIn) {
      return <Redirect to="/auth" />
    }
    return (
      <Container className="mt-3">
        {/* <Row className="justify-content-md-center">
          {isOpponentReady 
            ? <Canvas size={size} />
            :  this.renderSpiner()}
        </Row> */}
        <Canvas size={size} />
        <Row className="justify-content-md-center">
          <p>Room code: <b>{roomCode}</b></p>
        </Row>
        <Row className="justify-content-md-center">
          <p>Player: {player}</p>
        </Row>
        <Row className="justify-content-md-center">
          {winner ? <p>Winner: {winner} </p> : null}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
    size: state.game.size,
    winner: state.game.winner,
    isOpponentReady: state.game.isOpponentReady,
    roomCode: state.game.roomCode,
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(GamePage);