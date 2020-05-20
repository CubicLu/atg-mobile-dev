import React from 'react';
import { ListItem } from './../../../components';
import { IonList, IonContent } from '@ionic/react';
import { FriendInterface } from '../../../models';
import { connect } from 'react-redux';
import { getFriendsAPI } from '../../../actions/api/friendsActions';
import { ApplicationState } from '../../../reducers';

interface StateProps {
  friends: FriendInterface[];
}
interface DispatchProps {
  getFriendsAPI: () => void;
}

interface Props extends StateProps, DispatchProps {
  canRemove?: boolean;
}
class ProfileFriendsPage extends React.Component<Props> {
  UNSAFE_componentWillMount(): void {
    if (!(this.props.friends && this.props.friends.length > 0)) {
      this.props.getFriendsAPI();
    }
  }

  render(): React.ReactNode {
    return (
      <IonContent className="profile-friends-page">
        <IonList lines="none">
          {this.props.friends?.slice(1).map(
            (friend, i): React.ReactNode => {
              return (
                <ListItem
                  key={i}
                  node={i}
                  sliding={true}
                  bottomBorder={true}
                  optionRemove={true}
                  optionAddPlaylist={false}
                  leftDisabled={!friend.isFriend}
                  isArtist={friend.isArtist}
                  username={friend.username}
                  hasAvatar={true}
                  avatarImage={friend.image}
                  avatarSize={48}
                  pendingButton={!friend.isFriend}
                  chatButton={friend.isFriend}
                  communityFeedButton={friend.isFriend}
                  expandArrow={true}
                />
              );
            }
          )}
        </IonList>
      </IonContent>
    );
  }
}

const mapStateToProps = ({ friendAPI }: ApplicationState): StateProps => {
  const { friends } = friendAPI;
  return { friends };
};

export default connect(mapStateToProps, { getFriendsAPI })(ProfileFriendsPage);
