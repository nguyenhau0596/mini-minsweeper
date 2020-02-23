import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import { changeLevel } from 'redux/actions/configuration';
import { getMines } from 'redux/actions/mine';
import { LEVEL, BOARD_SIZE, BOARD_MINES, FETCH_STATUS } from 'constants/WebConfig';
import { initBoardData, isWonGame } from 'utils/Utilities';
import { Cell } from 'shared/Cell';
import { URLS } from 'constants/Urls';

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isWin: false,
      isBegan: false,
      startTime: null,
      endTime: null,
      endGame: false
    }
    this.generateData = this.generateData.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.generateData();
  }

  static getDerivedStateFromProps(props, state) {
    const { level, minesStatus, minesData } = props;
    if (minesStatus === FETCH_STATUS.LOADED && minesData && minesData.length > 0 && state.data.length === 0) {
      const size = level === LEVEL.BEGINNER ? BOARD_SIZE.BEGINNER : BOARD_SIZE.ADVANCED;
      return {
        data: initBoardData(minesData, size)
      }
    }
    return null;
  }

  generateData() {
    const { level, getMines } = this.props;

    if (level === LEVEL.BEGINNER) {
      getMines(BOARD_SIZE.BEGINNER, BOARD_MINES.BEGINNER);
    }

    if (level === LEVEL.ADVANCED) {
      getMines(BOARD_SIZE.ADVANCED, BOARD_MINES.ADVANCED);
    }
  }

  onCellClick(x, y) {
    if (this.state.endGame) {
      return;
    }

    // Start game on first click
    if (!this.state.isBegan) {
      this.setState({
        isBegan: true,
        startTime: Date.now(),
        endTime: null
      });
    }

    const newData = cloneDeep(this.state.data);
    newData[x][y].clicked = true;
    this.setState({ data: newData });

    // Lost game
    if (newData[x][y].isMine) {
      this.onLoseGame();
    }

    // Won game
    const isWon = isWonGame(newData);
    if (isWon) {
      this.onWonGame();
    }
  }

  onLoseGame() {
    this.setState({
      isWin: false,
      endGame: true,
      endTime: Date.now()
    });
    this.revealAllCell();
  }

  onWonGame() {
    this.setState({
      isWin: true,
      endGame: true,
      endTime: Date.now()
    });
  }

  revealAllCell() {
    const newData = cloneDeep(this.state.data);
    for (let x = 0 ; x < newData.length; x++ ) {
      for (let y = 0 ; y < newData.length; y++ ) {
        newData[x][y].clicked = true;
      }
    }
    this.setState({ data: newData });
  }

  renderBoard() {
    const { data } = this.state;
    return (
      <div className='text-center'>
        {data.map((row, xIndex) => <div className='text-center board-row' key={xIndex}>
          {row.map((item, index) => <Cell {...item} key={index} onClick={this.onCellClick}/>)}
        </div>)}
      </div>
    )
  }

  resetGame() {
    this.setState({
      data: [],
      isWin: false,
      isBegan: false,
      startTime: null,
      endTime: null,
      endGame: false
    });
    this.generateData();
  }

  goHome() {
    const { history } = this.props;
    if (history) {
      history.push(URLS.HOME)
    }
  }

  renderResult() {
    const {
      endGame,
      isWin,
      startTime,
      endTime
    } = this.state;
    const time = moment.utc(endTime - startTime).format('HH:mm:ss');

    return (
      <React.Fragment>
        {endGame && <div className='board-result'>
          {isWin && (
            <div className="alert alert-success text-center" role="alert">
              You won the game in {time}
            </div>
          )}
          {!isWin && (
            <div className="alert alert-danger text-center" role="alert">
              You lost the game in {time}
            </div>
          )}
          <div className='text-center'>
            <button type="button" className="btn btn-success" onClick={this.resetGame}>
              New game
            </button>
            <button type="button" className="btn btn-primary ml-10" onClick={this.goHome}>
              Home
            </button>
          </div>
        </div>}
      </React.Fragment>
    )
  }

  render() {
    const { minesStatus } = this.props;
    const { data } = this.state;

    return (
      <React.Fragment>
        <h1 className='display-4 text-center'>Mini Minesweeper</h1>
        {(minesStatus === FETCH_STATUS.LOADING) && (
          <div className='text-center'>Loading...</div>
        )}
        {(minesStatus === FETCH_STATUS.FAILED) && (
          <div className='text-center'>
            <button className="btn btn-primary" onClick={this.generateData}>Retry</button>
          </div>
        )}
        {(minesStatus === FETCH_STATUS.LOADED && data && data.length > 0) && (
          this.renderBoard()
        )}
        {this.renderResult()}
      </React.Fragment>
    );
  }
}

function mapState(state) {
  return {
    level: state.configuration ? state.configuration.level : null,
    minesData: state.mines ? state.mines.data : null,
    minesStatus: state.mines ? state.mines.status : null,
  }
}

function mapDispatch(dispatch) {
  return {
    changeLevel: bindActionCreators(changeLevel, dispatch),
    getMines: bindActionCreators(getMines, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Board);
