import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
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
  ArtistInterface,
  SongInterface
} from '../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApplicationState } from '../../reducers';
import {
  getArtistAPI,
  getRadioArtistAPI,
  setRadioPlaylistPlayer,
  playSong,
  pauseSong
} from './../../actions';

interface MatchParams {
  id: string;
}

interface StateProps {
  loading: boolean;
  radioArtist: ChannelInterface;
  currentArtist: ArtistInterface | null;
  playing: boolean;
  paused: boolean;
  song: SongInterface | undefined;
}

interface DispatchProps {
  getRadioArtistAPI: (id: string) => void;
  getArtistAPI: (id: string) => void;
  setRadioPlaylistPlayer: () => void;
  pauseSong: () => void;
  playSong: (song: SongInterface) => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class RadioArtistPage extends React.Component<Props> {
  refreshRadio(): void {
    let artistRadioId = this.props.match.params.id;
    this.props.getArtistAPI(artistRadioId);
    let supported = this.props.currentArtist?.support;
    if (this.props.currentArtist && !supported) {
      this.props.history.push(`/artist/${this.props.match.params.id}`);
    }
    this.props.getRadioArtistAPI(artistRadioId);
  }
  componentDidMount(): void {
    this.refreshRadio();
  }
  componentDidUpdate(prevProps): void {
    if (this.props.match.params.id !== prevProps.match.params.id)
      this.refreshRadio();
  }
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    return (
      <IonPage id="radio-artist-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header
          leftBackButton={true}
          rightContent={
            <div
              className="mt-1 default-button gold"
              onClick={(): void =>
                this.props.history.push(
                  `/artist/${this.props.match.params.id}/event`
                )
              }
            >
              <TicketIcon color="#000000" />
            </div>
          }
          rightActionButton={false}
        />

        <BackgroundImage
          gradient={this.artistRadio.color}
          backgroundImage={this.artistRadio.image}
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
          <div className="row mt-4" />
          <RadioPlayer
            onPlayClick={(): void => this.props.setRadioPlaylistPlayer()}
            onPauseClick={(): void => this.props.pauseSong()}
            onResumeClick={(): void => this.props.playSong(this.props.song!)}
            playing={this.props.playing}
            song={this.props.song}
            paused={this.props.paused}
            title={this.artistRadio.title}
            subtitle={this.artistRadio.subtitle}
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
                <ArrowRightIcon width={8} height={10} stroke={3} />
              </span>
            </div>
          </div>
          <div className="row mt-4" />
          <SectionTitle
            className="mt-2 mx-3 mb-05"
            leftClassName="text-30"
            title={`${this.artistRadio.name} RECOMENDS`}
            viewAll={false}
          />
          <SliderRadio diameter={'72px'} data={this.radios} />
        </IonContent>
      </IonPage>
    );
  }
  artistRadio = {
    id: 'bob-marley',
    type: 'Artist',
    name: 'BOB MARLEY',
    title: 'EVERYTHING REGGAE',
    subtitle: 'BEATS OF THE ISLANDS',
    color: `180deg,#ffc90d, #034627`,
    image: require('./../../assets/img/background/home-screen-v-14-b.png')
  };
  radios = [
    {
      label: 'Pharrell Williams',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png',
      id: 'pharrell-williams'
    },
    {
      label: 'Bob Marley',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.jpg',
      id: 'bob-marley'
    },
    {
      label: 'Mishka',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/hip-hop.jpg',
      id: 'mishka'
    },
    {
      label: 'UB40',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/soul.jpg'
    },
    {
      label: 'Matisyahu',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/blues.jpg'
    },
    {
      label: 'Sean Paul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/jazz.jpg'
    },
    {
      label: 'Luciano',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg',
      id: 'luciano'
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

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    getRadioArtistAPI,
    setRadioPlaylistPlayer,
    playSong,
    pauseSong
  })(RadioArtistPage)
);
