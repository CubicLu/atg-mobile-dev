import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ListItem } from './../../../components';

import { IonList, IonContent } from '@ionic/react';
import { ActionType, FriendInterface } from '../../../interfaces';
import { connect } from 'react-redux';
import { getFriendsAPI } from '../../../actions/api/friendsActions';
import { ApplicationState } from '../../../reducers';

interface StateProps {
  friends: FriendInterface[];
  loading: boolean;
}

interface DispatchProps {
  getFriendsAPI: () => { type: ActionType };
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class ProfileFriendsPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getFriendsAPI();
  }

  goToLink = (data: FriendInterface): (() => void) => (): void => {
    const { name } = data;
    this.props.history.push(`/profile/${name}`);
  };

  render(): React.ReactNode {
    const { friends } = this.props;
    return (
      <>
        <IonContent className="profile-friends-page">
          <IonList lines="none">
            {friends &&
              friends.map(
                (data, i): React.ReactNode => {
                  const { name, friend } = data;
                  return (
                    <ListItem
                      key={i}
                      node={i}
                      sliding={true}
                      bottomBorder={true}
                      optionRemove={true}
                      optionAddPlaylist={false}
                      leftDisabled={!friend}
                      username={name}
                      hasAvatar={true}
                      avatarSize={48}
                      pendingButton={!friend}
                      chatButton={friend}
                      expandArrow={true}
                      avatarClick={this.goToLink(data)}
                    />
                  );
                }
              )}
          </IonList>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = ({ friendAPI }: ApplicationState): StateProps => {
  const { friends, loading } = friendAPI;
  return { friends, loading };
};

export default withRouter(
  connect(mapStateToProps, { getFriendsAPI })(ProfileFriendsPage)
);
