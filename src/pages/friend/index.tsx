import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';

interface Props extends RouteComponentProps {}

class FriendPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="friend-page">
        <IonContent>Friend page</IonContent>
      </IonPage>
    );
  }
}

export default FriendPage;
