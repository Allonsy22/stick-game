import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Canvas } from '../../componets';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class GamePage extends Component {
  render() {
    const { player, winner, size, user: currentUser, isLoggedIn } = this.props;

    if (!currentUser || !isLoggedIn) {
      return <Redirect to="/auth" />
    }
    return (
      <Container className="Container">
        <Row className="justify-content-md-center">
          <Canvas size={size} />
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
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps, null)(GamePage);