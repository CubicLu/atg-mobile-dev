import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions
} from '@ionic/react';
import { ApplicationState } from '../../../reducers';
import {
  BackgroundImage,
  Header,
  Avatar,
  ButtonSupportIcon,
  CloseIcon,
  HeaderOverlay,
  ButtonIcon,
  AddPlaylistIcon
} from '../../../components';
import {
  ShapesSize,
  Colors,
  ChannelInterface,
  ArtistInterface
} from '../../../interfaces';
import { setRadioPlaylistPlayer } from './../../../actions';

interface StateProps {
  radioArtist: ChannelInterface;
  currentArtist: ArtistInterface;
}

interface DispatchProps {
  setRadioPlaylistPlayer: () => void;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class RadioHistoryPage extends React.Component<Props> {
  onSongClick = (artistId, album: string): void => {
    this.props.setRadioPlaylistPlayer();
    this.props.history.push(`/track/artist/${artistId}/${album}`);
  };
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    return (
      <IonPage id="radio-history-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header leftBackButton={true} title={this.props.radioArtist.title} />
        <BackgroundImage
          gradient="180deg,#261546,#0c090b"
          backgroundTopDark
          backgroundTop={true}
          backgroundTopOpacity={0.5}
          backgroundBottom
          backgroundBottomDark={false}
        />
        <IonContent>
          <div className="profile-history-page">
            <IonList lines="none">
              {this.historySongs.map(
                (data, i): React.ReactNode => {
                  return (
                    <IonItemSliding key={i}>
                      <IonItem>
                        <div className="row">
                          <div
                            onClick={(): void =>
                              this.onSongClick(data.artistId, data.album)
                            }
                          >
                            <div className="col s3 image">
                              <Avatar
                                image={data.image}
                                type={ShapesSize.circle}
                                width={50}
                                height={50}
                              />
                            </div>
                            <div className="col s6 info">
                              <span className="song">{data.song}</span>
                              <span className="artist">{data.artist}</span>
                            </div>
                          </div>
                          <div className="col s3 support">
                            <ButtonSupportIcon
                              artist={this.props.currentArtist}
                              id={data.artistId}
                              supported={data.isSupported}
                            />
                          </div>
                        </div>
                      </IonItem>
                      <IonItemOptions side="end">
                        <ButtonIcon
                          icon={<AddPlaylistIcon />}
                          color={Colors.green}
                          className="no-padding"
                          type={ShapesSize.normal}
                        />
                        <ButtonIcon
                          icon={<CloseIcon strokeWidth={2} />}
                          color={Colors.red}
                          className="no-padding"
                          type={ShapesSize.normal}
                        />
                      </IonItemOptions>
                    </IonItemSliding>
                  );
                }
              )}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    );
  }
  historySongs = [
    {
      artistId: 'pharell-williams',
      album: '5',
      song: 'When It Comes To You',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharell-williams',
      album: '4',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharell-williams',
      album: '3',
      song: 'Better Tomorrow',
      artist: 'Pharrell Williams',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharell-williams',
      album: '2',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharell-williams',
      album: '1',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    }
  ];
}

const mapStateToProps = ({ radioAPI, artistAPI }: ApplicationState): object => {
  const { radioArtist } = radioAPI;
  const { currentArtist } = artistAPI;
  return { radioArtist, currentArtist };
};

export default withRouter(
  connect(mapStateToProps, { setRadioPlaylistPlayer })(RadioHistoryPage)
);
