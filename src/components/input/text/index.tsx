import React from 'react';
import { connect } from "react-redux";
import { } from './../../../components';
import { } from './../../../actions';

interface Props {
    type: "text" | "password";
    placeholder: string;
}


class InputTextComponent extends React.Component<Props>{

    public static defaultProps = { 
    }

    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <input {...this.props} className="input text" />
        );
    }

}


const mapStateToProps = ({ }) => {
    return {};
}
export default connect(mapStateToProps, {

})(InputTextComponent);
