import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonPage, IonRouterLink } from '@ionic/react';
import { BackgroundImage, InputText, Header, Button } from './../../components';
import { Sizes, ShapesSize } from '../../interfaces';

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
          gradient="180deg, #231441, #080709"
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />
        <div className="initial-page-fullscreen double-top mb-4">
          <div className="space-between h-100">
            <div className="row flex-compass h-100 center">
              <span className="brand-title">panthr</span>
              <span className="h3 long-center">
                THE ULTIMATE DESTINATION FOR ARTIST & FANS
              </span>
            </div>

            <div className="flex-compass fluid h-100 medium">
              <div className="col s12 mt-5">
                <InputText type="text" placeholder={'First Name'} />
              </div>
              <div className="row" />
              <br />
              <div className="col s12">
                <InputText type="text" placeholder={'Last Name'} />
              </div>
              <div className="row" />
              <br />
              <div className="col s12">
                <InputText type="text" placeholder={'E-mail'} />
              </div>
              <div className="row" />
              <br />
              <br />
            </div>

            <div className="footer flex-compass h-100 north center">
              <div className="left-align">
                <p>
                  By signing up you confirm that you have read and agree
                  <b> General terms</b> and <b>Privacy policy</b>.
                </p>
              </div>

              <div className="row mt-5" />
              <IonRouterLink routerLink="/enter-code">
                <Button
                  size={Sizes.lg}
                  label="Create an account"
                  type={ShapesSize.full}
                  gradient={true}
                />
              </IonRouterLink>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default SignUpPage;
