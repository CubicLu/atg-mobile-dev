import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { getArtistAPI, setPlaylist } from './../../../actions';
import {
  ArtistInterface,
  PlaylistInterface,
  SongInterface,
  PlayerReducerType,
  DiscographyInterface
} from '../../../models';
import { IonPage, IonContent, withIonLifeCycle } from '@ionic/react';
import {
  BackgroundImage,
  ButtonSupport,
  PulsatingDot,
  Header
} from '../../../components';
import AddTrackIcon from '../../../components/icon/add-track';
import { artistBackground } from '../../../utils';
import { playlists } from '../../../reducers/playerReducer';
import BottomTilesComponent from '../../../components/bottom-tiles';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
  player: PlayerReducerType;
}
interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getArtistAPI: (username: string) => void;
  setPlaylist: (playlist: PlaylistInterface, song: SongInterface) => void;
}
type TrackReference = 'artist' | 'radio' | 'playlist' | 'mixtape' | 'default';
interface MatchParams {
  reference: TrackReference;
  referenceId: string;
  id: string;
}
interface State {
  playlist: PlaylistInterface | null;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class TrackListPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { playlist: null };
  }

  ionViewWillEnter(): void {
    this.fetchPlaylist();
    this.fetchArtist();
  }
  UNSAFE_componentWillUpdate(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchArtist(
        nextProps.match.params,
        nextProps.currentArtist,
        nextProps.match.params.reference === 'artist'
      );
    }
  }
  fetchArtist(
    params = this.props.match.params,
    currentArtist = this.props.currentArtist,
    isArtist = this.isArtist
  ): void {
    if (!isArtist) return;
    if (params.referenceId !== currentArtist?.username) {
      this.props.getArtistAPI(params.referenceId);
    }
  }
  fetchPlaylist(): void {
    const params = this.props.match.params;
    let id = this.isArtist ? params.id : params.referenceId;
    if (this.props.match.params.referenceId === 'rival-sons') id = '7516755396';

    const playlist = playlists.find((x): boolean => x.id.toString() === id);
    playlist && this.setState({ playlist });
  }

  get isArtist(): boolean {
    return this.props.match.params.reference === 'artist';
  }
  renderTracks(): React.ReactNode {
    const { playing, song } = this.props.player;
    const songId = (playing && song?.id) || -1;
    const items = this.state.playlist?.items || [];
    return (
      <div id="songs" className="mt-3">
        {items.map(
          (song: SongInterface, i: number): React.ReactNode => (
            <div
              key={i}
              className="flex-align-items-center row"
              onClick={(): void =>
                this.state.playlist
                  ? this.props.setPlaylist(this.state.playlist, song)
                  : undefined
              }
            >
              <div className="f5 list-track-number">
                {songId === song.id ? <PulsatingDot /> : i + 1}
              </div>

              <div className="f5 track-song">{song.title}</div>

              <div className="flex-justify-content-center align-end">
                <AddTrackIcon />
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  navigate(): void {
    switch (this.props.match.params.reference) {
      case 'artist':
        return this.props.currentArtist
          ? this.props.history.push(
              `/artist/${this.props.currentArtist.username}`
            )
          : undefined;
      case 'mixtape':
        return;
      case 'playlist':
        return;
      case 'radio':
        return this.props.history.push('/radio');
      default:
        return;
    }
  }
  renderCover(): React.ReactNode {
    const disco: DiscographyInterface | undefined =
      this.isArtist &&
      this.props.currentArtist?.discography &&
      this.props.currentArtist.discography[this.props.match.params.id];

    const coverUrl = disco ? disco.cover : this.state.playlist?.cover;
    const playlist = disco ? disco.name : this.state.playlist?.name;
    const owner = disco
      ? this.props.currentArtist!.name
      : this.state.playlist?.owner;

    return (
      <div className="player-upper-half center-align track-list m-4 mt-0">
        <div
          onClick={(): void => this.navigate()}
          className="image radius"
          style={{
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: 'contain'
          }}
        />
        <div className="mt-2 f3 l2">{playlist}&nbsp;</div>
        <div onClick={(): void => this.navigate()} className="f6">
          {owner}&nbsp;
        </div>
      </div>
    );
  }

  renderArtistBackground(): React.ReactNode {
    const artist = this.props.currentArtist;
    const color1 = artist?.backgroundGradient?.color1 || '#aed8e5';
    const color2 = artist?.backgroundGradient?.color2 || '#039e4a';

    return (
      <React.Fragment>
        {artist && <div className="fade-background blur" />}
        <BackgroundImage
          gradient={`180deg,${color1},${color2}`}
          styles={artist ? artistBackground(artist, true) : {}}
          backgroundTop
          backgroundTopDark={true}
          backgroundTopOpacity={0.2}
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.6}
        />
      </React.Fragment>
    );
  }
  renderPlainBackground(): React.ReactNode {
    const color1 = this.state.playlist?.color1 || '#aed8e5';
    const color2 = this.state.playlist?.color2 || '#039e4a';

    return (
      <React.Fragment>
        <BackgroundImage
          gradient={`180deg,${color1},${color2}`}
          backgroundTop
          backgroundTopDark={true}
          backgroundTopOpacity={0.2}
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.6}
        />
      </React.Fragment>
    );
  }

  renderArtist(): React.ReactNode {
    return (
      <IonPage id="track-list-page">
        {this.renderArtistBackground()}
        <Header
          centerContent={
            this.isArtist && (
              <div className="center player-support">
                <ButtonSupport artist={this.props.currentArtist} />
              </div>
            )
          }
        />

        <IonContent scrollY={true} className="track-header">
          <div className="track-list-page mx-25">
            {this.renderCover()}
            {this.renderTracks()}
          </div>
          {this.isArtist && (
            <BottomTilesComponent tiles={this.props.currentArtist?.tiles} />
          )}
        </IonContent>
      </IonPage>
    );
  }

  renderPlain(): React.ReactNode {
    return (
      <IonPage id="track-list-page">
        {this.renderPlainBackground()}
        <Header />
        <IonContent scrollY={true} className="track-header">
          <div className="track-list-page mx-25">
            {this.renderCover()}
            {this.renderTracks()}
          </div>
        </IonContent>
      </IonPage>
    );
  }
  render(): React.ReactNode {
    return this.isArtist ? this.renderArtist() : this.renderPlain();
  }
}

const mapStateToProps = ({
  artistAPI,
  player
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist, player };
};

export default connect(mapStateToProps, { getArtistAPI, setPlaylist })(
  withIonLifeCycle(TrackListPage)
);
