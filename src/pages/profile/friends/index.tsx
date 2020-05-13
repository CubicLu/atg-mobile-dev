import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ListItem } from './../../../components';

import { IonList, IonContent } from '@ionic/react';
import { FriendInterface } from '../../../models';
import { connect } from 'react-redux';
import { getFriendsAPI } from '../../../actions/api/friendsActions';
import { ApplicationState } from '../../../reducers';

interface StateProps {
  friends: FriendInterface[];
  loading: boolean;
}

interface DispatchProps {
  getFriendsAPI: () => void;
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}
class ProfileFriendsPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getFriendsAPI();
  }
  goToLink = (data: FriendInterface): (() => void) => (): void => {
    this.props.history.push(`/profile/${data.name}`);
  };

  render(): React.ReactNode {
    return (
      <>
        <IonContent className="profile-friends-page">
          <IonList lines="none">
            {this.props.friends?.slice(1).map(
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
                    avatarImage={data.image}
                    avatarSize={48}
                    pendingButton={!friend}
                    chatButton={friend}
                    communityFeedButton={friend}
                    expandArrow={true}
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
