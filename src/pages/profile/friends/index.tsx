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
                    <div className="row mx-1">
                      <div className={`col s2 no-padding ${opacity}`}>
                        <Avatar
                          type={ShapesSize.circle}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className={`col s7 no-padding info ${opacity}`}>
                        <span className="user f5">BassmanJeff</span>
                      </div>
                      <div className="col s3 flex-align-items-end flex-justify-content-end">
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
                      icon={
                        <CloseIcon width={15} height={15} strokeWidth={2} />
                      }
                      color={Colors.red}
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
