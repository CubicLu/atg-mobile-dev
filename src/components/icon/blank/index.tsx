import React from 'react';

interface Props {
  color: string;
  width: number;
  height: number;
}

class BlankIcon extends React.Component<Props> {
  public static defaultProps = {
    color: '#FFF',
    width: 30,
    height: 30
  };

  render(): React.ReactNode {
    return <div></div>;
  }
}

export default BlankIcon;
