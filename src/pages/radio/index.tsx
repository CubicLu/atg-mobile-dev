import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from './../../reducers';

interface Props extends RouteComponentProps {}

class RadioPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="radio-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          radio
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(RadioPage));
