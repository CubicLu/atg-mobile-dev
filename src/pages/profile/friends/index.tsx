import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  ButtonIcon,
  MessageBalloonIcon,
  CloseIcon,
  Button
} from './../../../components';
import {} from './../../../actions';
import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItem,
  IonContent
} from '@ionic/react';

interface Props extends RouteComponentProps {}

class ProfileFriendsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="profile-friends-page">
        <IonList lines="none">
          {[{ friend: false }, {}, {}, {}, {}, {}, {}, {}].map(
            (data, i): React.ReactNode => {
              let opacity = data.friend === false ? 'opacity' : '';
              return (
                <IonItemSliding key={i}>
                  <IonItem>
                    <div className="row">
                      <div className={`col s3 image ${opacity}`}>
                        <Avatar type="circle" width={50} height={50} />
                      </div>
                      <div className={`col s6 info ${opacity}`}>
                        <span className="user">BassmanJeff</span>
                      </div>
                      <div className="col s3 action">
                        {data.friend === false ? (
                          <Button
                            gradient={true}
                            color="tertiary"
                            label="PENDING"
                          />
                        ) : (
                          <ButtonIcon
                            icon={<MessageBalloonIcon />}
                            color="transparent"
                          />
                        )}
                      </div>
                    </div>
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      icon={
                        <CloseIcon width={15} height={15} strokeWidth={2} />
                      }
                      color="red"
                      type="normal"
                    />
                  </IonItemOptions>
                </IonItemSliding>
              );
            }
          )}
        </IonList>
      </IonContent>
    );
  }
}

export default withRouter(ProfileFriendsPage);
