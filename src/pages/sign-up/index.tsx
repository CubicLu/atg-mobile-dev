import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonPage, IonButton } from '@ionic/react';
import {
  BackgroundImage,
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
        <BackgroundImage
          backgroundTop={true}
          backgroundTopDark={true}
          backgroundTopOpacity={0.3}
          backgroundBottom={true}
          backgroundBottomDark={false}
          bottomRotate={true}
          gradient="180deg, #231441, #080709"
        />
        <div className="sign-up-page">
          <div className="row header">
            <div className="col s10"></div>
            <div className="col s2 button">
              <ButtonIcon
                icon={<CloseIcon strokeWidth={2} />}
                onClick={(): any => this.props.history.push('/initial')}
              />
            </div>
          </div>

          <div className="col s12 brand-text mt-40">
            <h1 className="title secondary center-align brand">panthr</h1>
            <h1 className="subtitle">
              THE ULTIMATE DESTINATION FOR ARTIST & FANS
            </h1>
          </div>

          <div className="row mt-40" />
          <div className="col s12 mt-40">
            <InputText type="text" placeholder={'First Name'} />
          </div>
          <div className="row" />
          <div className="col s12">
            <InputText type="text" placeholder={'Last Name'} />
          </div>
          <div className="row" />
          <div className="col s12">
            <InputText type="text" placeholder={'E-mail'} />
          </div>
          <div className="row" />

          <div className="col s12 mt-40">
            <p>
              By signing up you confirm that you have read and agree
              <b> General terms</b> and <b>Privacy policy</b>.
            </p>
          </div>

          <div className="row mt-40" />

          <IonButton
            className="primary gradient"
            size="large"
            routerDirection="forward"
            routerLink="/enter-code"
            expand="full"
          >
            Sign Up
          </IonButton>
        </div>
      </IonPage>
    );
  }
}

export default withRouter(SignUpPage);
