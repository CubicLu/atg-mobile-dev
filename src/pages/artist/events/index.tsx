import React from 'react';
import {
  Header,
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
          <Header title="Events" titleClassName="events">
            <CreateAnimation
              ref={this.headerRef}
              duration={300}
              fromTo={{
                property: 'background',
                toValue: 'var(--background)',
                fromValue: 'transparent'
              }}
            />
          </Header>
          <IonContent
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
            style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
          >
            <BackgroundImage
              backgroundImage={this.props.currentArtist?.cover.event}
            />
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
