import React from 'react';
interface Props {
  visible: boolean;
}

class LoaderFullscreenComponent extends React.Component<Props> {
  public static defaultProps = {
    visible: false
  };
  render(): React.ReactNode {
    if (this.props.visible) {
      return (
        <div className="loader">
          <div className="icon"></div>
        </div>
      );
    }
    return null;
  }
}

export default LoaderFullscreenComponent;
