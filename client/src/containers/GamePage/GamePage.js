import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';

class GamePage extends Component {
  render() {
    const { player, winner } = this.props;
    return (
      <Container>
        <Canvas size={2} />
        <div display="flex">
          <Button
            variant="primary"
            className="StartPage-button"
            onClick={() => this.props.createGame(2)}
          >Create Game</Button>
          <Button
            variant="primary"
            className="StartPage-button"
            onClick={() => this.props.joinGame()}
          >Join Game</Button>
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    createGame: (size) => dispatch(actions.createGame(size)),
    joinGame: () => dispatch(actions.joinGame()),
    showCreateGameDialog: () => dispatch(actions.showCreateGameDialog()),
    showJoinGameDialog: () => dispatch(actions.showJoinGameDialog()),
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);