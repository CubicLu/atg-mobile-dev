import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { connect } from 'react-redux';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  HeaderOverlay,
  RadioPlayer,
  TicketIcon,
  ArrowRightIcon
} from '../../components';
import {
  ChannelInterface,
  SongInterface,
  PlaylistInterface
} from '../../models';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApplicationState } from '../../reducers';
import {
  getRadioArtistAPI,
  setPlaylist,
  playSong,
  pauseSong
} from './../../actions';
import { guitarPlaylist as playlist } from '../../reducers/playerReducer';

interface MatchParams {
  id: string;
}

interface StateProps {
  radioArtist: ChannelInterface | null;
  playing: boolean;
  paused: boolean;
  song: SongInterface | undefined;
}

interface DispatchProps {
  getRadioArtistAPI: (id: string) => void;
  pauseSong: () => void;
  playSong: (song: SongInterface) => void;
  setPlaylist: (playlist: PlaylistInterface, song: SongInterface) => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class RadioArtistPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getRadioArtistAPI(this.props.match.params.id);
  }
  componentDidUpdate(): void {
    if (this.props.radioArtist?.id !== this.props.match.params.id) {
      this.props.getRadioArtistAPI(this.props.match.params.id);
    }
  }

  private headerRef: React.RefObject<any> = React.createRef();

  render(): React.ReactNode {
    if (!this.props.radioArtist) {
      return (
        <IonPage id="radio-artist-page">
          <BackgroundImage default />
        </IonPage>
      );
    }

    return (
      <IonPage id="radio-artist-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header
          leftBackButton={true}
          rightContent={
            <IonRouterLink
              routerLink={`/artist/${this.props.match.params.id}/event`}
            >
              <div className="mt-1 default-button gold">
                <TicketIcon color="#000000" />
              </div>
            </IonRouterLink>
          }
          rightActionButton={false}
        />

        <BackgroundImage
          gradient={this.props.radioArtist?.color}
          backgroundImage={this.props.radioArtist?.image}
          backgroundTop={false}
          backgroundBottom={true}
          backgroundBottomOpacity={0.3}
        />

        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="row mt-4" />
          <RadioPlayer
            onPlayClick={(): void =>
              this.props.setPlaylist(playlist, playlist.items[0])
            }
            onPauseClick={(): void => this.props.pauseSong()}
            onResumeClick={(): void => this.props.playSong(this.props.song!)}
            playing={this.props.playing}
            song={this.props.song}
            paused={this.props.paused}
            title={this.props.radioArtist.title}
            subtitle={this.props.radioArtist.subtitle}
          />
          <div className="flex-justify-content-end">
            <div className="flex left-align f6">
              <div className="mr-1">
                <div>Previous Song </div>
                <span>River Runs Deep </span>
              </div>
              <span
                className="mx-3 mt-2"
                onClick={(): void => {
                  this.props.history.push(
                    `/radio/${this.props.match.params.id}/history`
                  );
                }}
              >
                View History&nbsp;
                <ArrowRightIcon width={10} height={14} stroke={3} />
              </span>
            </div>
          </div>
          <div className="row mt-4" />
          <SectionTitle
            className="mt-2 mx-3 mb-05"
            leftClassName="text-30"
            title={`${this.props.radioArtist.name} RECOMENDS`}
            viewAll={false}
          />
          <SliderRadio
            diameter={'72px'}
            className="f6 l1"
            data={this.props.radioArtist.similarStations}
          />
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({
  radioAPI,
  player
}: ApplicationState): StateProps => {
  const { radioArtist } = radioAPI;
  const { playing, paused, song } = player;
  return {
    radioArtist,
    playing,
    paused,
    song
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getRadioArtistAPI,
    setPlaylist,
    playSong,
    pauseSong
  })(RadioArtistPage)
);
