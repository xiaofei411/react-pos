import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hide as hideModal, show as showModal } from 'actions/modal';
import * as modalSelectors from 'data/selectors/modal';
import ModalWrapper from 'components/widgets/ModalWindow/ModalWindow';

const HOC = (Comp, mapStateOwn, mapDispatchOwn) => {
  class CompHoc extends Component {

    state = {

    };

    hide = e => {
      if (!this.props.isShow)
        return;

      this.props.hideModal();
      if (typeof this.props.onDone === 'function') this.props.onDone();
    }

    render() {
      const { isShow, hideModal, id } = this.props;

      const bakdropModals = {
        'PAYMENTS_CREDIT_SUCCESS': 'static',
        'PAYMENTS_SOLD': 'static',
        'PAYMENTS_CONFIRM': 'static',
        'CANCEL_TRANSACTION_CONFIRM': 'static',
        'PAYMENTS_CREDITS': 'static',
        'USER_CREATE': 'static',
        'PAYMENTS_MAIN': 'static',
      }

      if (!isShow)
        return null;

      return (
        <ModalWrapper
          isOpen={isShow}
          toggle={this.hide}
          modalDialogClass="modal-dialog--wrapper"
          backdrop={bakdropModals[id]}>

          <Comp {...this.props} />
        </ModalWrapper>
      );
    }
  }

  return connect(
    (s, o) => mapProps(s, o, mapStateOwn),
    (d, o) => mapDispatch(d, o, mapDispatchOwn))(CompHoc);
}


const mapProps = (state, ownProps, ownMap) => {
  let ownMapped = {};
  if (typeof ownMap === "function")
    ownMapped = ownMap(state, ownProps);

  var showId = modalSelectors.toShowId(state);
  var hideId = modalSelectors.toHideId(state);
  var isShow = showId != null && showId === ownProps.id;

  return {
    ...ownMapped,
    showId,
    isShow,
    hideId
  };
}

const mapDispatch = (dispatch, ownProps, ownMap) => {
  let ownMapped = {};

  if (typeof ownMap === "function")
    ownMapped = ownMap(dispatch, ownProps);

  return {
    ...ownMapped,
    dispatch,
    hideModal: () => dispatch(hideModal(ownProps.id))
  }
}


export default (component, mapStateOwn, mapDispatchOwn) => HOC(component, mapStateOwn, mapDispatchOwn);