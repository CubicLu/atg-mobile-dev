import React from 'react';
import { connect } from "react-redux";
import { } from './../';
import { } from './../../actions';

interface Props{
  actions?: any; //typeof AnyActions
  onClick: Function;
  label: string;
  color?: "primary" | "secondary" | "tertiary" | "transparent";
  gradient?: Boolean,
  full?: Boolean,
  bold?: Boolean
};


class ButtonComponent extends React.Component<Props>{
    public static defaultProps = { 
        onClick: () => {},
        gradient: false,
        full: false,
        bold: false
    }

    constructor(props: Props){ 
        super(props)
    }

    render(){
        let gradient = this.props.gradient ? "gradient" : ""
        let full = this.props.full ? "full" : ""
        let bold = this.props.bold ? "bold" : ""
        return (
            <button onClick={this.props.onClick.bind(this)} className={`btn ${this.props.color} ${gradient} ${full} ${bold}`}>
                {this.props.label}
            </button>
        );
    }

}


const mapStateToProps = ({  }) => {
  return {  };
}
export default connect(mapStateToProps, {

})(ButtonComponent);
