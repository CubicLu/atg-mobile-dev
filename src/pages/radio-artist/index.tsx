import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  RadioPlayer,
  TicketIcon,
  ArrowRightIcon
} from '../../components';
import {
  ChannelInterface,
  SongInterface,
  PlaylistInterface
} from '../../models';
import { ApplicationState } from '../../reducers';
import {
  getRadioArtistAPI,
  setPlaylist,
  playSong,
  pauseSong
} from './../../actions';
import { guitarPlaylist as playlist } from '../../reducers/playerReducer';
import { RouteComponentProps } from 'react-router';

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
  extends RouteComponentProps<MatchParams>,
    DispatchProps,
    StateProps {}

class RadioArtistPage extends React.Component<Props> {
  componentDidUpdate(): void {
    if (this.props.radioArtist === null) {
      return this.props.getRadioArtistAPI(this.props.match.params.id);
    }
    if (this.props.radioArtist?.id !== this.props.match.params.id) {
      return this.props.getRadioArtistAPI(this.props.match.params.id);
    }
  }

  render(): React.ReactNode {
    const historyUrl = `/radio/${this.props.match.params.id}/history`;
    const artistEvent = `/artist/${this.props.match.params.id}/event`;
    return (
      <IonPage id="radio-artist-page">
        <Header
          leftBackButton={true}
          rightContent={
            <div
              className="mt-1 default-button gold"
              onClick={(): void => this.props.history.push(artistEvent)}
            >
              <TicketIcon color="#000000" />
            </div>
          }
          rightActionButton={false}
        />

        <BackgroundImage
          gradient={this.props.radioArtist?.color || '180deg,#652ddd,#2c0d5c'}
          backgroundImage={this.props.radioArtist?.image}
          backgroundTop={false}
          backgroundBottom={true}
          backgroundBottomOpacity={0.3}
        />

        <IonContent>
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
            title={this.props.radioArtist?.title}
            subtitle={this.props.radioArtist?.subtitle}
          />
          <div className="flex-justify-content-end">
            <div className="flex left-align f6">
              <div className="mr-1">
                <div>Previous Song </div>
                <span>River Runs Deep </span>
              </div>

              <span
                className="mx-3 mt-2 f6"
                onClick={(): void => this.props.history.push(historyUrl)}
              >
                <span className="mx-3 mt-2 f6">
                  View History&nbsp;
                  <ArrowRightIcon width={10} height={14} stroke={3} />
                </span>
              </span>
            </div>
          </div>

          <div className="row mt-4" />

          <SectionTitle
            className="mt-2 mx-3 mb-05"
            leftClassName="text-30"
            title={`${this.props.radioArtist?.name} RECOMENDS`}
            viewAll={false}
          />
          <SliderRadio
            diameter={'72px'}
            className="f6 l1"
            data={this.props.radioArtist?.similarStations}
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

export default connect(mapStateToProps, {
  getRadioArtistAPI,
  setPlaylist,
  playSong,
  pauseSong
})(RadioArtistPage);
