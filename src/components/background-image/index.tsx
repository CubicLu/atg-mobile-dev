import React, { CSSProperties } from 'react';
import {
  OrangeBubblesBottom,
  BlackBubblesTop,
  BlackBubblesBottom,
  WhiteBubblesTop,
  WhiteBubblesBottom
} from './../../components';

interface Props {
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
  backgroundBottomDark: boolean;
  backgroundBottomOpacity: number;
  backgroundBottomOrange: boolean;
  blur: boolean;
  className: string;
}

class BackgroundImageComponent extends React.Component<Props> {
  public static defaultProps = {
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
    const {
      backgroundTop: hasTop,
      backgroundBottom: hasBottom,
      backgroundBottomDark: bDark,
      backgroundBottomOrange: bOrange,
      backgroundBottomOpacity: bOpacity,
      backgroundTopDark: tDark,
      backgroundTopOpacity: tOpacity,
      backgroundImage: imageUrl,
      gradient,
      blur,
      shadow,
      className,
      styles,
      legend,
      children
    } = this.props;

    const topClass = 'background-top';
    const topStyle = {
      backgroundImage: `url(${tDark ? BlackBubblesTop : WhiteBubblesTop})`,
      opacity: tOpacity
    };

    const bottomClass = 'background-bottom';
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
