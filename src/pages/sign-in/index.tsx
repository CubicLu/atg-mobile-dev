import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  BackgroundCircleBrownImage,
  BackgroundImage,
  BackgroundSignInImage,
  InputText,
  Button,
  ButtonIcon
} from './../../components';
import {} from './../../actions';
import { ApplitcationState } from './../../reducers';

interface Props extends RouteComponentProps {}

class SignInPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <BackgroundImage
        gradient="180deg, #FFC23F 0%, #FFC23F 100%"
        bottom={true}
        top={true}
        unique={false}
        imageBottom={BackgroundCircleBrownImage}
        imageTop={BackgroundSignInImage}
        topStyle={{ 
          transform: 'rotate(0deg)',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'center',
          backgroundPositionY: 'top',
          backgroundAttachment: 'fixed',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover',
          backgroundSize: 'cover',
          height: '100%'
        }}
      >
        <div className="container sign-in-page">
        
          
          <div className="space-between">
            <div className="row header">
              <div className="col s8">
                <h1 className="title">SIGN IN</h1>
                
              </div>
              <div className="col s4 button">
                <ButtonIcon icon="close"   onClick={() => this.props.history.goBack()} />
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
                    <a className="link">Forgot your password?</a>
                  </div>
                </div>

                <div className="row ">
                  <div className="col s12">
                    <Button 
                      label="Sign in" 
                      full 
                      color="primary"
                      gradient
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row header">
              <div className="col s12">
                <a className="btn transparent rounded-tooltip" onClick={() => this.props.history.push("/sign-up")}>
                  <div>r</div>
                  <div>Register</div>
                </a>
               
              </div>
            </div>
            
            
          </div>

          
        </div>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = ({}: ApplitcationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(SignInPage));