import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import {
  BackgroundImage,
  BackgroundSignInImage,
  InputText,
  Header,
  Button
} from './../../components';
import { connect } from 'react-redux';
import { updateAuthProperty } from './../../actions';
import { ShapesSize, Sizes } from '../../types';

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
    this.props.history.push('');
  }

  render(): React.ReactNode {
    return (
      <IonPage id="sign-in-page">
        <BackgroundImage
          gradient="180deg,#ffc23f,#ffc23f"
          backgroundImage={BackgroundSignInImage}
          backgroundTop={false}
          backgroundBottom={true}
          backgroundBottomOpacity={0.2}
        />
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          leftContent={<div className="h1 l08 no-wrap-pre">SIGN IN</div>}
          rightCloseOnClick={(): any => this.props.history.push('/initial')}
        />

        <div className="initial-page-fullscreen double-top">
          <div className="space-between h-100">
            <div className="flex-compass fluid h-100" />

            <div className="flex-compass fluid h-100 south center fluid">
              <div className="row" />
              <InputText type="text" placeholder={'User Name'} />
              <br />
              <InputText type="text" placeholder={'Password'} />
              <button className="btn transparent link left-align">
                Forgot your password?
              </button>

              <div className="row" />
              <div className="col s12 mt-5">
                <Button
                  size={Sizes.lg}
                  label="Sign In"
                  type={ShapesSize.full}
                  gradient={true}
                  onClick={(): void => this.handleLogin()}
                />
              </div>
            </div>

            <div className="footer flex-compass h-100 medium center">
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

export default connect(null, { updateAuthProperty })(SignInPage);
