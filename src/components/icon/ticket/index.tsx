import React from 'react';
import {} from './../../../components';
import {} from './../../../actions';

interface Props {
  color: string;
  width: number;
  height: number;
}

class TicketIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 30,
    height: 30
  };

  render(): React.ReactNode {
    return <div></div>;
  }
}

export default TicketIcon;
