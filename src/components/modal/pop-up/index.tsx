import React, { Component, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../../components';
import { connect } from 'react-redux';
import { updatePopUpModal } from '../../../actions';

interface DispatchProps {
  updatePopUpModal: (modalType: string | null) => void;
}

interface Props extends DispatchProps {
  children: ReactNode;
  header: string;
}

class PopUpModalComponent extends Component<Props> {
  handleModalType = (modalType: string | null): (() => void) => (): void =>
    this.props.updatePopUpModal(modalType);

  render(): ReactNode {
    const { children, header } = this.props;
    let target = document.getElementById('modal-root');
    if (!target) {
      target = document.createElement('div');
      target.setAttribute('id', 'modal-root');
      document.body.appendChild(target);
    }
    return createPortal(
      <div className={'pop-up-modal'}>
        <div className="pop-up-modal__container">
          <div className="pop-up-modal__container--heading">
            <p className={'pop-up-modal__container--heading--title'}>
              {header}
            </p>
            <div
              className="pop-up-modal__container--heading--icon-container"
              onClick={this.handleModalType(null)}
            >
              <CloseIcon />
            </div>
          </div>

          <div className="pop-up-modal__container--content">{children}</div>
        </div>
      </div>,
      target
    );
  }
}

export default connect((): {} => ({}), { updatePopUpModal })(
  PopUpModalComponent
);
