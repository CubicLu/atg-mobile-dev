import React from 'react';
import SlidingPanel from 'react-sliding-side-panel';

interface Props {
  type?: 'left' | 'right' | 'top' | 'bottom';
  visible: boolean;
  height?: number;
  onClose: Function;
  onOpen: Function;
  className: string;
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
    const { type, visible, height, className, children } = this.props;
    return (
      <SlidingPanel
        type={type}
        isOpen={visible}
        size={height}
        panelClassName={`modal slide ${type} ${className}`}
      >
        {children}
      </SlidingPanel>
    );
  }
}

export default ModalSlideComponent;
