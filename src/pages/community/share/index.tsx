import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import { ApplicationState } from '../../../reducers';

interface Props extends RouteComponentProps {}

class CommunitySharePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent>Share Page</IonContent>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(CommunitySharePage));
