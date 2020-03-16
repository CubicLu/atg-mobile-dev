import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonPage, IonButton } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignInImage,
  InputText,
  Button,
  ButtonIcon,
  CloseIcon
} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class SignInPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="sign-in-page">
        <BackgroundImage
          gradient="180deg,#ffc23f00,#ffc23f"
          backgroundImage={BackgroundSignInImage}
          backgroundTop={false}
          backgroundBottom={true}
        />
        <div className="container sign-in-page">
          <div className="space-between">
            <div className="row header">
              <div className="col s8">
                <h1 className="title">SIGN IN</h1>
              </div>
              <div className="col s4 button">
                <ButtonIcon
                  styles={{ width: 35, height: 35 }}
                  icon={<CloseIcon width={15} height={15} strokeWidth={2} />}
                  onClick={(): any => this.props.history.goBack()}
                />
              </div>
            </div>
            <div className="row form">
              <div className="col s12  mt-40">
                <div className="row ">
                  <div className="col s12">
                    <InputText type="text" placeholder={'User Name'} />
                  </div>
                </div>
                <div className="row ">
                  <div className="col s12">
                    <InputText type="text" placeholder={'Password'} />
                    <button className="btn transparent link">
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <div className="row ">
                  <div className="col s12">
                    <IonButton
                      className="primary gradient"
                      routerDirection="root"
                      size="default"
                      routerLink="/home/profile"
                      expand="full"
                    >
                      Sign In
                    </IonButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="row header">
              <div className="col s12 justify-center">
                <button
                  className="btn transparent rounded-tooltip"
                  onClick={(): any => this.props.history.push('/sign-up')}
                >
                  <div>r</div>
                  <div>Register</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default withRouter(SignInPage);
