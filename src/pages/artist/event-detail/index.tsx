import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonList, IonItem } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  Button,
  CardEvent,
  Avatar
} from './../../../components';
import {
  EventInterface,
  ShapesSize,
  Colors,
  Sizes
} from './../../../interfaces';
import { ApplicationState } from './../../../reducers';
import {
  getArtistEventAPI,
  updateArtistSetInitialProperty
} from './../../../actions';

interface State {
  willGo: boolean;
}
interface StateProps {
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
        <div className={`artist-event-detail-page`}>
          <Header
            rightCloseButton
            title="Who's going"
            rightCloseOnClick={(): void => {
              this.props.updateArtistSetInitialProperty('event');
              this.props.history.goBack();
            }}
          />
          <IonContent>
            <BackgroundImage
              gradient={`180deg,#000,#20123a`}
              backgroundBottom={true}
              backgroundBottomOrange={true}
              backgroundBottomOpacity={0.15}
            />
            <div className="content-fixed" slot="fixed">
              <div className={`flex-justify-content-center`}>
                <Button
                  label={this.state.willGo ? "Can't go" : "I'm going"}
                  color={this.state.willGo ? Colors.disable : Colors.blue}
                  type={ShapesSize.badge}
                  gradient={true}
                  onClick={(): void => {
                    this.setState({ willGo: !this.state.willGo });
                  }}
                />
              </div>
              <CardEvent
                id={Number(this.props.match.params.eventId)}
                artistUsername={this.props.match.params.id}
                data={this.props.event}
              />
              <div className="content-list">
                <IonList lines="none" className="list users">
                  {this.props.event?.whoIsGoing?.map(
                    (data, i): React.ReactNode => {
                      let opacity = data.isFriend === true ? '' : 'opacity';
                      return (
                        <IonItem key={i}>
                          <div className="row">
                            <div className={`col s2 no-padding ${opacity}`}>
                              <Avatar
                                type={ShapesSize.circle}
                                image={data.avatar}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div
                              className={`col s7 no-padding info ${opacity}`}
                            >
                              <span className="user f5">{data.username}</span>
                            </div>
                            <div className="col s3 f6">
                              <Button
                                className="mt-1"
                                gradient={true}
                                color={Colors.blue}
                                size={Sizes.md}
                                type={ShapesSize.rounded}
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
          </IonContent>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { event } = artistAPI;
  return { event };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistEventAPI,
    updateArtistSetInitialProperty
  })(EventDetailPage)
);
