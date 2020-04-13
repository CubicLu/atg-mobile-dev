import React from 'react';
import { IonPage, IonContent, IonAlert } from '@ionic/react';
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
import { ChannelInterface, ArtistInterface } from '../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApplicationState } from '../../reducers';
import { getArtistAPI, getRadioArtistAPI } from './../../actions';

interface MatchParams {
  id: string;
}
interface State {
  show: boolean;
}
interface StateProps {
  loading: boolean;
  radioArtist: ChannelInterface;
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  getRadioArtistAPI: (id: string) => void;
  getArtistAPI: (id: string) => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class RadioArtistPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false
    };
  }
  refreshRadio(): void {
    let artistRadioId = this.props.match.params.id;
    let supported = this.props.currentArtist?.support;
    if (!this.props.currentArtist || !supported) {
      this.props.history.push(`/artist/${this.props.match.params.id}`);
    }
    this.props.getRadioArtistAPI(artistRadioId);
  }
  componentDidMount(): void {
    this.refreshRadio();
  }
  componentDidUpdate(prevProps): void {
    if (this.props.match.params.id != prevProps.match.params.id)
      this.refreshRadio();
  }
  showMessage(condition = false): void {
    this.setState({
      show: condition
    });
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
              onClick={(): void => this.showMessage(true)}
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
          <SliderRadio diameter={'72px'} className="f0 l1" data={this.radios} />
        </IonContent>
        <IonAlert
          isOpen={this.state.show}
          onDidDismiss={(): void => this.showMessage(false)}
          header={'Atention!'}
          message={`You'll be redirect to external link, are you sure?`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (): void => {
                this.showMessage();
              }
            },
            {
              text: 'Yes',
              handler: (): void => {
                window.open('https://google.com', '_blank');
                this.showMessage();
              }
            }
          ]}
        />
      </IonPage>
    );
  }
  artistRadio = {
    id: '0',
    type: 'Artist',
    name: 'BOB MARLEY',
    title: 'EVERYTHING REGGAE',
    subtitle: 'BEATS OF THE ISLANDS',
    color: `180deg,#ffc90d, #034627`,
    image: require('./../../assets/img/background/home-screen-v-14-b.png')
  };
  radios = [
    {
      label: 'Luciano',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      label: 'Bob Marley',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.jpg'
    },
    {
      label: 'Mishka',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/hip-hop.jpg'
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
      label: 'Pharrel Williams',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg'
    }
  ];
}
const mapStateToProps = ({
  radioAPI,
  artistAPI
}: ApplicationState): StateProps => {
  const { radioArtist, loading } = radioAPI;
  const { currentArtist } = artistAPI;
  return {
    radioArtist,
    loading,
    currentArtist
  };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI, getRadioArtistAPI })(RadioArtistPage)
);
