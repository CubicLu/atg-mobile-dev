import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from './../../reducers';
import { IonContent, IonPage } from '@ionic/react';

interface Props extends RouteComponentProps {}

class FeedPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="feed-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          home
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(FeedPage));
