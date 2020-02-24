import React from 'react';
import {} from './../../components';
import {} from './../../actions';

interface Props {
  image?: any;
  shadow?: boolean;
  legend?: string;
  gradient?: string;
  unique?: boolean;
  top?: boolean;
  bottom?: boolean;
  imageTop?: any;
  imageBottom?: any;
  bottomStyle?: object;
  topStyle?: object;
  topIsSvg?: boolean;
  bottomIsSvg?: boolean;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
    shadow: false,
    gradient: null,
    unique: true,
    top: false,
    bottom: false,
    topIsSvg: false,
    bottomIsSvg: false
  };

  render(): React.ReactNode {
    let shadow = this.props.shadow ? 'shadow' : '';
    let gradient =
      this.props.gradient != null
        ? `linear-gradient(${this.props.gradient})`
        : '';
    let unique = this.props.unique ? `url(${this.props.image})` : '';
    let comma = this.props.unique && this.props.gradient ? ',' : '';
    let bottomSvgStyle = this.props.bottomIsSvg ? 'is-svg' : '';
    return (
      <div
        className={`background-image ${shadow} `}
        style={{ backgroundImage: `${unique} ${comma} ${gradient}` }}
      >
        <div className="legend">{this.props.legend}</div>
        {this.props.children}

        <div className="background-image with-flex">
          {this.props.top && (
            <div
              className="top"
              style={{
                ...this.props.topStyle,
                backgroundImage: `url(${this.props.imageTop}) `
              }}
            >
              {this.props.topIsSvg && this.props.imageTop}
            </div>
          )}
          {this.props.bottom && (
            <div
              className={`bottom ${bottomSvgStyle}`}
              style={{
                ...this.props.bottomStyle,
                backgroundImage: `url(${this.props.imageBottom}) `
              }}
            >
              {this.props.bottomIsSvg && this.props.imageBottom}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default BackgroundImageComponent;
