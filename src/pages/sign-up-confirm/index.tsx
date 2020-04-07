import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonPage, IonRouterLink } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignUpConfirmImage,
  InputText,
  Button,
  Header
} from './../../components';
import { ShapesSize, Sizes } from '../../interfaces';

interface Props extends RouteComponentProps {}

class SignUpConfirmPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="sign-up-confirm-page">
        <BackgroundImage
          gradient="180deg, #C62704 20%, #C62704 50%, #a32c16 100%"
          backgroundImage={BackgroundSignUpConfirmImage}
          backgroundBottom
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          leftContent={<div className="h1 l08 no-wrap">CONFIRM</div>}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />

        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="row ">&nbsp;</div>
            <div className="flex-compass fluid h-100 south">
              <div className="h00 text-54 text-center">
                THANKS FOR THE
                <br />
                PANTHR LOVE.
              </div>
              <div className="f4 text-center">Please confirm your password</div>
              <br />
            </div>

            <div>
              <div className="row fluid">
                <InputText type="text" placeholder={'Password'} />
              </div>
              <br />
              <div className="row fluid">
                <InputText type="text" placeholder={'Confirm Password'} />
              </div>
              <br />
            </div>

            <div className="footer mt-5 margin-footer">
              <IonRouterLink routerLink="/sign-in" routerDirection="back">
                <Button
                  size={Sizes.lg}
                  gradient={true}
                  label="Sign In"
                  type={ShapesSize.full}
                />
              </IonRouterLink>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default SignUpConfirmPage;
