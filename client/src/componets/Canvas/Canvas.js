import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { isCoordsInArray } from '../../utils/isCoordsInArray';
import Line from './Line/Line';
import './Canvas.css';

class Canvas extends Component {
  state = {
    size: this.props.size,
  };

  componentDidMount() {

  };

  makeMove(props) {
    const { i, j } = props;
    const isCoords = isCoordsInArray({
      coords: {i, j},
      array: this.props.availableMoves
    });
    if (isCoords && this.props.isNextTurn) this.props.makeMove({i, j});
  }

  renderPoint(i, j) {
    return <div className="Point" i={i} j={j} key={i+j}></div>;
  }

  getLineOwner(i, j) {
    let owner;
    const isPlayerCoords = isCoordsInArray({
      coords: {i, j}, 
      array: this.props.playerMadeMoves,
    });
    const isOpponentCoords = isCoordsInArray({
      coords: {i, j}, 
      array: this.props.opponentMadeMoves,
    });
    if (isPlayerCoords) owner = this.props.player;
    if (isOpponentCoords) owner = this.props.opponent;
    return owner;
  }

  renderHorizontalLine(i, j) {
    const owner = this.getLineOwner(i, j);
    const props = {i, j, owner, type: 'Horizontal'};
    return <Line {...props} key={i + j}/>
  }

  renderVerticalLine(i, j) {
    const owner = this.getLineOwner(i, j);
    const props = {i, j, owner, type: 'Vertical'};
    return <Line {...props} key={i + j} />
  }

  renderSquare(i, j) {
    let owner;
    const isPlayerOwner = isCoordsInArray({
      coords: {i, j}, 
      array: this.props.playerOwnedSquares,
    });
    const isOpponentOwner = isCoordsInArray({
      coords: {i, j}, 
      array: this.props.opponentOwnedSquares,
    });

    if (isPlayerOwner) owner = this.props.player;
    if (isOpponentOwner) owner = this.props.opponent;

    const className = `Square ${owner}`;
    return <div className={className} i={i} j={j} key={i+j}></div>;
  }

  renderColumn(i, j) {
    if (i % 2 === 0 && j % 2 === 0) return this.renderPoint(i, j);
    if (i % 2 === 0 && j % 2 !== 0) return this.renderHorizontalLine(i, j);
    if (i % 2 !== 0 && j % 2 === 0) return this.renderVerticalLine(i, j);
    if (i % 2 !== 0 && j % 2 !== 0) return this.renderSquare(i, j);
  }

  renderField() {
    let { size } = this.state;
    size = 2 * size - 1;
    const rows = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(this.renderColumn(i, j));
      }
      rows.push(<div className="Row" key={i}>{row}</div>);
    }
    return rows;
  }

  render() {
    return (
      <div id="canvas" className="Canvas">{this.renderField()}</div>
    )
  }
}

Canvas.propTypes = {
  size: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    player: state.game.player,
    opponent: state.game.opponent,
    isNextTurn: state.game.isNextTurn,
    availableMoves: state.game.availableMoves,
    playerMadeMoves: state.game.playerMadeMoves,
    opponentMadeMoves: state.game.opponentMadeMoves,
    playerOwnedSquares: state.game.playerOwnedSquares,
    opponentOwnedSquares: state.game.opponentOwnedSquares,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    makeMove: (coords) => dispatch(actions.makeMove(coords)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);