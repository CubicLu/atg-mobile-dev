import React, { Fragment } from 'react';
import {
  BackgroundCircleBubblesImage,
  BackgroundCircleBubblesInverted,
  BackgroundCircleBubblesLightImage,
  BackgroundCircleBubblesLightInverted,
  BackgroundCircleBubblesOrangeImage
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
  backgroundTopHeight: number,
  backgroundBottom: boolean;
  backgroundBottomDark: boolean;
  backgroundBottomOpacity: number;
  backgroundBottomHeight: number,
  backgroundBottomOrange: boolean;
  topRotate: boolean;
  bottomRotate: boolean;
  blur: boolean;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
    legend: null,
    shadow: false,
    backgroundTop: false,
    backgroundBottom: false,
    topRotate: false,
    backgroundBottomOrange: false,
    bottomRotate: false,
    backgroundTopDark: true,
    backgroundBottomDark: true,
    backgroundTopOpacity: 0.07,
    backgroundBottomOpacity: 0.07,
    backgroundTopHeight: 300,
    backgroundBottomHeight: 180,
    blur: false
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
          opacity: this.props.backgroundTopOpacity,
          height: this.props.backgroundTopHeight,
        };
    const bottomCircleStyle = this.props.svgBottom
      ? {}
      : {
          backgroundImage: `url(${
            this.props.backgroundBottomDark
              ? BackgroundCircleBubblesImage
              : this.props.backgroundBottomOrange
              ? BackgroundCircleBubblesOrangeImage
              : BackgroundCircleBubblesLightImage
          })`,
          opacity: this.props.backgroundBottomOpacity,
          height: this.props.backgroundBottomHeight,
        };

    const backgroundClass = `background-image ${
      this.props.shadow ? 'shadow' : ''
    } ${this.props.blur ? 'blur' : ''}`;

    let backgroundImageArray: string[] = [];
    if (this.props.gradient) {
      backgroundImageArray.push(`linear-gradient(${this.props.gradient})`);
    }
    backgroundImageArray.push(`url(${this.props.backgroundImage})`);
    const backgroundImage = backgroundImageArray.filter(Boolean).join(', ');

    return (
      <Fragment>
        {backgroundImage && (
          <div
            id="backgroundImage"
            className={backgroundClass}
            style={{ backgroundImage }}
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
