import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';

class Toolbar extends Component {
  renderButtonGroup() {
    const { logout, getPlayerStatistics } = this.props;
    return (
      <ButtonGroup>
        <Button 
          className="mr-2" 
          onClick={() => getPlayerStatistics()}
        >
          Statistics
        </Button>
        <Button onClick={() => logout()}>Log Out</Button>
      </ButtonGroup>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <Container className="mt-4">
        <Row className="justify-content-end">
          {user && this.renderButtonGroup()}
        </Row>
      </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    getPlayerStatistics: () => dispatch(actions.getPlayerStatistics()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);