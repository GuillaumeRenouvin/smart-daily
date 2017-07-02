/* global Trello */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import moment from 'moment';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionFace from 'material-ui/svg-icons/action/face';
import CardDialog from './CardDialog';
import { Loader } from '../../components';
import {
  makeSelectUserId,
  makeSelectUserTrelloToken,
  makeSelectBoardId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectValidateColumnId,
  makeSelectDoneColumnId,
} from '../../modules/user/userSelectors';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      doneCards: [],
      toDoCards: [],
      doingCards: [],
      modalState: false,
      selectedCard: null,
    };
  }

  componentWillMount() {
    if (this.props.userTrelloToken) {
      Trello.setToken(this.props.userTrelloToken);
    }
    if (!this.props.userId || !this.props.userTrelloToken) {
      browserHistory.push('/login/trello');
      return;
    }
    if (!this.props.boardId) {
      browserHistory.push('/settings/board');
      return;
    }
    if (!this.props.backlogColumnId || !this.props.doingColumnId || !this.props.validateColumnId || !this.props.doneColumnId) {
      browserHistory.push('/settings/columns');
      return;
    }

    this.setDoneCards();
    this.setToDoCards();
    this.setDoingCards();
  }

  getPreviousWorkday = () =>
    [1, 2, 3, 4, 5].indexOf(moment().subtract(1, 'day').day()) > -1 ?
      moment().subtract(1, 'day').subtract(2, 'hour') : moment(moment().day(-2)).subtract(2, 'hour');

  setDoneCards() {
    this.setState({
      doneCards: [],
    });
    Trello.get(`/lists/${this.props.doneColumnId}/cards?filter=open`, (cards) => {
      _.chain(cards).filter((card) => _.includes(card.idMembers, this.props.userId))
        .value()
        .forEach((card) => {
          Trello.get(`/cards/${card.id}/actions?format=count&since=${this.getPreviousWorkday().toDate()}`, (actionsCount) => {
            /* eslint no-underscore-dangle: ["error", { "allow": ["_value"] }] */
            if (actionsCount._value > 0) {
              this.setState({
                doneCards: _.concat(this.state.doneCards, card),
              });
            }
          });
        });
    });
  }

  setToDoCards() {
    Trello.get(`/lists/${this.props.backlogColumnId}/cards?filter=open`, (cards) => {
      this.setState({
        toDoCards: cards,
      });
    });
  }

  setDoingCards() {
    this.setState({
      doingCards: [],
    });
    Trello.get(`/lists/${this.props.validateColumnId}/cards?filter=open`, (cards) => {
      const cardsToAdd = _.chain(cards).filter((card) => _.includes(card.idMembers, this.props.userId)).value();
      this.setState({
        doingCards: _.concat(this.state.doingCards, cardsToAdd),
      });
    });
    Trello.get(`/lists/${this.props.doingColumnId}/cards?filter=open`, (cards) => {
      const cardsToAdd = _.chain(cards).filter((card) => _.includes(card.idMembers, this.props.userId)).value();
      this.setState({
        doingCards: _.concat(this.state.doingCards, cardsToAdd),
      });
    });
  }

  displayModalCard = (card) => {
    this.setState({ modalState: true });
    this.setState({ selectedCard: card });
  }

  subscribeToDoCard = (card) => {
    let newIdMembersArray = [];
    if (!_.includes(card.idMembers, this.props.userId)) {
      newIdMembersArray = _.concat(card.idMembers, this.props.userId);
    } else newIdMembersArray = _.filter(card.idMembers, (id) => id !== this.props.userId);

    Trello.put(`/cards/${card.id}/idMembers?value=${_.join(newIdMembersArray, ',')}`, (result) => {
      this.setState({
        toDoCards: _.map(this.state.toDoCards, (el) => (el.id === result.id) ? result : el),
      });
      return newIdMembersArray;
    });
  }

  renderDoneCards = () =>
    this.state.doneCards.map((doneCard, index) => (
      <ListItem
        key={index}
        primaryText={doneCard.name}
        secondaryText={_.map(doneCard.labels, (label) => label.name).join('/')}
        leftIcon={<div />}
        style={{ textAlign: 'left' }}
        rightIcon={<ActionInfo onClick={() => this.displayModalCard(doneCard)} />}
      />
    ));

  renderDoingCards = () =>
    this.state.doingCards.map((doingCard, index) => (
      <ListItem
        key={index}
        primaryText={doingCard.name}
        secondaryText={_.map(doingCard.labels, (label) => label.name).join('/')}
        leftIcon={<div />}
        style={{ textAlign: 'left' }}
        rightIcon={<ActionInfo onClick={() => this.displayModalCard(doingCard)} />}
      />
    ));

  renderToDoCards = () =>
    this.state.toDoCards.map((toDoCard, index) => {
      const leftIcon = _.includes(toDoCard.idMembers, this.props.userId) ?
        <ActionFace /> :
        <div />;
      return (
        <ListItem
          key={index}
          primaryText={<button style={{ textAlign: 'left', padding: 0, margin: 0 }} onClick={() => this.subscribeToDoCard(toDoCard)} >{toDoCard.name}</button>}
          secondaryText={_.map(toDoCard.labels, (label) => label.name).join('/')}
          leftIcon={leftIcon}
          style={{ textAlign: 'left' }}
          rightIcon={<ActionInfo style={{ verticalAlign: 'middle', lineHeight: '36px' }} onClick={() => this.displayModalCard(toDoCard)} />}
        />
      );
    });

  render() {
    if (!this.props.backlogColumnId || !this.props.doingColumnId || !this.props.validateColumnId || !this.props.doneColumnId) {
      return <Loader />;
    }
    return (
      <div>
        <CardDialog
          card={this.state.selectedCard}
          modalState={this.state.modalState}
          handleModalClose={() => this.setState({ modalState: false })}
        />
        <List>
          <Subheader>Done yesterday</Subheader>
          { this.renderDoneCards() }
        </List>
        <Divider />
        <List>
          <Subheader>Doing</Subheader>
          { this.renderDoingCards() }
        </List>
        <Divider />
        <List>
          <Subheader>To do</Subheader>
          { this.renderToDoCards() }
        </List>
        <Divider />
      </div>
    );
  }
}

HomePage.propTypes = {
  userId: React.PropTypes.string,
  userTrelloToken: React.PropTypes.string,
  boardId: React.PropTypes.string,
  backlogColumnId: React.PropTypes.string,
  doingColumnId: React.PropTypes.string,
  validateColumnId: React.PropTypes.string,
  doneColumnId: React.PropTypes.string,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  userTrelloToken: makeSelectUserTrelloToken(),
  boardId: makeSelectBoardId(),
  backlogColumnId: makeSelectBacklogColumnId(),
  doingColumnId: makeSelectDoingColumnId(),
  validateColumnId: makeSelectValidateColumnId(),
  doneColumnId: makeSelectDoneColumnId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
