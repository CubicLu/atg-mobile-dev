import React from 'react';
import { } from './../../components';
import { } from './../../actions';

interface Props{
  actions?: any; //typeof AnyActions 
  image:  any;
  shadow?: Boolean;
  legend?: string;
}


class BackgroundImageComponent extends React.Component<Props>{

    public static defaultProps = { 
        shadow: false,
    }

    constructor(props: Props){ 
        super(props)
    }

    render(){
        let shadow = this.props.shadow ? "shadow" : ""
        return (
            <div className={`background-image ${shadow}`} style={{ backgroundImage: `url(${this.props.image})`}}>
                <div className="legend">{this.props.legend}</div>
                {this.props.children}
            </div>
        );
    }

}

export default BackgroundImageComponent;
