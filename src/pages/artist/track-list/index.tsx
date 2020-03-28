import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getArtistAPI } from './../../../actions';
import {
  ShapesSize,
  ArtistInterface,
  PlaylistInterface,
  SongInterface
} from '../../../interfaces';
import { IonPage, IonImg, IonContent, IonHeader } from '@ionic/react';
import { BackgroundImage, ButtonSupport, BackIcon } from '../../../components';
import AddTrackIcon from '../../../components/icon/add-track';
import { artistBackground } from '../../../utils';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getArtistAPI: (username: string) => void;
}
type TrackReference = 'artist' | 'radio' | 'playlist' | 'mixtape' | 'default';
interface MatchParams {
  reference: TrackReference;
  referenceId: string;
  id: string;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}
class TrackListPage extends React.Component<Props> {
  UNSAFE_componentWillMount(): void {
    if (
      this.props.match.params.reference === 'artist' &&
      this.props.currentArtist == null
    ) {
      this.props.getArtistAPI(this.props.match.params.referenceId);
    }
  }
  render(): React.ReactNode {
    // const artistBackground = this.props.currentArtist?.cover.background;
    const { currentArtist } = this.props;
    const style = currentArtist ? artistBackground(currentArtist, true) : {};
    const type = this.props.match.params.reference;
    const discos = currentArtist && currentArtist.discography;

    if (type === 'artist' && discos) {
      const current = discos[this.props.match.params.id];
      if (current?.name) this.playlist.name = current.name;
      if (current?.cover) this.playlist.cover = current.cover;
      this.playlist.owner = currentArtist!.name;
    }
    return (
      <IonPage style={style} id="track-list">
        {currentArtist && <div className="fade-background" />}
        {!currentArtist && (
          <BackgroundImage
            gradient={`180deg,#aed8e5,#039e4a`}
            backgroundTop
            backgroundTopDark={true}
            backgroundTopOpacity={0.2}
            backgroundBottom
            backgroundBottomOrange={true}
            backgroundBottomOpacity={0.6}
          />
        )}
        <IonHeader className="track-header ion-no-border">
          <div className={`atg-header`}>
            <div className="start">
              <div
                className="default-button dark"
                onClick={(): void => this.props.history.goBack()}
              >
                <BackIcon />
              </div>
            </div>
            {currentArtist && (
              <div className="center player-support">
                <ButtonSupport
                  buttonType={'text'}
                  uppercase
                  type={ShapesSize.rounded}
                />
              </div>
            )}
            <div className="end" />
          </div>
        </IonHeader>

        <IonContent>
          <div className="initial-page-fullscreen" style={{ overflow: 'auto' }}>
            <div className="">
              <div className="player-upper-half track-list m-4">
                <div
                  className="image radius"
                  style={{
                    background: `url(${this.playlist?.cover})`,
                    backgroundSize: 'contain'
                  }}
                />
                <span className="f4">{this.playlist?.name}&nbsp;</span>
                <br />
                <span className="f6">{this.playlist?.owner}&nbsp;</span>
              </div>
            </div>

            <div id="songs">
              {this.playlist.items.map(
                (song: SongInterface, i: number): React.ReactElement => (
                  <div className="row list-margin-row list-track" key={i}>
                    <div className="list-track-number">{song.trackNumber}</div>
                    <div>{song.name}</div>
                    <div className="align-end">
                      <AddTrackIcon />
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="bottom-shadow h-16 w-100" />
            <div className="flex-compass south half h-16">
              <div className="row p-0 flex-wrap flex-wrap-fluid">
                <div className="col s4 p-0">
                  <IonImg
                    className="tile"
                    src={
                      'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
                    }
                  />
                  <span className="tile-label-s4 f6">Liner Notes</span>
                </div>

                <div className="col s4 p-0">
                  <IonImg
                    className="tile"
                    src={
                      'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
                    }
                  />
                  <span className="tile-label-s4 f6">Community</span>
                </div>

                <div className="col s4 p-0">
                  <IonImg
                    className="tile"
                    src={
                      'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
                    }
                  />
                  <span className="tile-label-s4 f6">Artist Home</span>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  playlist: PlaylistInterface = {
    name: 'Euro House',
    id: 1,
    source: 'radio',
    sourceId: 2,
    cover: '/static/media/euro-house.1cefc333.png',
    owner: 'Bono Vox',
    items: [
      {
        id: '21WTCDU55iW0z2kzXq9R8B',
        artist: 'Fivio Foreign',
        name: 'Big Drip (feat. Lil Baby & Quavo) - Remix',
        trackNumber: 1,
        duration: 233.143,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273636b1687750248687c0be335',
        url:
          'https://p.scdn.co/mp3-preview/03c8eea54cc86a7ed4c17492bc97c12b70e867e1?cid=230be2f46909426b8b80cac36446b52a',
        album: 'Big Drip (feat. Lil Baby & Quavo) [Remix]'
      },
      {
        id: '5R9k9x85lAYbamdUoKAJvj',
        artist: 'Pop Smoke',
        name: 'Dior (with Gunna) - Remix',
        trackNumber: 2,
        duration: 230.386,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273cd90e898c070ef21812ab363',
        url:
          'https://p.scdn.co/mp3-preview/9fa6858800a18cb2f79c862bb326dbc44c848d83?cid=230be2f46909426b8b80cac36446b52a',
        album: 'Meet The Woo 2 (Deluxe)'
      },
      {
        id: '0nbXyq5TXYPCO7pr3N8S4I',
        artist: 'Roddy Ricch',
        name: 'The Box',
        trackNumber: 3,
        duration: 196.652,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f',
        url:
          'https://p.scdn.co/mp3-preview/52c74a85b9b187b8f51bfe1c7b19a25f7624161a?cid=230be2f46909426b8b80cac36446b52a',
        album: 'Please Excuse Me For Being Antisocial'
      },
      {
        id: '4iiWcajF1fEUpwcUewc464',
        artist: 'Future',
        name: 'Life Is Good (feat. Drake, DaBaby & Lil Baby) - Remix',
        trackNumber: 4,
        duration: 315.346,
        cover:
          'https://i.scdn.co/image/ab67616d0000b2734df9c60aa74fb72c1e07fd1d',
        url:
          'https://p.scdn.co/mp3-preview/0ec243b93a219d369ed34082eccf1146edc2f50c?cid=230be2f46909426b8b80cac36446b52a',
        album: 'Life Is Good (feat. Drake, DaBaby & Lil Baby) [Remix]'
      },
      {
        id: '3Q6F8RByyhRTJpRtZLY3cg',
        artist: 'Jack Harlow',
        name: 'WHATS POPPIN',
        trackNumber: 5,
        duration: 139.741,
        cover:
          'https://i.scdn.co/image/ab67616d0000b27305c50cf7a461aa654fe9b15a',
        url:
          'https://p.scdn.co/mp3-preview/0ec243b93a219d369ed34082eccf1146edc2f50c?cid=230be2f46909426b8b80cac36446b52a',
        album: 'WHATS POPPIN'
      },
      {
        id: '7KSSdFCBHCfq4KPzz78ghk',
        artist: 'Lil Baby',
        name: 'Heatin Up (feat. Gunna)',
        trackNumber: 6,
        duration: 177.314,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273f46a9ad551acbdab8f72fd89',
        url:
          'https://p.scdn.co/mp3-preview/c068b4ce494bfd5db193c38d4e911296de3b43fc?cid=230be2f46909426b8b80cac36446b52a',
        album: 'My Turn'
      },
      {
        id: '1HF6P40Z7nfExGaB1Gk99v',
        artist: 'Lil Uzi Vert',
        name: 'Got The Guap (feat. Young Thug)',
        trackNumber: 7,
        duration: 176.756,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273a4865bd4e21a153d4d7f72f0',
        url:
          'https://p.scdn.co/mp3-preview/9fa6858800a18cb2f79c862bb326dbc44c848d83?cid=230be2f46909426b8b80cac36446b52a',
        album: 'Eternal Atake (Deluxe) - LUV vs. The World 2'
      },
      {
        id: '7EiZI6JVHllARrX9PUvAdX',
        artist: 'Future',
        name: 'Low Life',
        trackNumber: 8,
        duration: 313.546,
        cover:
          'https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad',
        url:
          'https://p.scdn.co/mp3-preview/dd493a2d827e0d6b40470f23913f301aee963157?cid=230be2f46909426b8b80cac36446b52a',
        album: 'EVOL'
      }
    ]
  };
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI })(TrackListPage)
);
