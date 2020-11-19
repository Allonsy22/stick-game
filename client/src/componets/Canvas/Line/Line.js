import React, {Component } from 'react';
import { connect} from 'react-redux';
import { isCoordsInArray } from '../../../utils/utils';
import * as actions from '../../../store/actions/index';

class Line extends Component {
  makeMove(props) {
    const { i, j } = props;
    const isCoords = isCoordsInArray({
      coords: {i, j},
      array: this.props.availableMoves
    });
    if (isCoords && this.props.isNextTurn) this.props.makeMove({i, j});
  }
  render() {
    const { i, j, type, owner } = this.props;
    const className = `${type} ${owner}`;
    return (
      <div
        className={className}
        i={i} j={j}
        key={i + j}
        onClick={() => this.makeMove({ i, j })}
      ></div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isNextTurn: state.game.isNextTurn,
    availableMoves: state.game.availableMoves,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    makeMove: (coords) => dispatch(actions.makeMove(coords)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);