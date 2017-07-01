/* global Trello */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import moment from 'moment';
import {
  makeSelectUserId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectValidateColumnId,
  makeSelectDoneColumnId,
} from '../../modules/user/userSelectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      doneCards: [],
      toDoCards: [],
      doingCards: [],
    };
  }

  componentWillMount() {
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

  renderDoneCards = () =>
    this.state.doneCards.map((doneCard, index) => (
      <ListItem
        key={index}
        primaryText={doneCard.name}
      />
    ));

  renderToDoCards = () =>
    this.state.toDoCards.map((toDoCard, index) => (
      <ListItem
        key={index}
        primaryText={toDoCard.name}
      />
    ));

  renderDoingCards = () =>
    this.state.doingCards.map((doingCard, index) => (
      <ListItem
        key={index}
        primaryText={doingCard.name}
      />
    ));

  render() {
    return (
      <div>
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
  backlogColumnId: makeSelectBacklogColumnId(),
  doingColumnId: makeSelectDoingColumnId(),
  validateColumnId: makeSelectValidateColumnId(),
  doneColumnId: makeSelectDoneColumnId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
