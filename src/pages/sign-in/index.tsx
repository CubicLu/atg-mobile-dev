import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
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
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg,#ffc23f00,#ffc23f"
            backgroundImage={BackgroundSignInImage}
            backgroundTop={false}
            backgroundBottom={true}
          >
            <div className="container sign-in-page">
              <div className="space-between">
                <div className="row header">
                  <div className="col s8">
                    <h1 className="title">SIGN IN</h1>
                  </div>
                  <div className="col s4 button">
                    <ButtonIcon
                      styles={{ width: 35, height: 35 }}
                      icon={
                        <CloseIcon width={15} height={15} strokeWidth={2} />
                      }
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
                        <Button
                          label="Sign In"
                          type={'full'}
                          bold
                          color="primary"
                          gradient
                          onClick={(): any => {
                            this.props.history.push('/home');
                          }}
                        />
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
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(SignInPage);
