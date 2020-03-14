import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class RadioPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="radio-page">
        <IonContent>radio</IonContent>
      </IonPage>
    );
  }
}

export default withRouter(RadioPage);
