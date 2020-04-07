import React from 'react';
import { Button } from './../../../components';
import { Colors } from '../../../interfaces';

interface Props {
  onClick: Function;
  supported: boolean;
  bold?: boolean;
  id: string;
}

export default class ButtonSupportComponent extends React.Component<Props> {
  public static defaultProps = {
    onClick: (): void => {},
    supported: false,
    id: 'support-button'
  };

  render(): React.ReactNode {
    const { onClick, supported, bold, id } = this.props;
    return (
      <Button
        id={id}
        className="mt-0"
        onClick={(): void => onClick()}
        color={supported ? Colors.supported : Colors.support}
        label={supported ? 'SUPPORTED' : 'SUPPORT'}
        bold={bold}
      />
    );
  }
}
