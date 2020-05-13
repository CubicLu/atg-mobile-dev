import React from 'react';
import { ButtonSupportIcon, ContentLoader } from './../../../components';
import { ArtistInterface } from '../../../models';
import { IonRouterLink } from '@ionic/react';
import SupportStarIcon from '../../icon/support-star';

interface Props {
  artist: ArtistInterface;
  key: number;
}
export default class CardArtistComponent extends React.Component<Props> {
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };

  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();

    const { artist } = this.props;
    if (!artist) return <div />;
    const { cover, support, name } = artist;
    return (
      <div>
        {!this.isReady ? (
          <ContentLoader
            className="mt-3"
            speed={2}
            viewBox="0 0 400 140"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
          >
            <rect x="20" y="0" rx="8" ry="8" width="360" height="140" />
          </ContentLoader>
        ) : (
          <div
            className="card-artist my-3 mx-2 pb-15"
            style={{ backgroundImage: `url(${cover.main})` }}
          >
            <div className="flex-align-items-end h-100 px-2">
              <div className="align-start">
                {support && (
                  <div className="star">
                    <SupportStarIcon />
                  </div>
                )}
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
              routerDirection="forward"
            />
          </div>
        )}
      </div>
    );
  }
}
