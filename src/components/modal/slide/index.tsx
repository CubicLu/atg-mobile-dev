import React from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import { connect } from 'react-redux';
import { updateSettingsModal } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { ModalSlideInterface } from '../../../models';
import { setHeight } from '../../../utils';
import { Header } from '../..';
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
interface StateProps {
  modal: ModalSlideInterface;
}
declare global {
  interface Window {
    deviceready: boolean;
    StatusBar: any;
  }
}
interface Props extends StateProps, DispatchProps {}
class ModalSlideComponent extends React.Component<Props> {
  rightCloseOnClick = (): void => {
    if (window.deviceready && !window.StatusBar?.isVisible) {
      window.StatusBar.show();
    }
    this.props.updateSettingsModal(null);
    window.deviceready && window.screen?.orientation?.lock('portrait');
  };

  render(): React.ReactNode {
    const {
      modalType,
      content,
      height,
      className,
      wrapperClassName
    } = this.props.modal;
    const type = modalType || 'bottom';
    const background = className || 'background-white-base';
    const size = setHeight(height || 40);
    const isOpen = !!content;
    return (
      <div className={`${wrapperClassName ?? ''}`}>
        <SlidingPanel
          type={type}
          panelContainerClassName={`${'bottom'} ${background} zzz`}
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
      </div>
    );
  }
}
const mapStateToProps = ({ settings }: ApplicationState): StateProps => {
  return {
    modal: settings.modal
  };
};
export default connect(mapStateToProps, { updateSettingsModal })(
  ModalSlideComponent
);
