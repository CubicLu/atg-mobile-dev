import React from 'react';
import { } from './../../components';
import { } from './../../actions';

interface Props{
  image:  any;
  shadow?: Boolean;
  legend?: string;
  gradient?: string;
}


class BackgroundImageComponent extends React.Component<Props>{

    public static defaultProps = { 
        shadow: false,
        gradient: null
    }

    constructor(props: Props){ 
        super(props)
    }

    render(){
        let shadow = this.props.shadow ? "shadow" : "";
        let gradient = this.props.gradient != null ? `,linear-gradient(${this.props.gradient})` : "";
        return (
            <div className={`background-image ${shadow}`} style={{ backgroundImage: `url(${this.props.image}) ${gradient}`}}>
                <div className="legend">{this.props.legend}</div>
                {this.props.children}
            </div>
        );
    }

}

export default BackgroundImageComponent;
