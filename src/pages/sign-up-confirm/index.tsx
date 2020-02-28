import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignUpConfirmImage,
  InputText,
  Button,
  ButtonIcon,
  CloseIcon,
  CirclesIcon
} from './../../components';
import {} from './../../actions';

interface Props extends RouteComponentProps {}

class SignUpConfirmPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="sign-up-confirm-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #d53d1d00, #a32c16"
            bottom={true}
            top={true}
            bottomIsSvg
            imageBottom={<CirclesIcon color={'#9b2712'} />}
            backgroundImage={BackgroundSignUpConfirmImage}
            topStyle={{
              transform: `rotate(0deg)`,
              backgroundRepeat: `no-repeat`,
              backgroundPositionX: `center`,
              backgroundPositionY: `top`,
              backgroundAttachment: `fixed`,
              WebkitBackgroundSize: `cover`,
              MozBackgroundSize: `cover`,
              OBackgroundSize: `cover`,
              backgroundSize: `cover`,
              height: `100%`
            }}
          >
            <div className="container sign-up-confirm-page">
              <div className="space-between">
                <div className="row header">
                  <div className="col s8">
                    <h1 className="title">CONFIRM</h1>
                  </div>
                  <div className="col s4 button">
                    <ButtonIcon
                      styles={{ width: 35, height: 35 }}
                      icon={<CloseIcon width={12} height={12} />}
                      onClick={(): any => this.props.history.goBack()}
                    />
                  </div>
                </div>
                <div className="row form">
                  <div className="col s12  mt-40">
                    <div className="row ">
                      <div className="col s12">
                        <h2 className="title text-center">
                          THANKS FOR THE <br />
                          PANTHR LOVE.
                        </h2>
                        <p className="subtitle text-center">
                          Please confirm your password
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col s12">
                        <InputText type="text" placeholder={'Password'} />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col s12">
                        <InputText
                          type="text"
                          placeholder={'Confirm Password'}
                        />
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col s12">
                        <Button
                          label="Sign in"
                          full
                          color="primary"
                          gradient
                          bold
                          onClick={(): any => {
                            this.props.history.push('/home/feed');
                          }}
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

export default withRouter(SignUpConfirmPage);
