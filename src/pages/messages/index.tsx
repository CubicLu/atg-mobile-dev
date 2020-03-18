import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';
import { IonContent, IonPage } from '@ionic/react';

interface Props extends RouteComponentProps {}

class MessagesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="messages-page">
        <IonContent>messages</IonContent>
      </IonPage>
    );
  }
}

export default withRouter(MessagesPage);
