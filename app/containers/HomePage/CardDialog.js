import React from 'react';
import Dialog from 'material-ui/Dialog';
import ReactMarkdown from 'react-markdown';

export default class CardDialog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const dialogTitle = this.props.card ? this.props.card.name : '';
    return (
      <Dialog
        title={dialogTitle}
        modal={false}
        open={this.props.modalState}
        onRequestClose={this.props.handleModalClose}
      >
        { this.props.card &&
          <div>
            <ReactMarkdown source={this.props.card.desc} />
          </div>
        }
      </Dialog>
    );
  }
}

CardDialog.propTypes = {
  card: React.PropTypes.object,
  modalState: React.PropTypes.bool,
  handleModalClose: React.PropTypes.func,
};
