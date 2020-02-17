import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from './../../reducers';

interface Props extends RouteComponentProps {}

class BlankPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="blank-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          blank
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(BlankPage));
