import React from 'react';
import {
  MenuFanSupportOptions,
  ButtonSupportIcon
} from './../../../components';
import { updateSettingsModal } from './../../../actions';
import { ArtistInterface } from './../../../interfaces';
import { connect } from 'react-redux';
import { IonRouterLink } from '@ionic/react';

interface DispatchProps {
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
}
interface Props extends DispatchProps {
  artist: ArtistInterface;
  key: number;
}
class CardArtistComponent extends React.Component<Props> {
  renderSupported(): React.ReactElement {
    return (
      <IonRouterLink
        routerLink={`/artist/${this.props.artist.username}/support`}
        routerDirection="forward"
      >
        <ButtonSupportIcon supported={true} />
      </IonRouterLink>
    );
  }
  renderNotSupported(): React.ReactElement {
    return (
      <ButtonSupportIcon
        onClick={(): void =>
          this.props.updateSettingsModal(
            <MenuFanSupportOptions
              background={'background-tertiary-opacity95'}
              artist={this.props.artist}
            />,
            'background-tertiary-opacity95'
          )
        }
        supported={false}
      />
    );
  }
  render(): React.ReactNode {
    const { artist } = this.props;
    if (!artist) return <div />;
    const { cover, username, support, name } = artist;

    return (
      <div
        className="card-artist my-3 mx-2"
        style={{ backgroundImage: `url(${cover.main})` }}
      >
        <div className="flex-align-items-end h-100 px-2 pb-2">
          <div className="align-start">
            <IonRouterLink
              routerLink={`/artist/${username}`}
              routerDirection="root"
            >
              <div className="h3 artist-card-name l12">{name}</div>
            </IonRouterLink>
          </div>
          <div className="align-end">
            {support ? this.renderSupported() : this.renderNotSupported()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateSettingsModal })(CardArtistComponent);
