import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonList, IonItem } from '@ionic/react';
import {
  CloseIcon,
  ButtonIcon,
  Header,
  _,
  BackgroundImage,
  Button,
  CardEvent,
  Avatar
} from './../../../components';
import {
  getArtistEventAPI,
  updateArtistSetInitialProperty
} from './../../../actions';
import { EventInterface } from './../../../interfaces';
import { ApplicationState } from './../../../reducers';

interface State {
  willGo: boolean;
}
interface StateProps {
  loading: boolean;
  isPlaying: boolean;
  event: EventInterface | null;
}

interface DispatchProps {
  getArtistEventAPI: (username: string, eventId: string) => void;
  updateArtistSetInitialProperty: (property: string) => void;
}

interface MatchParams {
  id: string;
  eventId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class EventDetailPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      willGo: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.match.params.eventId !== this.props.match.params.eventId ||
      nextProps.event == null
    ) {
      this.props.getArtistEventAPI(
        nextProps.match.params.id,
        nextProps.match.params.eventId
      );
    }
  }

  componentDidMount(): void {
    if (this.props.event == null) {
      this.props.getArtistEventAPI(
        this.props.match.params.id,
        this.props.match.params.eventId
      );
    }
  }

  componentWillUnmount(): void {
    this.props.updateArtistSetInitialProperty('event');
  }

  render(): React.ReactNode {
    return (
      <IonPage id="event-detail-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
        >
          <BackgroundImage
            gradient={`180deg,#000,#20123a`}
            backgroundBottom
            bottomRotate
            backgroundBottomOrange={true}
          >
            <div className="artist-event-detail-page">
              <div className="fixed">
                <Header
                  rightContent={
                    <ButtonIcon
                      icon={<CloseIcon width={12} height={12} />}
                      onClick={(): void => {
                        this.props.updateArtistSetInitialProperty('event');
                        this.props.history.goBack();
                      }}
                    />
                  }
                  centerContent={<h1 className="title">Who's going</h1>}
                />
                <div className="row">
                  <div className="col s12 justify-center">
                    <Button
                      label={this.state.willGo ? "Can't go" : "I'm going"}
                      color={this.state.willGo ? 'disable' : 'secondary'}
                      gradient={true}
                      bold
                      onClick={(): void => {
                        this.setState({ willGo: !this.state.willGo });
                      }}
                    />
                  </div>
                </div>

                <div className="row border-bottom">
                  <div className="col s12">
                    <CardEvent
                      id={Number(this.props.match.params.eventId)}
                      artistUsername={this.props.match.params.id}
                      data={this.props.event}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`content-list ${this.props.isPlaying &&
                  ' is-playing'}`}
              >
                <div className="row">
                  <div className="col s12 ">
                    <IonList lines="none" className="list users">
                      {_.map(
                        this.props.event?.whoIsGoing,
                        (data, i): React.ReactNode => {
                          let opacity = data.isFriend === true ? '' : 'opacity';
                          return (
                            <IonItem key={i}>
                              <div className="row">
                                <div className={`col s3 image ${opacity}`}>
                                  <Avatar
                                    type="circle"
                                    image={data.avatar}
                                    width={50}
                                    height={50}
                                  />
                                </div>
                                <div className={`col s6 info ${opacity}`}>
                                  <span className="user">{data.username}</span>
                                </div>
                                <div className="col s3 action">
                                  <Button
                                    gradient={true}
                                    color="secondary"
                                    label="Connect"
                                  />
                                </div>
                              </div>
                            </IonItem>
                          );
                        }
                      )}
                    </IonList>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { event, loading } = artistAPI;
  const { isPlaying } = settings;
  return { event, loading, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistEventAPI,
    updateArtistSetInitialProperty
  })(EventDetailPage)
);
