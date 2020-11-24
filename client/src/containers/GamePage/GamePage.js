import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Canvas } from '../../componets';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class GamePage extends Component {
  onHomeButtonClick() {
    const { deleteGame } = this.props;
    deleteGame();
    window.location.reload();
  };

  renderSpiner() {
    return (
      <Row>
        <Spinner animation="border"></Spinner>
        <span>Waiting for opponent</span>
      </Row>
    )
  };

  renderWarningAlert(showAlert, warning) {
    return (
      <Container className="mt-3">
        <Alert show={showAlert} variant="warning">
          <Alert.Heading>{warning}</Alert.Heading>
          <div className="d-flex justify-content-end">
            {this.renderHomePage()}
          </div>
        </Alert>
      </Container>
    );
  };

  renderHomePage() {
    return (
      <Link to={"/"} className="nav-link">
        <Button onClick={() => this.onHomeButtonClick()} variant="outline-success">
          Home!
        </Button>
      </Link>
    );
  };

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
    } = this.props;

    const invalidGame = !roomCode && !connected && !isGameReady;
    if (!currentUser || !isLoggedIn || invalidGame) {
      return <Redirect to="/auth" />
    }

    return (
      <Container className="mt-3">
        {this.renderHomePage()}
        {!roomCode && this.renderWarningAlert(!roomCode, "This room doesn't exist or unavailable")}
        {!connected && isGameReady && this.renderWarningAlert(!connected, 'Opponent lost connection')}
        <Row className="justify-content-md-center">
          {!isGameReady && this.renderSpiner()}
        </Row>
        {connected && isGameReady && (
          <>
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
          </>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
    size: state.game.size,
    winner: state.game.winner,
    isGameReady: state.game.isGameReady,
    isOpponnentConnected: state.game.isOpponnentConnected,
    roomCode: state.game.roomCode,
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    deleteGame: () => dispatch(actions.deleteGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);