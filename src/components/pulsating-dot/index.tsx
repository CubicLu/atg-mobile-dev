import React from 'react';

export default class PulsatingDotComponent extends React.Component<{}> {
  render(): React.ReactNode {
    return (
      <div className="ring-container">
        <div className="ring-circle" />
        <div className="static-circle" />
      </div>
    );
  }
}
