/* global Trello */

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserId, makeSelectUserTrelloToken } from '../../modules/user/userSelectors';
import { changeUserId, changeUserTrelloToken } from '../../modules/user/actions';

export class TrelloLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.userId && this.props.userTrelloToken) {
      browserHistory.push('/');
    }
  }

  render() {
    const authenticationSuccess = () => {
      Trello.get('/member/me/', (user) => {
        this.props.onChangeUserId(user.id);
        this.props.onChangeUserTrelloToken(Trello.token());
        browserHistory.push('/');
      });
    };

    const styles = {
      container: {
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      },
    };

    const authenticate = () => {
      Trello.authorize({
        callback_method: 'fragment',
        type: 'redirect',
        return_url: '/',
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
      <div style={styles.container}>
        <h1>Smart Daily</h1>
        <FlatButton onClick={authenticate} >Login with Trello</FlatButton>
      </div>
    );
  }
}

TrelloLogin.propTypes = {
  onChangeUserId: React.PropTypes.func,
  onChangeUserTrelloToken: React.PropTypes.func,
  userId: React.PropTypes.string,
  userTrelloToken: React.PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUserId: (userId) => dispatch(changeUserId(userId)),
    onChangeUserTrelloToken: (userTrelloToken) => dispatch(changeUserTrelloToken(userTrelloToken)),
  };
}

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  userTrelloToken: makeSelectUserTrelloToken(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(TrelloLogin);
