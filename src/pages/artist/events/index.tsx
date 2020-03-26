import React from 'react';
import {
  Header,
  CardEvent,
  BackgroundImage,
  HeaderOverlay
} from './../../../components';
import { IonContent, IonList, IonItem, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { validateScrollHeader } from '../../../utils';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
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
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 30);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef && this.headerRef.current.playTopHeader(currentScroll);
  }

  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <IonPage />;
    return (
      <IonPage id="events-page">
        <Header title="Events" titleClassName="events" />
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={this.handleScroll.bind(this)}
        >
          <div className="artist-events-page">
            <BackgroundImage backgroundImage={currentArtist.cover?.event} />
            <HeaderOverlay ref={this.headerRef} />
            <div className={`content-list is-playing'}`}>
              <IonList lines="none" className="list">
                {currentArtist.events?.map(
                  (data, i): React.ReactNode => (
                    <IonItem key={i}>
                      <CardEvent
                        data={data}
                        id={i}
                        artistUsername={currentArtist.username}
                      />
                    </IonItem>
                  )
                )}
              </IonList>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI })(ArtistEventsPage)
);
