import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeLevel } from 'redux/actions/configuration';
import { LEVEL } from 'constants/WebConfig';
import { URLS } from 'constants/Urls';

class Home extends React.Component {
  constructor() {
    super();
    this.changeLevel = this.changeLevel.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  changeLevel(e) {
    const { changeLevel } = this.props;
    if (changeLevel) {
      changeLevel(parseInt(e.target.value, 10));
    }
  }

  startGame() {
    const { history } = this.props;
    if (history) {
      history.push(URLS.BOARD);
    }
  }

  render() {
    const { level } = this.props;
    return (
      <React.Fragment>
        <h1 className='display-4 text-center'>Welcome to Mini Minesweeper</h1>
        <form className='level-form'>
          <div className="form-group">
            <label>Level</label>
            <select className="form-control" value={level} onChange={this.changeLevel}>
              <option value={LEVEL.BEGINNER}>Beginner</option>
              <option value={LEVEL.ADVANCED}>Advanced</option>
            </select>
          </div>
        </form>
        <div className="text-center">
          <button className="btn btn-primary" onClick={this.startGame}>Start</button>
        </div>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  return {
    level: state.configuration ? state.configuration.level : null
  }
}

function mapDispatch(dispatch) {
  return {
    changeLevel: bindActionCreators(changeLevel, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Home);
