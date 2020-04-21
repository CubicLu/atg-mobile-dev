import React from 'react';

interface StateProps {}
interface Props extends StateProps {}

class PulsatingDot extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="ring-container">
        <div className="ring-circle" />
        <div className="static-circle" />
      </div>
    );
  }
}

export default PulsatingDot;
