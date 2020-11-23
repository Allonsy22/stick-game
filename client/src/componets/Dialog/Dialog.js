import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Select } from '../index';
import * as actions from '../../store/actions/index';

class Dialog extends Component {
  state = {
    roomValue: '',
    isGame: false,
    showAlert: false,
  };

  onCreateButtonClick() {
    const { getRoomCode } = this.props;
    getRoomCode();
    this.setShowAlert(true);
  };

  onJoinButtonClick() {
    const { setRoomCode } = this.props;
    const { roomValue } = this.state;
    setRoomCode(roomValue);
    this.setShowAlert(true);
  };

  onInputChange(event) {
    this.setState({ roomValue: event.target.value });
  };

  setShowAlert(isAlert) {
    this.setState({ showAlert: isAlert });
  };

  onSubmitCreateGame() {
    const { size, createGame, roomCode } = this.props;
    createGame(size, roomCode);
    this.setState({ isGame: true });
    this.setShowAlert(false);
  }

  onSubmitJoinGame() {
    const { joinGame, roomCode } = this.props;
    joinGame(roomCode);
    this.setState({ isGame: true });
    this.setShowAlert(false);
  }

  renderCreateDialog() {
    const { isCreateGameDialog, closeCreateGameDialog, roomCode } = this.props;
    const { showAlert } = this.state;
    return (
      <Modal show={isCreateGameDialog} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>
        { showAlert
          ? <Alert show={showAlert} variant="success">
            <Alert.Heading>Your room is {roomCode}</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={() => this.onSubmitCreateGame()} variant="outline-success">
                OK!
              </Button>
            </div>
          </Alert>
          : <>
            <Modal.Body>
              <p>Select game size</p>
              <Select />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeCreateGameDialog()}>Close</Button>
              <Button variant="primary" onClick={() => this.onCreateButtonClick()}>Create</Button>
            </Modal.Footer>
          </>}
      </Modal>
    )
  };

  renderJoinDialog() {
    const { isJoinGameDialog, closeJoinGameDialog, roomCode } = this.props;
    const { roomValue, showAlert } = this.state;
    return (
      <Modal show={isJoinGameDialog} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Join Game</Modal.Title>
        </Modal.Header>
        { showAlert
          ? <Alert show={showAlert} variant="success">
            <Alert.Heading>You are joing to the room {roomCode}</Alert.Heading>
            <div className="d-flex justify-content-end">
              <Button onClick={() => this.onSubmitJoinGame()} variant="outline-success">
                OK!
              </Button>
            </div>
          </Alert>
          : <>
            <Modal.Body>
              <p>Input the room code</p>
              <input type="text" value={roomValue} onChange={(event) => this.onInputChange(event)} />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeJoinGameDialog()}>Close</Button>
              <Button variant="primary" onClick={() => this.onJoinButtonClick()}>Join</Button>
            </Modal.Footer>
          </>}
      </Modal>
    )
  }

  render() {
    const { isGame } = this.state;
    const { roomCode } = this.props;
    if (isGame) {
      return <Redirect to={`/game/${roomCode}`} />
    }
    return (
      <>
        {this.renderCreateDialog()}
        {this.renderJoinDialog()}
      </>
    )
  }
};

const mapStateToProps = state => {
  return {
    isCreateGameDialog: state.dialog.isCreateGameDialog,
    isJoinGameDialog: state.dialog.isJoinGameDialog,
    size: state.game.size,
    roomCode: state.game.roomCode,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    closeCreateGameDialog: () => dispatch(actions.closeCreateGameDialog()),
    closeJoinGameDialog: () => dispatch(actions.closeJoinGameDialog()),
    createGame: (size, roomCode) => dispatch(actions.createGame(size, roomCode)),
    joinGame: (roomCode) => dispatch(actions.joinGame(roomCode)),
    getRoomCode: () => dispatch(actions.getRoomCode()),
    setRoomCode: (roomCode) => dispatch(actions.setRoomCode(roomCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);