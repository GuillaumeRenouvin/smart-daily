import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { logout } from '../../modules/user/actions';

export class Menu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      open: false,
      selectedListItemKey: 'HOME',
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  switchDrawer = () =>
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });

  redirect = (link, key) => {
    browserHistory.push(link);
    this.setState({
      selectedListItemKey: key,
    });
  }

  logout = () => {
    this.props.onLogout();
    browserHistory.push('/login/trello');
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.drawerOpen}
          containerStyle={{ top: '64px' }}
        >
          <List style={{ padding: 0 }}>
            <ListItem
              primaryText={'Home'}
              onClick={() => this.redirect('/', 'HOME')}
              leftIcon={<ContentInbox />}
              style={this.state.selectedListItemKey === 'HOME' ? { backgroundColor: '#dfdfdf' } : {}}
            />
            <ListItem
              primaryText={'Settings'}
              leftIcon={<ContentInbox />}
              primaryTogglesNestedList
              nestedItems={[
                <ListItem
                  key={1}
                  onClick={() => this.redirect('/settings/board', 'BOARD')}
                  primaryText={'Board'}
                  leftIcon={<ContentInbox />}
                  style={this.state.selectedListItemKey === 'BOARD' ? { backgroundColor: '#dfdfdf' } : {}}
                />,
                <ListItem
                  key={2}
                  onClick={() => this.redirect('/settings/columns', 'COLUMNS')}
                  primaryText={'Columns'}
                  leftIcon={<ContentInbox />}
                  style={this.state.selectedListItemKey === 'COLUMNS' ? { backgroundColor: '#dfdfdf' } : {}}
                />,
              ]}
            />
            <ListItem
              primaryText={'Logout'}
              onClick={() => this.logout()}
              leftIcon={<ContentInbox />}
            />
          </List>
        </Drawer>
        <AppBar onLeftIconButtonTouchTap={this.switchDrawer} />
      </div>
    );
  }
}

Menu.propTypes = {
  onLogout: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
