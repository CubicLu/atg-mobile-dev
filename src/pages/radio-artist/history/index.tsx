import React from 'react';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonItemOptions,
  IonItemSliding
} from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  ButtonSupportIcon,
  ButtonIcon,
  CloseIcon,
  AddPlaylistIcon,
  Avatar
} from '../../../components';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  ChannelInterface,
  PlaylistInterface,
  SongInterface
} from '../../../models';
import { ShapesSize, Colors } from '../../../types';
import { setPlaylist } from './../../../actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { guitarPlaylist } from '../../../reducers/playerReducer';

interface StateProps {
  radioArtist: ChannelInterface | null;
}

interface DispatchProps {
  setPlaylist: (playlist: PlaylistInterface, song: SongInterface) => void;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}
class RadioHistoryPage extends React.Component<Props> {
  onSongClick = (artistId: string, album: string): void => {
    this.props.setPlaylist(guitarPlaylist, guitarPlaylist.items[0]);
    this.props.history.push(`/track/artist/${artistId}/${album}`);
  };
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    return (
      <IonPage id="radio-history-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header leftBackButton={true} title={this.props.radioArtist?.title} />
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
                              artist={null}
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
      artistId: 'pharrell-williams',
      album: '5',
      song: 'When It Comes To You',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharrell-williams',
      album: '4',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharrell-williams',
      album: '3',
      song: 'Better Tomorrow',
      artist: 'Pharrell Williams',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharrell-williams',
      album: '2',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: false,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      artistId: 'pharrell-williams',
      album: '1',
      song: 'King Whithout A Crown',
      artist: 'Pharrell Williams',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    }
  ];
}

const mapStateToProps = ({ radioAPI }: ApplicationState): object => {
  const { radioArtist } = radioAPI;
  return { radioArtist };
};

export default withRouter(
  connect(mapStateToProps, { setPlaylist })(RadioHistoryPage)
);
