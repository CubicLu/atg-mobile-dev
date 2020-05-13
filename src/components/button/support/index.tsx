import React from 'react';
import { Button, SupportIcon } from './../../../components';
import { ArtistInterface } from '../../../models';
import { Colors } from '../../../types';
import { IonRouterLink } from '@ionic/react';

interface ButtonProps {
  type: 'Button' | 'Icon';
  supported: boolean;
  className?: string;
  bold?: boolean;
  id: string;
  artist: ArtistInterface | null;
}

class SupportComponent extends React.Component<ButtonProps> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  public static defaultProps = {
    supported: false,
    id: 'support-button'
  };

  handleLinkClick = (): void => {
    this.linkRef?.current?.click();
  };

  renderIcon(): React.ReactNode {
    const { supported, className, id } = this.props;
    const username = this.props.artist?.username || 'pharrell-williams';
    return (
      <div
        id={id}
        onClick={this.handleLinkClick}
        className={`center-align l05 button-support-component ${className}`}
      >
        <SupportIcon supported={supported} />
        <span className={'f8 no-wrap'}>
          {supported ? 'Supported' : 'Support!'}
        </span>
        <IonRouterLink
          ref={this.linkRef}
          routerLink={`/artist/${username}/support`}
          routerDirection="forward"
        />
      </div>
    );
  }

  renderButton(): React.ReactNode {
    const { supported, bold, id } = this.props;
    const username = this.props.artist?.username || 'pharrell-williams';
    return (
      <Button
        id={id}
        className="mt-0 l1"
        color={supported ? Colors.supported : Colors.support}
        label={supported ? 'SUPPORTED' : 'SUPPORT!'}
        bold={bold}
        onClick={this.handleLinkClick}
      >
        <IonRouterLink
          ref={this.linkRef}
          routerLink={`/artist/${username}/support`}
          routerDirection="forward"
        />
      </Button>
    );
  }

  render(): React.ReactNode {
    return this.props.type === 'Button'
      ? this.renderButton()
      : this.renderIcon();
  }
}

export default SupportComponent;
