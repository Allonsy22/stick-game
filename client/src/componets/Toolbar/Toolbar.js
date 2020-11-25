import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import './Toolbar.css';

class Toolbar extends Component {
  state = {
    showDialog: false,
  };

  onHomeButtonClick() {
    const { deleteGame, history } = this.props;
    deleteGame();
    history.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  onStatisticsButtonClick() {
    const { getPlayerStatistics } = this.props;
    getPlayerStatistics();
    this.setState({showDialog: true});
  };

  renderStatisticsDialog() {
    const { showDialog } = this.state;
    const { statistics: {totalGames, winning, winRate} } = this.props;
    return (
      <Modal show={showDialog} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>My statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total games: {totalGames}</p>
          <p>Winning: {winning}</p>
          <p>Win rate: {winRate}%</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {this.setState({showDialog: false})}}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  renderButtonGroup() {
    const { logout } = this.props;
    return (
      <ButtonGroup>
        <Button
          className="mr-2"
          onClick={() => this.onStatisticsButtonClick()}
        >
          Statistics
        </Button>
        <Button className="mr-2" onClick={() => logout()}>Log Out</Button>
      </ButtonGroup>
    );
  };

  render() {
    const { user, statistics, isLoggedIn } = this.props;
    return (
      <Container className="mt-4 Toolbar-container">
        {statistics && this.renderStatisticsDialog()}
        <Row className="justify-content-between">
          <Button className="ml-2" onClick={() => this.onHomeButtonClick()}>Home</Button>
          {user && isLoggedIn && this.renderButtonGroup()}
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    statistics: state.stats.statistics,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    getPlayerStatistics: () => dispatch(actions.getPlayerStatistics()),
    deleteGame: () => dispatch(actions.deleteGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));