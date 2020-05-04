import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {}

class CardGraphComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return <div className="card graph">{this.props.children}</div>;
  }
}

export default CardGraphComponent;
