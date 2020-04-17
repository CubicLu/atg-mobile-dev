import React from 'react';
import { ShapesSize, Colors } from '../../../interfaces';
import {
  Avatar,
  ButtonIcon,
  AddPlaylistIcon,
  CloseIcon,
  ButtonSupportIcon
} from './../../../components';
import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItem,
  IonContent
} from '@ionic/react';

interface Props {
  isFriend: boolean;
}

class ProfileVaultPage extends React.Component<Props> {
  public static defaultProps = {
    isFriend: false
  };
  render(): React.ReactNode {
    const { isFriend } = this.props;
    return (
      <IonContent>
        <div className="profile-vault-page">
          <IonList lines="none">
            {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(
              (data, i): React.ReactNode => {
                return (
                  <IonItemSliding key={i}>
                    <IonItem>
                      <div className="row">
                        <div className="col s3 image">
                          <Avatar
                            type={ShapesSize.circle}
                            width={50}
                            height={50}
                            badge={i % 3 === 0 && isFriend}
                            badgeColor={Colors.red}
                          />
                        </div>
                        <div className="col s6 info">
                          <span className="song">Jah Work</span>
                          <span className="artist">Ben Harper</span>
                        </div>
                        <div className="col s3 support">
                          <ButtonSupportIcon
                            artist={null}
                            supported={i % 2 === 0}
                          />
                        </div>
                      </div>
                    </IonItem>

                    <IonItemOptions side="end">
                      <ButtonIcon
                        icon={<AddPlaylistIcon />}
                        color={Colors.green}
                        className="no-padding"
                        type={ShapesSize.normal}
                      />
                      {!isFriend && (
                        <ButtonIcon
                          icon={<CloseIcon strokeWidth={2} />}
                          color={Colors.red}
                          className="no-padding"
                          type={ShapesSize.normal}
                        />
                      )}
                    </IonItemOptions>
                  </IonItemSliding>
                );
              }
            )}
          </IonList>
        </div>
      </IonContent>
    );
  }
}

export default ProfileVaultPage;
