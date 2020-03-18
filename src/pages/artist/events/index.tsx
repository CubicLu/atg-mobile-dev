import React from 'react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  _,
  CardEvent,
  LoaderFullscreen,
  BackgroundImage
} from './../../../components';
import {
  IonContent,
  IonList,
  IonItem,
  IonPage,
  IonHeader,
  CreateAnimation
} from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  isPlaying: boolean;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
}

interface MatchParams {
  id: string;
}

interface State {
  blur: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistEventsPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<CreateAnimation> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { blur: false };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist == null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  async handleScroll(event: any): Promise<void> {
    const parentAnimation = this.headerRef.current!.animation;
    const header = document.getElementById('ionHeader');

    const { blur } = this.state;
    const eventBlur = event.detail.currentY >= 100;
    if (blur && !eventBlur) {
      parentAnimation.direction('reverse');
      header?.classList.remove('blur');
      await parentAnimation.play();
    } else if (eventBlur && !blur) {
      parentAnimation.direction('normal');
      header?.classList.add('blur');
      await parentAnimation.play();
    }

    this.setState({ blur: eventBlur });
  }

  render(): React.ReactNode {
    return (
      <IonPage id="events-page">
        <div className="artist-events-page">
          <CreateAnimation
            ref={this.headerRef}
            duration={300}
            fromTo={{
              property: 'background',
              toValue: 'var(--background)',
              fromValue: 'transparent'
            }}
          >
            <IonHeader id="ionHeader" className="fixed ion-no-border">
              <Header
                leftContent={
                  <ButtonIcon
                    icon={<BackIcon />}
                    onClick={(): void => {
                      this.props.history.goBack();
                    }}
                  />
                }
                centerContent={<h1 className="title">Events</h1>}
              />
            </IonHeader>
          </CreateAnimation>
          <IonContent
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
            style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
          >
            <BackgroundImage
              backgroundImage={this.props.currentArtist?.cover.event}
            >
              <h1 className="feature">
                {this.props.currentArtist?.biography &&
                  this.props.currentArtist?.biography[0].headline}
              </h1>
            </BackgroundImage>
            <div
              className={`content-list ${this.props.isPlaying &&
                ' is-playing'}`}
            >
              <IonList lines="none" className="list">
                {_.map(
                  this.props.currentArtist?.events,
                  (data, i): React.ReactNode => {
                    return (
                      <IonItem key={i}>
                        <CardEvent
                          data={data}
                          id={i}
                          artistUsername={this.props.currentArtist?.username}
                        />
                      </IonItem>
                    );
                  }
                )}
              </IonList>
            </div>
          </IonContent>
        </div>
        <LoaderFullscreen visible={this.props.loading} />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, loading } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, loading, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistEventsPage)
);
