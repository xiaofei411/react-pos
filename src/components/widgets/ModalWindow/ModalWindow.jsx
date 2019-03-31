import React, { Component } from 'react';
import { Modal } from 'reactstrap';

class ModalWindow extends Component {

  render() {
    const { isOpen, toggle, children, modalDialogClass, backdrop } = this.props;
    //className: 'modal-content--payment',
    return (
      <div className="modal-inner">
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          backdrop={backdrop}
          size="lg"
          className={modalDialogClass}>

          {children}

        </Modal>
      </div>
    );
  }
}

export default ModalWindow;