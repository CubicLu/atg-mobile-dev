import React, { CSSProperties } from 'react';
import {
  BackgroundCircleBubblesImage as DarkBottom,
  BackgroundCircleBubblesInverted as DarkTop,
  BackgroundCircleBubblesLightImage as LightBottom,
  BackgroundCircleBubblesLightInverted as LightTop,
  BackgroundCircleBubblesOrangeImage as OrangeBottom
} from './../../components';

interface Props {
  backgroundImage?: any;
  backgroundStyle?: object;
  legend?: string;
  shadow?: boolean;
  gradient?: string;
  styles?: CSSProperties;
  svgTop?: any;
  svgBottom?: any;
  backgroundTop: boolean;
  backgroundTopDark: boolean;
  backgroundTopOpacity: number;
  backgroundTopHeight: number;
  backgroundBottom: boolean;
  backgroundBottomDark: boolean;
  backgroundBottomOpacity: number;
  backgroundBottomHeight: number;
  backgroundBottomOrange: boolean;
  topRotate: boolean;
  bottomRotate: boolean;
  blur: boolean;
  className: string;
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
    backgroundTopOpacity: 0.12,
    backgroundBottomOpacity: 0.12,
    backgroundTopHeight: 300,
    backgroundBottomHeight: 300,
    blur: false,
    className: ''
  };

  render(): React.ReactNode {
    const {
      backgroundTop: hasTop,
      backgroundBottom: hasBottom,
      backgroundBottomDark: bDark,
      backgroundBottomOrange: bOrange,
      backgroundBottomOpacity: bOpacity,
      backgroundBottomHeight: bHeight,
      backgroundTopDark: tDark,
      backgroundTopOpacity: tOpacity,
      backgroundTopHeight: tHeight,
      backgroundImage: imageUrl,
      gradient,
      blur,
      shadow,
      className,
      styles,
      legend,
      children,
      topRotate,
      bottomRotate
    } = this.props;

    const topClass = 'background-top' + (topRotate ? ' rotate' : '');
    const topStyle = {
      backgroundImage: `url(${tDark ? DarkTop : LightTop})`,
      opacity: tOpacity,
      height: tHeight
    };

    const bottomClass = 'background-bottom' + (bottomRotate ? ' rotate' : '');
    let bottomUrl = bDark ? DarkBottom : LightBottom;
    if (bOrange) {
      bottomUrl = OrangeBottom;
    }
    const bottomStyle = {
      backgroundImage: `url(${bottomUrl})`,
      opacity: bOpacity,
      height: bHeight
    };

    let imageArray: string[] = [];
    let classArray: string[] = ['background-image'];

    imageUrl && imageArray.push(`url(${imageUrl})`);
    gradient && imageArray.push(`linear-gradient(${gradient})`);
    shadow && classArray.push('shadow');
    blur && classArray.push('blur');
    className && classArray.push(className);

    const backgroundClass = classArray.filter(Boolean).join(' ');
    const backgroundStyle = {
      backgroundImage: imageArray.filter(Boolean).join(', '),
      ...styles
    };

    return (
      <React.Fragment>
        <div className={backgroundClass} style={backgroundStyle} />
        {legend && <div className="background-legend">{legend}</div>}
        {hasTop && <div className={topClass} style={topStyle} />}
        {hasBottom && <div className={bottomClass} style={bottomStyle} />}
        {children}
      </React.Fragment>
    );
  }
}
export default BackgroundImageComponent;
