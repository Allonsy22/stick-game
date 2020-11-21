import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class Select extends Component {
  state = {
    sizes: [
      {value: 3, text: '3x3'},
      {value: 5, text: '5x5'},
      {value: 7, text: '7x7'},
    ]
  };

  onValueChange(event) {
    const size = event.target.value;
    this.props.setGameSize(size);
  };

  render() {
    const { sizes } = this.state;
    const { size } = this.state;
    return (
      <Container>
        <p>{size}</p>
        <select onChange={(event) => this.onValueChange(event)}>
          {sizes.map( (size, index) => {
            return <option key={index} value={size.value}>{size.text}</option>
          })}
        </select>
      </Container>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setGameSize: (size) => dispatch(actions.setGameSize(size)),
  }
}

export default connect(null, mapDispatchToProps)(Select);