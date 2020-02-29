import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Button,
  InputText,
  ButtonIcon,
  CloseIcon
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
            backgroundTop
            backgroundTopDark={true}
            backgroundBottom
            backgroundBottomDark={false}
            gradient="180deg, #1E073C, #1A0831"
          >
            <div className="container sign-up-page">
              <div className="row header">
                <div className="col s10"></div>
                <div className="col s2 button">
                  <ButtonIcon
                    icon={<CloseIcon strokeWidth={2} />}
                    onClick={(): any => this.props.history.push('/initial')}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col s12 brand-text">
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
                    By signing up you confirm that you have read and agree
                    <b> General terms</b> and <b>Privacy policy</b>.
                  </p>
                </div>
              </div>

              <div className="row ">
                <div className="col s12">
                  <Button
                    label="Sign up"
                    color="primary"
                    full
                    bold
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
