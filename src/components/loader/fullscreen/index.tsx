import React from 'react';

interface Props {
  loading?: boolean;
}

class LoaderFullscreenComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.loading && (
          <div className="loader">
            <div className="icon" />
          </div>
        )}
      </>
    );
  }
}

export default LoaderFullscreenComponent;
