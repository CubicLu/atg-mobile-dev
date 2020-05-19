import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

interface Props {}

export default class CommunityArtistFilterPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent>Community Artist Filter</IonContent>
      </IonPage>
    );
  }
}
