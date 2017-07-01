import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

export default class ColumnSelect extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleChangeColumn = (event, index, value) => {
    this.props.setColumnValue(value);
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.props.floatingLabel}
        value={this.props.columnValue}
        onChange={this.handleChangeColumn}
        style={{ width: '100%' }}
        errorText={!this.props.columnValue && this.props.errorText}
      >
        {
          _.map(this.props.getColumnList(this.props.columnValue), (column) => (
            <MenuItem key={column.id} value={column} primaryText={column.name} />
          ))
        }
      </SelectField>
    );
  }
}

ColumnSelect.propTypes = {
  columnValue: React.PropTypes.object,
  getColumnList: React.PropTypes.func,
  setColumnValue: React.PropTypes.func,
  errorText: React.PropTypes.string,
  floatingLabel: React.PropTypes.string,
};
