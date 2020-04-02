import React from 'react';
import { IonPage } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignUpConfirmImage,
  Header
} from '../components';

interface Props {}

class NotFoundPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="not-found-page">
        <BackgroundImage
          gradient="180deg, #C62704 20%, #C62704 50%, #a32c16 100%"
          backgroundImage={BackgroundSignUpConfirmImage}
          backgroundBottom
        />
        <Header leftBackButton={true} title="PAGE NOT FOUND" />

        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="row ">&nbsp;</div>
            <div className="flex-compass fluid h-100 south">
              <div className="h00 text-54 text-center">
                THE REQUESTED
                <br />
                PAGE IS INVALID
              </div>
              <div className="f4 text-center"></div>
              <br />
            </div>

            <div>
              <div className="row fluid"></div>
              <br />
              <div className="row fluid"></div>
              <br />
            </div>

            <div className="footer mt-5 margin-footer"></div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default NotFoundPage;
