import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './Canvas.css';

class Canvas extends Component {
  state = {
    size: this.props.size,
  };

  componentDidMount() {

  };

  renderPoint(i, j) {
    return <div className="Point" i={i} j={j} key={i+j}></div>;
  }

  renderHorizontalLine(i, j) {
    return (
      <div 
        className="Horizontal" 
        i={i} j={j} 
        key={i+j} 
        onClick={() => this.props.makeMove({i, j})}
      ></div>
    );
  }

  renderVerticalLine(i, j) {
    return <div className="Vertical" i={i} j={j} key={i+j}></div>;
  }

  renderSquare(i, j) {
    return <div className="Square" i={i} j={j} key={i+j}></div>;
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
    availableMoves: state.game.availableMoves,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    makeMove: (coords) => dispatch(actions.makeMove(coords)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);