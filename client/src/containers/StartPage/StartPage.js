import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { Canvas, Dialog } from '../../componets';
import Button from 'react-bootstrap/Button';
import './StartPage.css';

class StartPage extends Component {

  render() {
    const { user: currentUser, logout } = this.props;
    if ( !currentUser ) {
      return <Redirect to="/auth"/>
    }
    const { showCreateGameDialog, showJoinGameDialog } = this.props;
    return (
      <div className="StartPage-container">
        <Button onClick={() => logout()}>Log Out</Button>
        <Dialog />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);