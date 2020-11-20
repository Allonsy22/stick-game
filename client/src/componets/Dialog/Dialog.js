import React, { Component } from 'react';
import { connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Select } from '../index';
import * as actions from '../../store/actions/index';

class Dialog extends Component {
  renderCreateDialog() {
    const { 
      isCreateGameDialog, 
      closeCreateGameDialog,
      createGame
     } = this.props;
    return (
      <Modal show={isCreateGameDialog} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
          <Select />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeCreateGameDialog()}>Close</Button>
          <Button variant="primary" onClick={() => createGame()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  renderJoinDialog() {
    const { isJoinGameDialog, closeJoinGameDialog } = this.props;
    return (
      <Modal show={isJoinGameDialog} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Join Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input type="text"/>
          <Select />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeJoinGameDialog()}>Close</Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
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
  };
}


const mapDispatchToProps = dispatch => {
  return {
    closeCreateGameDialog: () => dispatch(actions.closeCreateGameDialog()),
    closeJoinGameDialog: () => dispatch(actions.closeJoinGameDialog()),
    createGame: () => dispatch(actions.createGame(2)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);