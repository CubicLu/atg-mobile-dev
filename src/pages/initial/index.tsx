import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {
  Button,
  BackgroundImage,
  BackgroundInitialImage
} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class InitialPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="initial-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            image={BackgroundInitialImage}
            shadow
            legend="Celeste Waite"
          >
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
                        <Button
                          label="Sign In"
                          color="primary"
                          gradient
                          full
                          bold
                          onClick={(): any =>
                            this.props.history.push('/sign-in')
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <Button
                          label="Create an account"
                          color="transparent"
                          full
                          onClick={(): any =>
                            this.props.history.push('/sign-up')
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(InitialPage);
