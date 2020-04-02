import React from 'react';
import SlidingPanel from 'react-sliding-side-panel';

interface Props {
  type?: 'left' | 'right' | 'top' | 'bottom';
  visible: boolean;
  height?: number;
  onClose: Function;
  onClosing?: Function;
  onOpen: Function;
  className?: string;
}

class ModalSlideComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'bottom',
    visible: false,
    height: 30,
    onClose: (): void => {},
    onOpen: (): void => {},
    className: ''
  };

  render(): React.ReactNode {
    return (
      <SlidingPanel
        type={this.props.type}
        isOpen={this.props.visible}
        size={this.props.height}
        panelClassName={`${this.props.type} ${this.props.className}`}
        panelContainerClassName={` ${this.props.className}`}
        backdropClicked={(): void => this.props.onClose()}
      >
        {this.props.children}
      </SlidingPanel>
    );
  }
}

export default ModalSlideComponent;
