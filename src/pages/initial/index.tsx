import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { BackgroundImage, BackgroundInitialImage } from './../../components';
import {} from './../../actions';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';
import { ApplicationState } from '../../reducers';

interface Props extends RouteComponentProps, DispatchProps {}

interface StateProps {}

interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

class InitialPage extends React.Component<Props> {
  handleLogin(): void {
    console.log('new logged');
    this.props.updateAuthProperty('loggedUser', {
      name: 'Débora',
      email: 'debora.goncalves@vigil365.com'
    });
    this.props.history.push('/home');
  }

  render(): React.ReactNode {
    return (
      <IonPage id="initial-page">
        <IonContent>
          <BackgroundImage
            backgroundImage={BackgroundInitialImage}
            shadow
            legend="Celeste Waite"
          />
          <div className="container initial-page">
            <div className="space-between">
              <div className="row">
                <div className="col s12">
                  <h1 className="title secondary brand">panthr</h1>
                  <h2 className="subtitle">ARTIST-TO-FAN</h2>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="col s12">
                      <h1 className="title album">
                        THE
                        <br />
                        ULTIMATE
                      </h1>
                      <h2 className="subtitle album">
                        DESTINATION FOR ARTIST & FANS
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <IonButton
                        className="primary gradient"
                        routerDirection="root"
                        size="default"
                        onClick={this.handleLogin.bind(this)}
                        expand="full"
                      >
                        Sign In
                      </IonButton>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <IonButton
                        color="white"
                        fill="clear"
                        size="large"
                        expand="full"
                        routerDirection="forward"
                        routerLink="/sign-up"
                      >
                        Create an account
                      </IonButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, { updateAuthProperty })(InitialPage)
);
