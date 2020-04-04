import React from 'react';
import { SupportIcon } from './../../../components';

interface Props {
  onClick: Function;
  supported: boolean;
  className?: string;
  id: string;
}

export default class ButtonSupportIconComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    supported: false,
    id: 'support-button-circle'
  };

  render(): React.ReactNode {
    const { supported, className, id, onClick } = this.props;
    return (
      <div
        onClick={(): void => onClick()}
        id={id}
        className="center-align l05 button-support-component"
      >
        <SupportIcon supported={supported} />
        <span className={`f8 no-wrap ${className ? className : ''}`}>
          {supported ? 'Supported' : 'Support'}
        </span>
      </div>
    );
  }
}
