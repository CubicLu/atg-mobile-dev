import React, { Fragment } from 'react';
import {
  BackgroundCircleBubblesImage,
  BackgroundCircleBubblesInverted,
  BackgroundCircleBubblesLightImage,
  BackgroundCircleBubblesLightInverted
} from './../../components';
import {} from './../../actions';

interface Props {
  backgroundImage?: any;
  backgroundStyle?: object;
  legend?: string;
  shadow?: boolean;
  gradient?: string;

  svgTop?: any;
  svgBottom?: any;
  backgroundTop: boolean;
  backgroundTopDark: boolean;
  backgroundTopOpacity: number;
  backgroundBottom: boolean;
  backgroundBottomDark: boolean;
  backgroundBottomOpacity: number;
  topRotate: boolean;
  bottomRotate: boolean;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
    legend: null,
    shadow: false,
    backgroundTop: false,
    backgroundBottom: false,
    topRotate: false,
    bottomRotate: false,
    backgroundTopDark: true,
    backgroundBottomDark: true,
    backgroundTopOpacity: 0.07,
    backgroundBottomOpacity: 0.07
  };

  render(): React.ReactNode {
    const topClass = 'background-top' + (this.props.topRotate ? ' rotate' : '');
    const bottomClass =
      'background-bottom' +
      (this.props.svgBottom || this.props.bottomRotate ? ' rotate' : '');
    const hasTop = this.props.backgroundTop || !!this.props.svgTop;
    const hasBottom = this.props.backgroundBottom || !!this.props.svgBottom;

    const topCircleStyle = this.props.svgTop
      ? {}
      : {
          backgroundImage: `url(${
            this.props.backgroundTopDark
              ? BackgroundCircleBubblesInverted
              : BackgroundCircleBubblesLightInverted
          })`,
          opacity: this.props.backgroundTopOpacity
        };
    const bottomCircleStyle = this.props.svgBottom
      ? {}
      : {
          backgroundImage: `url(${
            this.props.backgroundBottomDark
              ? BackgroundCircleBubblesImage
              : BackgroundCircleBubblesLightImage
          })`,
          opacity: this.props.backgroundBottomOpacity
        };

    const hasGradient =
      this.props.gradient && `linear-gradient(${this.props.gradient}) `;
    const hasImage =
      this.props.backgroundImage && `url(${this.props.backgroundImage}) `;
    const backgroundImage =
      hasGradient && hasImage
        ? `${hasGradient},${hasImage}`
        : hasGradient
        ? hasGradient
        : hasImage
        ? hasImage
        : null;

    return (
      <Fragment>
        {backgroundImage && (
          <div
            className={`background-image ${this.props.shadow ? 'shadow' : ''}`}
            style={{ backgroundImage: backgroundImage }}
          />
        )}

        {hasTop && (
          <div className={topClass} style={topCircleStyle}>
            {!!this.props.svgTop && this.props.svgTop}
          </div>
        )}

        {hasBottom && (
          <div className={bottomClass} style={bottomCircleStyle}>
            {!!this.props.svgBottom && this.props.svgBottom}
          </div>
        )}

        {this.props.legend && (
          <div className="background-legend">{this.props.legend}</div>
        )}
        {this.props.children}
      </Fragment>
    );
  }
}
export default BackgroundImageComponent;