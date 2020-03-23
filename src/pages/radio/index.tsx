import React from 'react';
import { IonPage } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

class RadioPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="radio-page">
        <div></div>
      </IonPage>
    );
  }
}

export default withRouter(RadioPage);
