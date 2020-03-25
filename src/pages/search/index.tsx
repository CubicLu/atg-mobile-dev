import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="search-page">
        <IonContent>search</IonContent>
      </IonPage>
    );
  }
}

export default withRouter(SearchPage);
