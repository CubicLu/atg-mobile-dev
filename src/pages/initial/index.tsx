import React from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { BackgroundImage, BackgroundInitialImage } from './../../components';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';
import { ApplicationState } from '../../reducers';

interface Props extends DispatchProps {}
interface StateProps {}
interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

class InitialPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="initial-page">
        <BackgroundImage
          backgroundImage={BackgroundInitialImage}
          shadow
          legend="Celeste Waite"
        />
        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="row h-25">
              <h1 className="title secondary brand-title">panthr</h1>
              <h2 className="brand subtitle">ARTIST-TO-FAN</h2>
            </div>

            <div className="flex-compass h-50 south west">
              <h1 className="title-album">
                THE
                <br />
                ULTIMATE
              </h1>
              <h2 className="subtitle-album">DESTINATION FOR ARTIST & FANS</h2>
            </div>

            <div className="footer row fluid">
              <div className="row">
                <IonButton
                  className="primary gradient"
                  size="large"
                  routerLink="/sign-in"
                  expand="full"
                >
                  Sign In
                </IonButton>
              </div>
              <div className="row">
                <IonButton
                  color="white"
                  fill="clear"
                  expand="full"
                  routerLink="/sign-up"
                >
                  Create an account
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, { updateAuthProperty })(InitialPage);
