import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonPage, IonButton } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignInImage,
  InputText,
  Header
} from './../../components';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';

interface StateProps {}
interface Props extends RouteComponentProps, DispatchProps {}
interface DispatchProps {
  updateAuthProperty: (property: string, value: any) => void;
}

class SignInPage extends React.Component<Props> {
  handleLogin(): void {
    this.props.updateAuthProperty('loggedUser', {
      name: 'Débora',
      email: 'debora.goncalves@vigil365.com',
      username: 'debora_cgs',
      avatar:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/default-avatar.jpg'
    });
    this.props.history.push('/home');
  }

  render(): React.ReactNode {
    return (
      <IonPage id="sign-in-page">
        <BackgroundImage
          gradient="180deg,#ffc23f,#ffc23f"
          backgroundImage={BackgroundSignInImage}
          backgroundTop={false}
          backgroundBottom={true}
          backgroundBottomOpacity={0.25}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          leftContent={<h4 className="sign-in-title">SIGN IN</h4>}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />

        <div className="initial-page-fullscreen">
          <div className="space-between">
            <div className="flex-compass" />

            <div className="flex-compass south center fluid">
              <div className="row" />
              <InputText type="text" placeholder={'User Name'} />
              <br />
              <InputText type="text" placeholder={'Password'} />
              <button className="btn transparent link left-align">
                Forgot your password?
              </button>

              <div className="row" />
              <div className="col s12 mt-40">
                <IonButton
                  className="primary gradient"
                  size="default"
                  onClick={this.handleLogin.bind(this)}
                  expand="full"
                >
                  Sign In
                </IonButton>
              </div>
            </div>

            <div className="footer flex-compass medium center">
              <button
                className="transparent rounded-tooltip"
                onClick={(): any => this.props.history.push('/sign-up')}
              >
                <div className="letter">r</div>
                <div className="register">Register</div>
              </button>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): StateProps => {
  return {};
};

export default connect(mapStateToProps, { updateAuthProperty })(SignInPage);
