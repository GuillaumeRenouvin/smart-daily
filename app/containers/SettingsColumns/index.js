/* global Trello */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import {
  makeSelectBoardId,
  makeSelectBacklogColumnId,
  makeSelectDoingColumnId,
  makeSelectValidateColumnId,
  makeSelectDoneColumnId,
} from '../../modules/user/userSelectors';
import { changeColumnsId } from '../../modules/user/actions';
import ColumnSelect from './ColumnSelect';

export class SettingsColumns extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      backlogColumnValue: null,
      doingColumnValue: null,
      validateColumnValue: null,
      doneColumnValue: null,
      columnList: [],
    };
  }

  componentWillMount() {
    if (!this.props.boardId) {
      browserHistory.push('/settings/board');
      return;
    }
    Trello.get(`/boards/${this.props.boardId}/lists`, (list) => {
      this.setState({
        backlogColumnValue: _.filter(list, (column) => column.id === this.props.backlogColumnId)[0],
        doingColumnValue: _.filter(list, (column) => column.id === this.props.doingColumnId)[0],
        validateColumnValue: _.filter(list, (column) => column.id === this.props.validateColumnId)[0],
        doneColumnValue: _.filter(list, (column) => column.id === this.props.doneColumnId)[0],
        columnList: list,
      });
    });
  }

  getColumnList = (columnValue) =>
    _.chain(this.state.columnList).filter((column) =>
      !_.includes([
        this.state.backlogColumnValue,
        this.state.doingColumnValue,
        this.state.validateColumnValue,
        this.state.doneColumnValue,
      ], column)).concat(columnValue).compact().value();

  saveColumns = () => {
    if (this.state.backlogColumnValue && this.state.doingColumnValue && this.state.validateColumnValue && this.state.doneColumnValue) {
      this.props.onChangeColumnsId(this.state.backlogColumnValue.id, this.state.doingColumnValue.id, this.state.validateColumnValue.id, this.state.doneColumnValue.id);
      browserHistory.push('/');
    }
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flex: 1,
        padding: '4em',
        flexDirection: 'column',
      },
      title: {
        textAlign: 'left',
      },
      button: {
        height: '3em',
      },
    };

    return (
      <div style={styles.root}>
        <h2 style={styles.title} >Select a your columns</h2>
        <ColumnSelect
          columnValue={this.state.backlogColumnValue}
          getColumnList={(columnValue) => this.getColumnList(columnValue)}
          setColumnValue={(columnValue) => this.setState({ backlogColumnValue: columnValue })}
          errorText={'You need to select a backlog column'}
          floatingLabel={'Backlog column'}
        />
        <ColumnSelect
          columnValue={this.state.doingColumnValue}
          getColumnList={(columnValue) => this.getColumnList(columnValue)}
          setColumnValue={(columnValue) => this.setState({ doingColumnValue: columnValue })}
          errorText={'You need to select a doing column'}
          floatingLabel={'Doing column'}
        />
        <ColumnSelect
          columnValue={this.state.validateColumnValue}
          getColumnList={(columnValue) => this.getColumnList(columnValue)}
          setColumnValue={(columnValue) => this.setState({ validateColumnValue: columnValue })}
          errorText={'You need to select a validate column'}
          floatingLabel={'Validate column'}
        />
        <ColumnSelect
          columnValue={this.state.doneColumnValue}
          getColumnList={(columnValue) => this.getColumnList(columnValue)}
          setColumnValue={(columnValue) => this.setState({ doneColumnValue: columnValue })}
          errorText={'You need to select a done column'}
          floatingLabel={'Done column'}
        />
        <RaisedButton
          label="Save"
          primary
          buttonStyle={styles.button}
          onClick={() => this.saveColumns()}
          style={{ marginTop: '1em' }}
          fullWidth
        />
      </div>
    );
  }
}

SettingsColumns.propTypes = {
  boardId: React.PropTypes.string,
  backlogColumnId: React.PropTypes.string,
  doingColumnId: React.PropTypes.string,
  validateColumnId: React.PropTypes.string,
  doneColumnId: React.PropTypes.string,
  onChangeColumnsId: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeColumnsId: (backlogColumnId, doingColumnId, doneColumnId, validateColumnId) =>
      dispatch(changeColumnsId(backlogColumnId, doingColumnId, doneColumnId, validateColumnId)),
  };
}

const mapStateToProps = createStructuredSelector({
  boardId: makeSelectBoardId(),
  backlogColumnId: makeSelectBacklogColumnId(),
  doingColumnId: makeSelectDoingColumnId(),
  validateColumnId: makeSelectValidateColumnId(),
  doneColumnId: makeSelectDoneColumnId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsColumns);
