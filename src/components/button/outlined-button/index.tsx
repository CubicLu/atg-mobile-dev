import React from 'react';
import { BackIcon } from '../..';

interface Props {
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
}

export default class OutlinedButtonComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {}
  };

  render(): React.ReactNode {
    const { onClick, text, style } = this.props;
    return (
      <div className="outlined-button my-auto" onClick={onClick} style={style}>
        <div className="outlined-button__back-container">
          <BackIcon />
        </div>
        <span>{text}</span>
      </div>
    );
  }
}
