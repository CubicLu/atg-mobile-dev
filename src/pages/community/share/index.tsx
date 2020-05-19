import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

interface Props {}

export default class CommunitySharePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent>Share Page</IonContent>
      </IonPage>
    );
  }
}
