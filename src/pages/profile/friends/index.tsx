import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  ButtonIcon,
  MessageBalloonIcon,
  CloseIcon,
  Button
} from './../../../components';

import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItem,
  IonContent
} from '@ionic/react';
import { ShapesSize, Colors, Sizes } from '../../../interfaces';

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
                    <div className="m-1 fluid flex-justify-content-end">
                      <div className={`align-start ${opacity}`}>
                        <div className="p-05 flex-align-items-center">
                          <Avatar
                            type={ShapesSize.circle}
                            width={48}
                            height={48}
                          />
                          <span className="ml-2 f5">BassmanJeff</span>
                        </div>
                      </div>
                      <div className="align-end no-padding flex-align-items-center my-auto mr-1">
                        {data.friend === false ? (
                          <Button
                            className="mt-10"
                            gradient={true}
                            color={Colors.tertiary}
                            size={Sizes.md}
                            type={ShapesSize.rounded}
                            label="PENDING"
                          />
                        ) : (
                          <ButtonIcon
                            icon={<MessageBalloonIcon />}
                            color={Colors.transparent}
                          />
                        )}
                      </div>
                    </div>
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      icon={<CloseIcon strokeWidth={2} />}
                      color={Colors.red}
                      className="no-padding"
                      type={ShapesSize.normal}
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
