import React from 'react';
import {
  Button,
  MenuFanSupportOptions,
  SupportIcon
} from './../../../components';
import { Colors, ArtistInterface } from '../../../interfaces';
import { connect } from 'react-redux';
import { updateSettingsModal } from './../../../actions';
import { IonRouterLink } from '@ionic/react';
interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
interface ButtonProps extends DispatchProps {
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

  supporting(): void {
    if (!this.props.artist) return;
    this.props.updateSettingsModal(
      <MenuFanSupportOptions
        background={'background-tertiary-opacity95'}
        artist={this.props.artist!}
        onClose={(): void => this.props.updateSettingsModal(false)}
      />,
      'background-tertiary-opacity95'
    );
  }

  notSupporting(): void {
    this.linkRef?.current?.click();
  }

  renderIcon(): React.ReactNode {
    const { supported, className, id } = this.props;
    const username = this.props.artist?.username || 'pharell-williams';
    return (
      <div
        id={id}
        onClick={(): void =>
          supported ? this.supporting() : this.notSupporting()
        }
        className="center-align l05 button-support-component"
      >
        <SupportIcon supported={supported} />
        <span className={`f8 no-wrap ${className ? className : ''}`}>
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
    const username = this.props.artist?.username || 'pharell-williams';
    return (
      <Button
        id={id}
        className="mt-0 l1"
        color={supported ? Colors.supported : Colors.support}
        label={supported ? 'SUPPORTED' : 'SUPPORT!'}
        bold={bold}
        onClick={(): void =>
          supported ? this.supporting() : this.notSupporting()
        }
      >
        <IonRouterLink
          ref={this.linkRef}
          routerLink={`/artist/${username}/support`}
          routerDirection="root"
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

export default connect(null, { updateSettingsModal })(SupportComponent);
