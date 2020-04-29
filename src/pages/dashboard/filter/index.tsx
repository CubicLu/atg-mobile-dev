import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../../../components';
interface Props {}

class DashboardFilterPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="dashboard-filter-page">
        <IonContent>
          <Header leftBackButton />
          Filter blank page
        </IonContent>
      </IonPage>
    );
  }
}

export default DashboardFilterPage;
