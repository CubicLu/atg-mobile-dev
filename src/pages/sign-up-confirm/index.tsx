import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignUpConfirmImage,
  InputText,
  Button,
  Header
} from './../../components';
import {} from './../../actions';
import { ShapesSize, Colors } from '../../interfaces';

interface Props extends RouteComponentProps {}

class SignUpConfirmPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="sign-up-confirm-page">
        <BackgroundImage
          gradient="180deg, #d53d1d00 20%, #d53d1d 50%, #a32c16 100%"
          backgroundImage={BackgroundSignUpConfirmImage}
          backgroundBottom
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          leftContent={<h4 className="sign-in-title">CONFIRM</h4>}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />
        <div className="sign-up-confirm-page">
          <div className="space-between">
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
                    <InputText type="text" placeholder={'Confirm Password'} />
                  </div>
                </div>

                <div className="row ">
                  <div className="col s12">
                    <Button
                      label="Sign in"
                      type={ShapesSize.full}
                      color={Colors.primary}
                      gradient
                      bold
                      onClick={(): any => {
                        this.props.history.push('/home/profile');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default withRouter(SignUpConfirmPage);
