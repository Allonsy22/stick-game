import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Canvas } from '../../componets';
import * as actions from '../../store/actions/index';

class GamePage extends Component {
  onHomeButtonClick() {
    const { deleteGame, history } = this.props;
    deleteGame();
    history.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  renderSpiner() {
    return (
      <Row className="justify-content-md-center">
        <Spinner animation="border" />
        <span>Waiting for opponent</span>
      </Row>
    );
  }

  renderAlert(showAlert, type, text) {
    return (
      <Container className="mt-3">
        <Alert show={showAlert} variant={type}>
          <Alert.Heading>{text}</Alert.Heading>
          <div className="d-flex justify-content-end">
            {this.renderHomePageButton()}
          </div>
        </Alert>
      </Container>
    );
  }

  renderHomePageButton() {
    return (
      <Button onClick={() => this.onHomeButtonClick()} variant="outline-success">
        Home
      </Button>
    );
  }

  render() {
    const {
      player,
      winner,
      size,
      roomCode,
      user: currentUser,
      isLoggedIn,
      isGameReady,
      isOpponnentConnected: connected,
      updatePlayerStatistics,
    } = this.props;

    if (!currentUser || !isLoggedIn) {
      return <Redirect to="/auth" />;
    }

    if (winner) {
      updatePlayerStatistics(winner, player);
    }

    return (
      <Container className="mt-3">
        {!roomCode && this.renderAlert(!roomCode, 'warning', 'This room doesn\'t exist or unavailable')}
        {!connected && isGameReady && this.renderAlert(!connected, 'warning', 'Opponent lost connection')}
        {winner && this.renderAlert(true, 'success', `Winner is ${winner}`)}
        {!isGameReady && roomCode && this.renderSpiner()}
        {connected && isGameReady && (
          <>
            <Canvas size={size} />
            <Row className="justify-content-md-center">
              <p>
                Room code:
                <b>{roomCode}</b>
              </p>
            </Row>
            <Row className="justify-content-md-center">
              <p>
                Player:
                {player}
              </p>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.game.player,
  size: state.game.size,
  winner: state.game.winner,
  isGameReady: state.game.isGameReady,
  isOpponnentConnected: state.game.isOpponnentConnected,
  roomCode: state.game.roomCode,
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  deleteGame: () => dispatch(actions.deleteGame()),
  updatePlayerStatistics:
      (winner, currentPlayer) => dispatch(actions.updatePlayerStatistics(winner, currentPlayer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GamePage));
