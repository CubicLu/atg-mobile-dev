import React from 'react';
import { ListItem } from './../../../components';
import { IonList, IonContent } from '@ionic/react';

interface Props {}
class ProfileFriendsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="profile-friends-page">
        <IonList lines="none">
          {[
            { name: 'Amanda', friend: true },
            { name: 'Brian' },
            { name: 'Chris', friend: true },
            { name: 'Dexter', friend: true },
            { name: 'Edmund' },
            { name: 'Fabrizio', friend: true },
            { name: 'Gustav' },
            { name: 'Harold', friend: true }
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
                />
              );
            }
          )}
        </IonList>
      </IonContent>
    );
  }
}

export default ProfileFriendsPage;
