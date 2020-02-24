import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Button,
  InputText,
  CirclesIcon
} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class SignUpPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="sign-up-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #230640 0%, #110023 100%"
            top
            bottom
            imageTop={<CirclesIcon color="#040508" height={250}  />}
            imageBottom={<CirclesIcon color="#232126" height={250} />}
            unique={false}
            bottomIsSvg
            topIsSvg
          >
            <div className="container sign-up-page">
              <div className="row ">
                <div className="col s12 right-align mt-20">
                  <Button
                    color="transparent"
                    onClick={(): any => this.props.history.push('/')}
                    label="Skip"
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col s12">
                  <h1 className="title secondary center-align brand">panthr</h1>
                  <h1 className="subtitle">
                    THE ULTIMATE DESTINATION FOR ARTIST & FANS
                  </h1>
                </div>
              </div>

              <div className="row">
                <div className="col s12  mt-40">
                  <InputText type="text" placeholder={'First Name'} />
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <InputText type="text" placeholder={'Last Name'} />
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <InputText type="text" placeholder={'E-mail'} />
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <p>
                    By signing up you confirm that you have read and agree to
                    tr1be’s General terms and Privacy policy.
                  </p>
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <Button
                    label="Sign up"
                    color="primary"
                    full
                    gradient
                    onClick={(): any => this.props.history.push('/enter-code')}
                  />
                </div>
              </div>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(SignUpPage);
