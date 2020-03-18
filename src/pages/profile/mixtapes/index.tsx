import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SliderMixtapes } from './../../../components';
import {} from './../../../actions';
import { IonContent } from '@ionic/react';

interface Props extends RouteComponentProps {}

class ProfileMixtapesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonContent className="profile-mixtapes-page">
        <SliderMixtapes />
      </IonContent>
    );
  }
}

export default withRouter(ProfileMixtapesPage);
