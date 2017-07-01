/* global Trello */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GridList } from 'material-ui/GridList';
import { makeSelectUserId } from '../../modules/user/userSelectors';
import { Board, Loader } from '../../components';

export class SettingsBoard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      boards: [],
    };
  }

  componentWillMount() {
    Trello.get(`/member/${this.props.userId}/boards`, (boards) => {
      this.setState({
        boards,
      });
    });
  }

  renderBoards = () =>
    this.state.boards.map((board, index) => (
      <Board board={board} key={index} />
    ));

  render() {
    const styles = {
      root: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        padding: '4em',
      },
    };

    return (
      <div style={styles.root}>
        <h3>Select a board</h3>
        { !this.state.boards &&
          <Loader />
        }
        <GridList
          cellHeight={100}
          padding={10}
          cols={4}
          style={styles.gridList}
        >
          {
            this.renderBoards()
          }
        </GridList>
      </div>
    );
  }
}

SettingsBoard.propTypes = {
  userId: React.PropTypes.string,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBoard);
