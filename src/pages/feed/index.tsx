import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


import { IonPage } from '@ionic/react';

interface Props extends RouteComponentProps {}

class FeedPage extends React.Component<Props> {
  render(): React.ReactNode {
    return <IonPage id="feed-page">feed</IonPage>;
  }
}

export default withRouter(FeedPage);
