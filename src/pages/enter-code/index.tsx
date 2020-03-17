import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundImage,
  InputCode,
  ButtonIcon,
  CloseIcon
} from './../../components';
import {} from './../../actions';
import { IonPage } from '@ionic/react';

interface State {
  isValid: boolean;
}
interface Props extends RouteComponentProps {}

class EnterCodePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isValid: true
    };
  }

  validToken(event: any): void {
    const token: string = event.target.value;
    if (this.state.isValid === false) this.setState({ isValid: true });
    if (token.length === 6) {
      if (token === '123456') {
        this.props.history.push('/sign-up-confirm');
      } else {
        this.setState({ isValid: false });
      }
    }
  }

  render(): React.ReactNode {
    return (
      <IonPage id="enter-code-page">
        <BackgroundImage
          gradient="180deg, #000000, #100914"
          backgroundTop
          backgroundTopDark={false}
          backgroundTopOpacity={0.13}
          backgroundBottom={true}
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.13}
          bottomRotate={true}
        />
        <div className="enter-code-page">
          <div className="row header">
            <div className="col s10"></div>
            <div className="col s2 button">
              <ButtonIcon
                icon={<CloseIcon strokeWidth={2} />}
                onClick={(): any => this.props.history.push('/initial')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h1 className="mt-40 title center-align">
                Enter Verification Code
              </h1>

              <p>
                We sent a code to: <br />
                thesound@music.com
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col s12 mt-40 input-div">
              <p>Enter the 6-digit code</p>
              <InputCode
                onKeyUp={this.validToken.bind(this)}
                isValid={this.state.isValid}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col s12">
              <p className="didnt-receive">I didn’t receive an email message</p>
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

export default withRouter(EnterCodePage);
