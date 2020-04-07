import React from 'react';
import { ArtistInterface } from '../../../interfaces';
import SupportComponent from '../../button/support';
interface Props {
  supported: boolean;
  bold?: boolean;
  className?: string;
  id?: string;
  artist: ArtistInterface | null;
}
export class ButtonSupportIconComponent extends React.Component<Props> {
  public static defaultProps = { supported: false };
  render(): React.ReactNode {
    return (
      <SupportComponent
        type="Icon"
        artist={this.props.artist}
        className={this.props.className}
        supported={this.props.supported}
        bold={this.props.bold}
        id="support-button-circle"
      />
    );
  }
}
export class ButtonSupportComponent extends React.Component<Props> {
  public static defaultProps = { supported: false, id: 'button-support' };
  render(): React.ReactNode {
    return (
      <SupportComponent
        type="Button"
        artist={this.props.artist}
        className={this.props.className}
        supported={this.props.supported}
        bold={this.props.bold}
        id={this.props.id}
      />
    );
  }
}
