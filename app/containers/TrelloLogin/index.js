/* global Trello */

import React from 'react';
import { browserHistory } from 'react-router';
import { Flex } from 'reflexbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserId } from '../../modules/user/userSelectors';
import { changeUserId } from '../../modules/user/actions';

export class TrelloLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.userId) {
      browserHistory.push('/');
    }
  }

  render() {
    const authenticationSuccess = () => {
      Trello.get('/member/me/', (user) => {
        this.props.onChangeUserId(user.id);
        //browserHistory.push('/settings/board');
        browserHistory.push('/');
      });
    };

    const authenticate = () => {
      Trello.authorize({
        type: 'popup',
        name: 'Smart Daily',
        scope: {
          read: 'true',
          write: 'true' },
        expiration: 'never',
        success: authenticationSuccess,
        error: () => {},
      });
    };

    return (
      <Flex align={'center'} column>
        <h1>Smart Daily</h1>
        <h3>Automate your daily scrum tasks</h3>
        <button onClick={authenticate} >Login with Trello</button>
      </Flex>
    );
  }
}

TrelloLogin.propTypes = {
  onChangeUserId: React.PropTypes.func,
  userId: React.PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUserId: (userId) => dispatch(changeUserId(userId)),
  };
}

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(TrelloLogin);
