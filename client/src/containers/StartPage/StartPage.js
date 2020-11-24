import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { Dialog } from '../../componets';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './StartPage.css';

class StartPage extends Component {
  render() {
    const { user: currentUser } = this.props;
    if ( !currentUser ) {
      return <Redirect to="/auth"/>
    }
    const { showCreateGameDialog, showJoinGameDialog } = this.props;
    return (
      <Container className="StartPage-container">
        <h4 className="text-center">Welcome to the game Dots and Boxes</h4>
        <Dialog />
        <div display="flex">
          <Button
            variant="primary"
            className="StartPage-button"
            onClick={() => showCreateGameDialog()}
          >
            Create Game
          </Button>
          <Button
            variant="primary"
            className="StartPage-button"
            onClick={() => showJoinGameDialog()}
          >
            Join Game
          </Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.game.player,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);