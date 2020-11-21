import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Select } from '../index';
import * as actions from '../../store/actions/index';

class Dialog extends Component {
  state = {
    roomCode: '',
  };

  onSubmitCreateGameHandler() {
    const { size, createGame } = this.props;
    this.setState({roomCode: 22});
    createGame(size);
  };

  onSubmitJoinGameHandler() {
    const { size, joinGame } = this.props;
    this.setState({roomCode: 22});
    joinGame(size);
  };

  onInputChange(event) {
    this.setState({roomCode: event.target.value});
  };

  renderCreateDialog() {
    const {
      isCreateGameDialog,
      closeCreateGameDialog,
    } = this.props;
    return (
      <Modal show={isCreateGameDialog} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Select game size</p>
          <Select />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeCreateGameDialog()}>Close</Button>
          <Button variant="primary" onClick={() => this.onSubmitCreateGameHandler()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  renderJoinDialog() {
    const { isJoinGameDialog, closeJoinGameDialog, joinGame } = this.props;
    const { roomCode } = this.state;
    return (
      <Modal show={isJoinGameDialog} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Join Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Input the room code</p>
          <input type="text" value={roomCode} onChange={(event) => this.onInputChange(event)}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeJoinGameDialog()}>Close</Button>
          <Button variant="primary" onClick={() => this.onSubmitJoinGameHandler()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    // const { roomCode } = this.props;
    const { roomCode } = this.state;
    if (roomCode) {
      return <Redirect to={`/game/${roomCode}`}/>
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
    createGame: (size) => dispatch(actions.createGame(size)),
    joinGame: (roomCode) => dispatch(actions.joinGame(roomCode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);