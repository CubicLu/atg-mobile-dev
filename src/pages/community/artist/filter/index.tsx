import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from '../../../../reducers';

interface Props extends RouteComponentProps {}

class CommunityArtistFilterPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent>Community Artist Filter</IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, {})(CommunityArtistFilterPage)
);
