import React from 'react';
import { ArtistInterface } from '../../../models';
import { BackgroundImage, RadioIcon, BackIcon } from '../../../components';
import { IonRouterLink } from '@ionic/react';

interface Props {
  currentArtist: ArtistInterface;
  gateway: () => void;
}
export default class ArtistGatewayPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { currentArtist } = this.props;
    return (
      <div className="artist-gateway">
        <div className={'artist-gateway__header'}>
          <div className="artist-gateway__header--content">
            <h2>panthr</h2>
            <h3>artist-to-fan</h3>
          </div>
        </div>

        <div className="artist-gateway__content">
          <div className="artist-gateway__content--info-block">
            <div className="artist-gateway__content--info-block--buttons">
              <IonRouterLink routerLink={`/radio/${currentArtist.username}`}>
                <div
                  className={
                    'artist-gateway__content--info-block--buttons-radio default-button dark'
                  }
                >
                  <RadioIcon />
                </div>
              </IonRouterLink>

              <div
                onClick={(): void => this.props.gateway()}
                className={
                  'artist-gateway__content--info-block--buttons-arrow default-button dark'
                }
              >
                <BackIcon />
              </div>
            </div>

            <h1>{currentArtist?.name}</h1>
            <h5>Lil Nas X takes on Country Music</h5>
          </div>
        </div>

        {currentArtist?.cover.videoCover ? (
          <div className="artist-gateway__video-container">
            <video autoPlay playsInline loop>
              <source src={currentArtist?.cover.videoCover} />
            </video>
          </div>
        ) : (
          <BackgroundImage
            gradient="180deg,#652ddd,#2c0d5c"
            backgroundImage={
              currentArtist?.cover?.gateway || currentArtist?.cover?.main
            }
          />
        )}
      </div>
    );
  }
}
