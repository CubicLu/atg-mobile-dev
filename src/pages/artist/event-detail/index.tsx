import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonList } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  Button,
  CardEvent,
  ListItem
} from './../../../components';
import { EventInterface } from './../../../models';
import { ShapesSize, Colors, GradientDirection } from './../../../types';
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
    if (this.props.event == null) {
      this.props.getArtistEventAPI(
        this.props.match.params.id,
        this.props.match.params.eventId
      );
    } else if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.match.params.eventId !== this.props.match.params.eventId
    ) {
      this.props.getArtistEventAPI(
        nextProps.match.params.id,
        nextProps.match.params.eventId
      );
    }
  }

  render(): React.ReactNode {
    return (
      <IonPage id="event-detail-page" className={'artist-event-detail-page'}>
        <Header
          rightCloseButton
          title="Who's going"
          leftBackOnClick={(): void => this.props.history.goBack()}
          rightCloseHref={`/artist/${this.props.match.params.id}/event`}
          rightCloseOnClick={(): void => {
            this.props.updateArtistSetInitialProperty('event');
          }}
        >
          <div className={'mt-12 flex-justify-content-center'}>
            <Button
              label={this.state.willGo ? "Can't go" : "I'm going"}
              color={this.state.willGo ? Colors.disable : Colors.blue}
              type={ShapesSize.badge}
              gradient={true}
              gradientDirection={GradientDirection.horizontal}
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
        </Header>

        <BackgroundImage
          gradient={'180deg,#000,#20123a'}
          backgroundBottom={true}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.15}
        />

        <IonContent>
          <IonList lines="none">
            {this.props.event?.whoIsGoing?.map(
              (data, i): React.ReactNode => {
                return (
                  <ListItem
                    key={i}
                    node={i}
                    sliding={false}
                    bottomBorder={false}
                    hasAvatar={true}
                    avatarImage={data.avatar}
                    avatarSize={48}
                    username={data.username}
                    connectButton={true}
                    avatarClick={(): void =>
                      this.props.history.push(`/profile/${data.name}`)
                    }
                  />
                );
              }
            )}
          </IonList>
        </IonContent>
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
