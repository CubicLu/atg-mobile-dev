import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  _,
  Avatar,
  ButtonIcon,
  SupportIcon,
  AddPlaylistIcon,
  CloseIcon
} from './../../../components';
import {} from './../../../actions';
import { IonList, IonItemSliding, IonItemOptions, IonItem, IonContent } from '@ionic/react';

interface Props extends RouteComponentProps {}

class ProfileVaultPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent>
        <div className="profile-vault-page">
          <IonList lines="none">
          {_.map(
            [{}, {}, {}, {}, {}, {}, {}, {}],
            (data, i): React.ReactNode => {
              return (
                <IonItemSliding key={i}>
                  <IonItem>
                    <div className="row">
                      <div className="col s3 image">
                        <Avatar type="circle" width={50} height={50} />
                      </div>
                      <div className="col s6 info">
                        <span className="song">Jah Work</span>
                        <span className="artist">Ben Harper</span>
                      </div>
                      <div className="col s3 support">
                        <ButtonIcon icon={<SupportIcon />} color="support" />
                      </div>
                    </div>
                  </IonItem>
                  <IonItemOptions side="end">
                    <ButtonIcon
                      icon={<AddPlaylistIcon />}
                      color="green"
                      type="normal"
                    />
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
        </div>
      </IonContent>
    );
  }
}

export default withRouter(ProfileVaultPage);
