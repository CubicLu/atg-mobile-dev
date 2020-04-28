import React from 'react';
import { ButtonSupportIcon } from './../../../components';
import { ArtistInterface } from './../../../interfaces';
import { IonRouterLink } from '@ionic/react';

interface Props {
  artist: ArtistInterface;
  key: number;
}
export default class CardArtistComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  render(): React.ReactNode {
    const { artist } = this.props;
    if (!artist) return <div />;
    const { cover, support, name } = artist;

    return (
      <div
        className="card-artist my-3 mx-2 pb-15"
        style={{ backgroundImage: `url(${cover.main})` }}
      >
        <div className="flex-align-items-end h-100 px-2">
          <div className="align-start">
            <div
              onClick={(): void => this.linkRef.current!.click()}
              className="h3 text-28 artist-card-name l12"
            >
              {name}
            </div>
          </div>
          <div className="align-end mb-05">
            <ButtonSupportIcon artist={artist} supported={support} />
          </div>
        </div>
        <IonRouterLink
          ref={this.linkRef}
          routerLink={`/artist/${artist?.username}`}
          routerDirection="root"
        />
      </div>
    );
  }
}
