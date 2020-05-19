import React from 'react';
import { connect } from 'react-redux';
import { IonContent, IonPage, IonList } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  Button,
  CardEvent,
  ListItem
} from './../../../components';
import { EventInterface, FriendInterface } from './../../../models';
import { ShapesSize, Colors, GradientDirection } from './../../../types';
import { ApplicationState } from './../../../reducers';
import { getArtistEventAPI } from './../../../actions';
import { getFriendsAPI } from './../../../actions/api/friendsActions';
import { RouteComponentProps } from 'react-router';

interface State {
  willGo: boolean;
}
interface StateProps {
  event: EventInterface | null;
  friends: FriendInterface[];
}

interface DispatchProps {
  getArtistEventAPI: (username: string, eventId: string) => void;
  getFriendsAPI: () => void;
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

  artist = '';
  eventId = '-1';

  componentDidMount(): void {
    this.props.getFriendsAPI();
  }
  componentDidUpdate(): void {
    const { id, eventId } = this.props.match.params;
    if (id === this.artist && eventId === this.eventId) return;

    this.artist = this.props.match.params.id;
    this.eventId = this.props.match.params.eventId;
    this.props.getArtistEventAPI(this.artist, this.eventId);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="event-detail-page" className={'artist-event-detail-page'}>
        <Header rightCloseButton title="Who's going" rightClickGoBack={true}>
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
            disableGoing={true}
          />
        </Header>

        <BackgroundImage default />

        <IonContent>
          <IonList lines="none">
            {this.props.friends.slice(2, 11).map(
              (user, i): React.ReactNode => {
                return (
                  <ListItem
                    key={i}
                    node={i}
                    sliding={false}
                    bottomBorder={false}
                    hasAvatar={true}
                    avatarImage={user.image}
                    avatarSize={48}
                    username={user.username}
                    connectButton={!user.isFriend}
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

const mapStateToProps = ({
  friendAPI,
  artistAPI
}: ApplicationState): StateProps => {
  const { friends } = friendAPI;
  const { event } = artistAPI;
  return { friends, event };
};

export default connect(mapStateToProps, { getArtistEventAPI, getFriendsAPI })(
  EventDetailPage
);
