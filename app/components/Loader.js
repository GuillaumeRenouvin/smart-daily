import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CircularProgress size={80} thickness={7} />
    );
  }
}
