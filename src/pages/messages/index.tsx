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
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          messages
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(MessagesPage);
