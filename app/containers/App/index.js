import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Loader } from '../../components';
import Menu from '../Menu';
import {
  makeSelectUserRehydrated,
  makeSelectUserId,
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
    browserHistory.push('/');
  }

  switchDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  render() {
    if (!this.props.userStoreRehydrated) return <Loader />;
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
  userStoreRehydrated: React.PropTypes.bool,
  userId: React.PropTypes.string,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  userStoreRehydrated: makeSelectUserRehydrated(),
  userId: makeSelectUserId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
