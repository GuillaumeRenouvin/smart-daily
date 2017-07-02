import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const styles = {
      container: {
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    };

    return (
      <div style={styles.container} >
        <CircularProgress size={80} thickness={7} />
      </div>
    );
  }
}
