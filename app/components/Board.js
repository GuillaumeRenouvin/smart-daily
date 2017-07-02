import React from 'react';
import { GridTile } from 'material-ui/GridList';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeBoardId, changeColumnsId } from '../modules/user/actions';

export class Board extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  selectBoardCard = (board) => {
    this.props.onChangeBoardId(board.id);
    this.props.onChangeColumnsId(null, null, null, null);
    browserHistory.push('/settings/columns');
  }

  render() {
    return (
      <GridTile
        title={this.props.board.name}
        cols={1}
        rows={1}
        style={{ backgroundColor: this.props.board.prefs.background, cursor: 'pointer' }}
        onClick={() => this.selectBoardCard(this.props.board)}
      >
        <img
          src={this.props.board.prefs.backgroundImage}
          role={'presentation'}
        />
      </GridTile>
    );
  }
}

Board.propTypes = {
  onChangeBoardId: React.PropTypes.func,
  onChangeColumnsId: React.PropTypes.func,
  board: React.PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeBoardId: (userId) => dispatch(changeBoardId(userId)),
    onChangeColumnsId: (backlogColumnId, doingColumnId, doneColumnId, validateColumnId) =>
      dispatch(changeColumnsId(backlogColumnId, doingColumnId, doneColumnId, validateColumnId)),
  };
}

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
