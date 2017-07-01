import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Menu from '../Menu';
import {
  makeSelectUserId,
  makeSelectBoardId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectDoneColumnId,
  makeSelectValidateColumnId,
} from '../../modules/user/userSelectors';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };

    this.switchDrawer = this.switchDrawer.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) {
      browserHistory.push('/login/trello');
    } else if (!this.props.boardId) {
      browserHistory.push('/settings/board');
    } else if (!this.props.backlogColumnId || !this.props.doingColumnId || !this.props.doneColumnId || !this.props.validateColumnId) {
      browserHistory.push('/settings/columns');
    }
  }

  switchDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    return (
      <div>
        { this.props.userId &&
          <Menu />
        }
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  userId: React.PropTypes.string,
  boardId: React.PropTypes.string,
  backlogColumnId: React.PropTypes.string,
  doingColumnId: React.PropTypes.string,
  doneColumnId: React.PropTypes.string,
  validateColumnId: React.PropTypes.string,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  boardId: makeSelectBoardId(),
  backlogColumnId: makeSelectBacklogColumnId(),
  doingColumnId: makeSelectDoingColumnId(),
  doneColumnId: makeSelectDoneColumnId(),
  validateColumnId: makeSelectValidateColumnId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
