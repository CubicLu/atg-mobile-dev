import React from 'react';
import { } from './../../components';
import { } from './../../actions';

interface Props {
  shadow?: boolean;
  legend?: string;
  gradient?: string;
  top?: boolean;
  bottom?: boolean;
  backgroundImage?: any;
  imageBottom?: any;
  bottomStyle?: object;
  topStyle?: object;
  styles?: object;
  topIsSvg?: boolean;
  bottomIsSvg?: boolean;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
    shadow: false,
    gradient: null,
    top: false,
    bottom: false,
    topIsSvg: false,
    bottomIsSvg: false
  };

  render(): React.ReactNode {
    let shadow = this.props.shadow ? 'shadow' : '';
    let gradient = !!this.props.gradient ? `linear-gradient(${this.props.gradient})` : '';
    let bottomSvgStyle = this.props.bottomIsSvg ? 'is-svg' : '';

    return (
      <div className={`background-image ${shadow}`}
        style={{
          ...this.props.styles,
          background: `${gradient ? gradient + "," : ""}url(${this.props.backgroundImage})`
        }}
      >

        {this.props.top && (
          <div className="top" style={this.props.topIsSvg ? {} : {
            ...this.props.topStyle,
            backgroundImage: `url(${this.props.backgroundImage})`
          }}
          >
            {this.props.topIsSvg && this.props.backgroundImage}
          </div>
        )}

        <div className="legend">{this.props.legend}</div>
        {this.props.children}

        {this.props.bottom && (
          <div className={`bottom ${bottomSvgStyle}`}
            style={{
              ...this.props.bottomStyle,
              backgroundImage: this.props.bottomIsSvg ? "" : `url(${this.props.imageBottom})`
            }}
          >
            {this.props.bottomIsSvg && this.props.imageBottom}
          </div>
        )}
      </div>
    );
  }
}
export default BackgroundImageComponent;
