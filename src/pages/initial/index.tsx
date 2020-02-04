import React from 'react';
import { connect } from "react-redux";
import { Button, BackgroundImage, BackgroundInitialImage } from './../../components';
import { } from './../../actions';


interface Props {
    actions: any; //typeof AnyActions 
}


class HomePage extends React.Component<Props>{

    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <BackgroundImage image={BackgroundInitialImage} shadow legend="Celeste Waite">
                <div className="container initial-page">
                    <div className="space-between">
                        <div className="row">
                            <div className="col s12">
                                <h1 className="title secondary">panthr</h1>
                                <h2 className="subtitle">ARTIST - </h2>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col s12">

                                <div className="row">
                                    <div className="col s12">

                                        <h1 className="title album">THE ULTIMATE</h1>
                                        <h2 className="subtitle album">DESTINATION FOR ARTIST & FANS</h2>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col s12">
                                        <Button label="Sign In" color="primary" gradient full bold />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <Button label="Create an account" color="transparent" full onClick={() => {

                                        }} />
                                    </div>
                                </div>
                            </div>
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
export default connect(mapStateToProps, {

})(HomePage);
