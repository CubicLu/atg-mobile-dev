import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  SliderRadioCard,
  RadioPauseButton
} from '../../components';
import { RadioPlayButton, PlusButton } from '../../components/icon/player';
import {
  ArtistInterface,
  ChannelInterface,
  PlaylistInterface,
  SongInterface
} from '../../models';
import { radioPlaylist } from '../../reducers/playerReducer';
import { Nullable } from '../../types';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { pauseSong, playSong, setPlaylist } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { radios, customRadios } from '../../constants/radios';

interface MatchParams {
  genre: string;
}

interface StateProps {
  loading: boolean;
  radioArtist: Nullable<ChannelInterface>;
  currentArtist: Nullable<ArtistInterface>;
  playing: boolean;
  paused: boolean;
  song: SongInterface | undefined;
}

interface DispatchProps {
  pauseSong: () => void;
  playSong: (song: SongInterface) => void;
  setPlaylist: (playlist: PlaylistInterface, song: SongInterface) => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

interface State {
  paramGenre: Nullable<string>;
  currentGenre: Nullable<ChannelInterface>;
}

class RadioPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      paramGenre: null,
      currentGenre: null
    };
  }

  componentDidMount(): void {
    this.getGenre();
  }

  getGenre(): void {
    if (!this.props.match?.params.genre) {
      return this.setState({ currentGenre: this.genres[0] });
    }
    const { genre } = this.props.match.params;

    const current = this.state.currentGenre?.name.toLocaleLowerCase();
    if (genre?.toLocaleLowerCase() === current) return;

    const currentGenre =
      this.genres.find(
        (a): boolean =>
          a?.name?.toLocaleLowerCase() === genre?.toLocaleLowerCase()
      ) || this.genres[0];

    this.setState({ currentGenre });
  }

  togglePlayPause = (): void => {
    const { song, playing, paused } = this.props;
    if (!song) this.onPlayClick();
    else if (song && playing) this.onPauseClick();
    else if (song && paused) this.onResumeClick();
  };

  onPlayClick = (): void => {
    this.props.setPlaylist(radioPlaylist, radioPlaylist.items[0]);
  };
  onPauseClick = (): void => this.props.pauseSong();
  onResumeClick = (): void =>
    this.props.song && this.props.playSong(this.props.song);

  render(): React.ReactNode {
    return (
      <IonPage id="radio-page">
        <Header
          leftBackButton={false}
          rightActionButton={true}
          rightActionHref={'/radio/filter'}
        />

        <BackgroundImage
          gradientOverlay={true}
          gradient={this.state.currentGenre?.color}
          backgroundImage={this.state.currentGenre?.image}
          backgroundTop={false}
          backgroundBottom={false}
        />

        <IonContent fullscreen={true}>
          <div className="absolute-logo-left">
            <span className="brand-title text-48 l05">panthr</span>
            <br />
            <span className="h3 mx-2 l08">AI-POWERED RADIO</span>
          </div>
          <div className="top-half flex-compass south center-align">
            <div className="flex left-align mx-auto">
              <div onClick={this.togglePlayPause} className="mt-1 mr-2">
                {this.props.playing ? (
                  <RadioPauseButton />
                ) : (
                  <RadioPlayButton />
                )}
              </div>
              <div>
                <span className="h0 text-44">PANTHR RADIO</span>
                <br />
                <span className="h3 text-26">PERSONALIZED FOR ROSETTA</span>
              </div>
            </div>
          </div>
          <SectionTitle
            className="mt-2 mx-3"
            title="STATIONS"
            viewAll={true}
            viewAllUrl="/radio/view-all"
          />
          <SliderRadio className="f6 l1" width={110} data={radios} />

          <div
            onClick={(): void =>
              this.props.history.push('/radio/station/create')
            }
          >
            <SectionTitle
              className="mt-2 mx-3"
              leftClassName="flex"
              leftContent={<PlusButton />}
              title="MY CUSTOM STATIONS"
              viewAll={false}
            />
          </div>
          <div className="card-station">
            <SliderRadioCard
              canEdit={true}
              data={customRadios}
              onPlayClick={(): void => {
                this.props.setPlaylist(radioPlaylist, radioPlaylist.items[0]);
              }}
              onPauseClick={(): void => this.props.pauseSong()}
              onResumeClick={(): void => this.props.playSong(this.props.song!)}
              playing={this.props.playing}
              song={this.props.song}
              paused={this.props.paused}
              playButton={true}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }
  genres: ChannelInterface[] = [
    {
      id: '0',
      type: 'Genre',
      name: 'Default',
      title: 'EVERYTHING REGGAE',
      subtitle: 'BEATS OF THE ISLANDS',
      color: '180deg,#7A41FF00,#1B0334',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/default.jpg'
    },
    {
      id: '1',
      type: 'Genre',
      name: 'Blues',
      title: 'KING BLACK ACID',
      subtitle: 'ROCKING YOUR SOUL',
      color: '180deg,#00000021,#000',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/blues.jpg'
    },
    {
      id: '4',
      type: 'Genre',
      name: 'Jazz',
      title: 'FOREVER JAZZ',
      subtitle: 'FREE PREVIEW',
      color: '180deg,#ffffff70,#000',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/jazz.jpg'
    },
    {
      id: '2',
      type: 'Genre',
      name: 'Funk',
      title: 'FUNK YOU UP!',
      subtitle: 'Listen Now',
      color: '180deg, #ff966600, #ae7005',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/funk.jpg'
    },
    {
      id: '3',
      type: 'Genre',
      name: 'Reggae',
      title: 'EVERYTHING REGGAE',
      subtitle: 'BEATS OF THE ISLANDS',
      color: '180deg,#bb9b00b5,#034627',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/reggae.jpg'
    },
    {
      id: '6',
      type: 'Genre',
      name: 'Country',
      title: 'MUSIC FOR ALL',
      subtitle: 'Free Preview',
      color: '180deg,#7A41FF00,#1B0334',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/country.jpg'
    }
  ];
}

const mapStateToProps = ({
  radioAPI,
  artistAPI,
  player
}: ApplicationState): StateProps => {
  const { radioArtist, loading } = radioAPI;
  const { currentArtist } = artistAPI;
  const { playing, paused, song } = player;
  return {
    radioArtist,
    loading,
    currentArtist,
    playing,
    paused,
    song
  };
};

export default connect(mapStateToProps, {
  setPlaylist,
  playSong,
  pauseSong
})(RadioPage);
