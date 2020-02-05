import React from 'react';
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { BackgroundImage, BackgroundCirclesImage, Button, InputText } from './../../components';
import { } from './../../actions';

interface Props extends RouteComponentProps {

}


class RegisterPage extends React.Component<Props>{

    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <BackgroundImage gradient="180deg, #230640 0%, #230640 100%" image={BackgroundCirclesImage} >
                <div className="container register-page">
                    <div className="row ">
                        <div className="col s12 right-align mt-20">
                            <Button color="transparent" onClick={() => this.props.history.push("/")} label="Skip" />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col s12">
                            <h1 className="title secondary center-align">panthr</h1>
                            <h1 className="subtitle">THE ULTIMATE</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12  mt-40">
                            <InputText type="text" placeholder={"First Name"} />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col s12">
                            <InputText type="text" placeholder={"Last Name"} />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col s12">
                            <InputText type="text" placeholder={"E-mail"} />
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col s12">
                            <p>By signing up you confirm that you have read and agree to tr1be’s General terms and Privacy policy.</p>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col s12">
                            <Button  
                                label="Sign up" 
                                color="primary" full gradient
                                onClick={() => this.props.history.push("/register")} 
                            />
                        </div>
                    </div>
                </div>
            </BackgroundImage>
        );
    }

}


const mapStateToProps = ({ }) => {
    return {};
}
export default withRouter(connect(mapStateToProps, {

})(RegisterPage));
