import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getArtistAPI, setPlaylist } from './../../../actions';
import {
  ArtistInterface,
  PlaylistInterface,
  SongInterface,
  PlayerReducerType,
  DiscographyInterface
} from '../../../models';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  ButtonSupport,
  PulsatingDot,
  Header
} from '../../../components';
import AddTrackIcon from '../../../components/icon/add-track';
import { artistBackground } from '../../../utils';
import {
  guitarPlaylist,
  popPlaylist,
  bluesPlaylist,
  rivalSonsPlaylist
} from '../../../reducers/playerReducer';
import BottomTilesComponent from '../../../components/bottom-tiles';

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
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

const lists = [popPlaylist, bluesPlaylist, guitarPlaylist, rivalSonsPlaylist];
class TrackListPage extends React.Component<Props> {
  playlist: PlaylistInterface = lists[0];
  isArtist: boolean = false;

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    this.getPlaylistFromAPI(nextProps.match.params.referenceId);
    this.isArtist = this.props.match.params.reference === 'artist';
    if (!this.isArtist) {
      return;
    }
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.referenceId);
    } else if (
      nextProps.match.params.referenceId !== this.props.match.params.referenceId
    ) {
      this.props.getArtistAPI(nextProps.match.params.referenceId);
    }
  }

  getPlaylistFromAPI(id: string): void {
    if (id === this.playlist.id.toString()) return;
    const found = lists.find((x): boolean => x.id.toString() === id);
    this.playlist = found || lists[0];
  }
  renderBackground(): React.ReactNode {
    const artist = this.isArtist ? this.props.currentArtist : null;
    const color1 =
      artist?.backgroundGradient?.color1 || this.playlist.color1 || '#aed8e5';
    const color2 =
      artist?.backgroundGradient?.color2 || this.playlist.color2 || '#039e4a';

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
  renderSupportButton(): React.ReactNode {
    return (
      this.props.currentArtist && (
        <div className="center player-support">
          <ButtonSupport artist={this.props.currentArtist} />
        </div>
      )
    );
  }
  renderTracks(): React.ReactNode {
    const { playing, song } = this.props.player;
    const songId = (playing && song?.id) || -1;
    return (
      <div id="songs" className="mt-3">
        {this.playlist.items.map(
          (song: SongInterface, i: number): React.ReactNode => (
            <div
              key={i}
              className="flex-align-items-center row"
              onClick={(): void => this.props.setPlaylist(this.playlist, song)}
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
  renderCover(): React.ReactNode {
    const disco: DiscographyInterface | undefined =
      this.isArtist &&
      this.props.currentArtist?.discography &&
      this.props.currentArtist.discography[this.props.match.params.id];

    const coverUrl = disco ? disco.cover : this.playlist.cover;
    const playlist = disco ? disco.name : this.playlist.name;
    const owner = disco ? this.props.currentArtist!.name : this.playlist.owner;

    return (
      <div className="player-upper-half center-align track-list m-4 mt-0">
        <div
          className="image radius"
          style={{
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: 'contain'
          }}
        />
        <div className="mt-2 f3 l2">{playlist}&nbsp;</div>
        <div className="f6">{owner}&nbsp;</div>
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <IonPage id="track-list-page">
        {this.renderBackground()}
        <Header centerContent={this.renderSupportButton()} />
        <IonContent scrollY={true} className="track-header">
          <div className="track-list-page mx-25">
            {this.renderCover()}
            {this.renderTracks()}
          </div>
          <BottomTilesComponent tiles={this.props.currentArtist?.tiles} />
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  player
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist, player };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI, setPlaylist })(TrackListPage)
);
