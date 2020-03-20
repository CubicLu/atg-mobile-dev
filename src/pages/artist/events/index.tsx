import React from 'react';
import {
  Header,
  CardEvent,
  LoaderFullscreen,
  BackgroundImage,
  HeaderOverlay
} from './../../../components';
import { IonContent, IonList, IonItem, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { validateScrollHeader } from '../../../utils';

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
  private headerRef: React.RefObject<any> = React.createRef();

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

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 30);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef.current!.playTopHeader(currentScroll);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="events-page">
        <div className="artist-events-page">
          <Header title="Events" titleClassName="events" />
          <HeaderOverlay ref={this.headerRef} />

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
                {this.props.currentArtist?.events?.map(
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
