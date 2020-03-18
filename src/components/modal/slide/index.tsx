import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';
import SlidingPanel from 'react-sliding-side-panel';

interface Props {
  type?: 'left' | 'right' | 'top' | 'bottom';
  visible: boolean;
  height?: number;
  onClose: Function;
  onClosing?: Function;
  onOpen: Function;
  classname?: string;
}

class ModalSlideComponent extends React.Component<Props> {
  public static defaultProps = {
    type: 'bottom',
    visible: false,
    height: 30,
    onClose: (): void => {},
    onOpen: (): void => {},
    classname: ''
  };

  render(): React.ReactNode {
    return (
      <SlidingPanel
        {...this.props}
        type={this.props.type}
        isOpen={this.props.visible}
        size={this.props.height}
        panelClassName={`${this.props.type} ${this.props.classname}`}
        panelContainerClassName={` ${this.props.classname}`}
        backdropClicked={this.props.onClose.bind(this)}
      >
        {this.props.children}
      </SlidingPanel>
    );
  }
}

export default ModalSlideComponent;
