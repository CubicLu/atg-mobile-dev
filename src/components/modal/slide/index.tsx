import React from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import { connect } from 'react-redux';
import { updateSettingsModal } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { ModalSlideInterface } from '../../../interfaces';
import { setHeight } from '../../../utils';
import { Header } from '../..';
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
interface StateProps {
  modal: ModalSlideInterface;
}
interface Props extends StateProps, DispatchProps {}
class ModalSlideComponent extends React.Component<Props> {
  rightCloseOnClick = (): void => {
    //@ts-ignore
    // eslint-disable-next-line no-restricted-globals,no-undef,no-undef
    if (window.deviceready && StatusBar && !StatusBar.isVisible) {
      //@ts-ignore
      // eslint-disable-next-line no-restricted-globals,no-undef,no-undef
      StatusBar.show();
    }
    // eslint-disable-next-line no-restricted-globals
    screen.orientation.lock('portrait');
    this.props.updateSettingsModal(null);
  };

  render(): React.ReactNode {
    const { modalType, content, height, className } = this.props.modal;
    const type = modalType || 'bottom';
    const background = className || 'background-white-base';
    const size = setHeight(height || 40);
    const isOpen = !!content;
    return (
      <SlidingPanel
        type={type}
        panelContainerClassName={`${'bottom'} ${background}`}
        className={`${'bottom'} ${background}`}
        size={height || size}
        isOpen={isOpen}
        onClick={(): void => {}}
        backdropClicked={(): void => this.props.updateSettingsModal(null)}
      >
        <>
          <Header
            leftBackButton={false}
            rightCloseButton={true}
            rightCloseOnClick={this.rightCloseOnClick}
          />
          {content}
        </>
      </SlidingPanel>
    );
  }
}
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  return { modal: settings.modal };
};
export default connect(mapStateToProps, { updateSettingsModal })(
  ModalSlideComponent
);
