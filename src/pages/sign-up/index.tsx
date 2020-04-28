import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import { BackgroundImage, InputText, Header, Button } from './../../components';
import { Sizes, ShapesSize, SignUpInterface } from '../../interfaces';
import { ApplicationState } from '../../reducers';
import { updateAuthSignUpProperty } from './../../actions';
import { validateEmail, validateNickname } from './../../utils/validation';

interface State {
  errors: {
    nickname: string;
    email: string;
  };
}
interface StateProps {
  signUpUser: SignUpInterface;
}

interface DispatchProps {
  updateAuthSignUpProperty: (property: string, value: string) => void;
}

interface Props extends RouteComponentProps, StateProps, DispatchProps {}

class SignUpPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        nickname: '',
        email: ''
      }
    };
  }

  validateInput(input, text, inUse = false): void {
    switch (input) {
      case 'nickname':
        if (!inUse) {
          !validateNickname(text)
            ? this.setMessageError(
                input,
                'Nickname contains invalid characters.'
              )
            : this.setMessageError(input, '');
        } else {
          this.setMessageError(input, 'Nickname is already taken.');
        }
        break;
      case 'email':
        !validateEmail(text)
          ? this.setMessageError(input, 'Email format is invalid.')
          : this.setMessageError(input, '');
        break;
      default:
        return;
    }
  }

  setMessageError(property, text): void {
    this.setState({
      errors: {
        ...this.state.errors,
        [property]: text
      }
    });
  }

  onSubmit(): void {
    if (this.props.signUpUser.nickname === 'vigil') {
      this.validateInput('nickname', 'vigil', true);
    } else {
      this.props.history.push('/enter-code');
    }
  }

  render(): React.ReactNode {
    const { signUpUser } = this.props;
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
              <div className="fluid">
                <InputText
                  type="text"
                  error={this.state.errors.nickname !== ''}
                  placeholder={'Nickname'}
                  onChangeText={(text): void => {
                    this.props.updateAuthSignUpProperty('nickname', text);
                    this.validateInput('nickname', text);
                  }}
                  defaultValue={signUpUser.nickname}
                />
              </div>
              <div className="fluid">
                <span className="text-12 f0 text-white">
                  {this.state.errors.nickname}
                </span>
              </div>
              <br />
              <div className="fluid">
                <InputText
                  error={this.state.errors.email !== ''}
                  type="text"
                  placeholder={'E-mail'}
                  defaultValue={signUpUser.email}
                  onChangeText={(text): void => {
                    this.props.updateAuthSignUpProperty('email', text);
                    this.validateInput('email', text);
                  }}
                />
              </div>
              <div className="fluid">
                <span className="text-12 f0 text-white">
                  {this.state.errors.email}
                </span>
              </div>
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
              <Button
                size={Sizes.lg}
                label="Create an account"
                type={ShapesSize.full}
                gradient={true}
                onClick={(): void => this.onSubmit()}
              />
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ authAPI }: ApplicationState): StateProps => {
  const { signUpUser } = authAPI;
  return { signUpUser };
};
export default withRouter(
  connect(mapStateToProps, {
    updateAuthSignUpProperty
  })(SignUpPage)
);
