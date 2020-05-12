import React, { CSSProperties } from 'react';
import {
  OrangeBubblesBottom,
  BlackBubblesTop,
  BlackBubblesBottom,
  WhiteBubblesTop,
  WhiteBubblesBottom
} from './../../components';

interface Props {
  default: boolean;
  backgroundImage?: any;
  backgroundStyle?: object;
  legend?: string;
  shadow?: boolean;
  gradient?: string;
  styles?: CSSProperties;
  backgroundTop: boolean;
  backgroundTopDark: boolean;
  backgroundTopOpacity: number;
  backgroundBottom: boolean;
  gradientOverlay?: boolean;
  backgroundBottomDark: boolean;
  backgroundBottomOpacity: number;
  backgroundBottomOrange: boolean;
  blur: boolean;
  className: string;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
    default: false,
    legend: null,
    shadow: false,
    backgroundTop: false,
    backgroundBottom: false,
    backgroundBottomOrange: false,
    backgroundTopDark: true,
    backgroundBottomDark: true,
    backgroundTopOpacity: 0.2,
    backgroundBottomOpacity: 0.2,
    blur: false,
    className: ''
  };

  render(): React.ReactNode {
    let {
      backgroundImage,
      backgroundBottom,
      backgroundBottomDark,
      backgroundBottomOpacity,
      backgroundBottomOrange: bOrange,
      backgroundTop,
      backgroundTopDark,
      backgroundTopOpacity,
      gradient,
      blur,
      shadow,
      className,
      styles,
      legend,
      children,
      gradientOverlay: overlay
    } = this.props;

    let hasBottom = backgroundBottom;
    let bDark = backgroundBottomDark;
    let bOpacity = backgroundBottomOpacity;
    let hasTop = backgroundTop;
    let tDark = backgroundTopDark;
    let tOpacity = backgroundTopOpacity;

    if (this.props.default) {
      gradient = '180deg, #2d0758, #0F0915';
      hasTop = true;
      hasBottom = true;
      bDark = false;
      tDark = true;
      tOpacity = 1;
      bOpacity = 0.13;
    }
    const topStyle = {
      backgroundImage: `url(${tDark ? BlackBubblesTop : WhiteBubblesTop})`,
      opacity: tOpacity
    };

    let bottomUrl = bDark ? BlackBubblesBottom : WhiteBubblesBottom;
    if (bOrange) {
      bottomUrl = OrangeBubblesBottom;
    }
    const bottomStyle = {
      backgroundImage: `url(${bottomUrl})`,
      opacity: bOpacity
    };

    let imageArray: string[] = [];
    let classArray: string[] = ['background-image'];
    gradient && overlay && imageArray.push(`linear-gradient(${gradient})`);
    backgroundImage && imageArray.push(`url(${backgroundImage})`);
    gradient && !overlay && imageArray.push(`linear-gradient(${gradient})`);
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
        {hasTop && <div className="background-top" style={topStyle} />}
        {hasBottom && <div className="background-bottom" style={bottomStyle} />}
        {children}
      </React.Fragment>
    );
  }
}
export default BackgroundImageComponent;
