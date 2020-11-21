import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Canvas } from '../../componets';
import Container from 'react-bootstrap/Container';

class GamePage extends Component {
  render() {
    const { player, winner, size, user: currentUser, isLoggedIn } = this.props;

    if (!currentUser || !isLoggedIn) {
      return <Redirect to="/auth"/>
    }
    return (
      <Container>
        <Canvas size={size} />
        <p>Player: {player}</p>
        {winner ? <p>Winner: {winner} </p> : null}
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