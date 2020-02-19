import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="search-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          search
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(SearchPage);
