import React from 'react';
import { ListItem } from './../../../components';
import { IonList, IonContent } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {}
class ProfileFriendsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="profile-friends-page">
        <IonList lines="none">
          {[
            { name: 'Amanda', friend: true, id: 'amanda' },
            { name: 'Brian', id: 'amanda' },
            { name: 'Chris', friend: true, id: 'amanda' },
            { name: 'Dexter', friend: true, id: 'amanda' },
            { name: 'Edmund', id: 'amanda' },
            { name: 'Fabrizio', friend: true, id: 'amanda' },
            { name: 'Gustav', id: 'amanda' },
            { name: 'Harold', friend: true, id: 'amanda' }
          ].map(
            (data, i): React.ReactNode => {
              return (
                <ListItem
                  key={i}
                  node={i}
                  sliding={true}
                  bottomBorder={true}
                  optionRemove={true}
                  optionAddPlaylist={false}
                  leftDisabled={!data.friend}
                  username={data.name}
                  hasAvatar={true}
                  avatarSize={48}
                  pendingButton={!data.friend}
                  chatButton={data.friend}
                  expandArrow={true}
                  avatarClick={(): void =>
                    this.props.history.push('/profile/' + data.id)
                  }
                />
              );
            }
          )}
        </IonList>
      </IonContent>
    );
  }
}

export default withRouter(ProfileFriendsPage);
