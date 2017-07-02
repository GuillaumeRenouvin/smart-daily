/* global Trello */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GridList } from 'material-ui/GridList';
import _ from 'lodash';
import { Loader, Board } from '../../components';
import { makeSelectUserId } from '../../modules/user/userSelectors';

export class SettingsBoard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      imagesLeftToLoad: 1,
    };
  }

  componentWillMount() {
    Trello.get(`/member/${this.props.userId}/boards`, (boards) => {
      this.setState({
        boards,
        imagesLeftToLoad: _.filter(boards, (board) => board.prefs.backgroundImage).length,
      });
    });
  }

  handleImageLoaded() {
    this.setState({ imagesLeftToLoad: this.state.imagesLeftToLoad - 1 });
  }

  renderBoards = () =>
    this.state.boards.map((board, index) => (
      <Board board={board} key={index} handleImageLoaded={() => this.handleImageLoaded()} />
    ));

  render() {
    const styles = {
      root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '4em',
      },
      title: {
        textAlign: 'left',
      },
      boardsContainer: {
        visibility: (this.state.imagesLeftToLoad <= 0) ? 'visible' : 'hidden',
      },
    };

    return (
      <div style={styles.root}>
        { this.state.imagesLeftToLoad > 0 && <Loader />}
        <div style={styles.boardsContainer} >
          <h2 style={styles.title} >Select a board</h2>
          <GridList
            cellHeight={200}
            padding={20}
            cols={1}
          >
            {
              this.renderBoards()
            }
          </GridList>
        </div>
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
