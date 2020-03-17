import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonPage, IonButton } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignInImage,
  InputText,
  ButtonIcon,
  CloseIcon
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
      email: 'debora.goncalves@vigil365.com'
    });
    this.props.history.push('/home');
  }

  render(): React.ReactNode {
    return (
      <IonPage id="sign-in-page">
        <BackgroundImage
          gradient="180deg,#ffc23f00,#ffc23f"
          backgroundImage={BackgroundSignInImage}
          backgroundTop={false}
          backgroundBottom={true}
        />

        <div className="sign-in-page">
          <div className="row header">
            <div className="col s10">
              <h1 className="title">SIGN IN</h1>
            </div>
            <div className="col s2 button">
              <ButtonIcon
                icon={<CloseIcon strokeWidth={2} />}
                onClick={(): any => this.props.history.push('/initial')}
              />
            </div>
          </div>

          <div className="form" />
          <div className="row" />
          <div className="col s12">
            <InputText type="text" placeholder={'User Name'} />
          </div>

          <div className="row" />
          <div className="col s12">
            <InputText type="text" placeholder={'Password'} />
            <button className="btn transparent link">
              Forgot your password?
            </button>
          </div>

          <div className="row" />
          <div className="col s12 mt-40">
            <IonButton
              className="primary gradient"
              routerDirection="root"
              size="default"
              onClick={this.handleLogin.bind(this)}
              expand="full"
            >
              Sign In
            </IonButton>
          </div>
          <div className="bottom">
            <button
              className="btn transparent rounded-tooltip"
              onClick={(): any => this.props.history.push('/sign-up')}
            >
              <div>r</div>
              <div className="register">Register</div>
            </button>
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

export default withRouter(
  connect(mapStateToProps, { updateAuthProperty })(SignInPage)
);
