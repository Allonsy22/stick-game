import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Select } from '../index';

class Dialog extends Component {
  renderCreateDialog() {
    const { show, onClose } = this.props;
    return (
      <Modal show={show} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
          <Select />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>Close</Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  };

  renderJoinDialog() {
    const { show } = this.props;
    return (
      <Modal show={show} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Join Game</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input type="text"/>
          <Select />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    const { type } = this.props;
    return (
      <>
        { type === 'Create'
          ? this.renderCreateDialog()
          : this.renderJoinDialog()}
      </>
    )
  }
};

export default Dialog;