import React, { CSSProperties } from 'react';
import { RouterLinkDirection, ShapesSize } from '../../../types';
import { IonRouterLink } from '@ionic/react';
import { ContentLoader } from '../..';

interface Props {
  image: string | undefined;
  className?: string;
  labelClassName?: string;
  type: ShapesSize;
  col: number;
  label?: string;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
  width?: number;
}
interface State {
  isReady: boolean;
}

export default class CardImageComponent extends React.Component<Props, State> {
  private _unmounted: boolean = false;
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  componentDidMount(): void {
    setTimeout((): void => {
      this.state.isReady === false &&
        this._unmounted === false &&
        this.setState({ isReady: true });
    }, 4000);
  }

  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6,
    routerDirection: 'forward'
  };
  cardStyle(): CSSProperties {
    return {
      backgroundImage: `url(${this.props.image})`,
      height: this.props.width,
      width: this.props.width,
      minHeight: this.props.width,
      minWidth: this.props.width,
      visibility: 'visible'
    };
  }
  renderSkeleton(): React.ReactNode {
    if (this.state.isReady) return null;

    const size = this.props.width || 110;
    const half = size / 2;
    return (
      <ContentLoader
        speed={2}
        viewBox={`0 0 ${size} ${size}`}
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {this.props.type === ShapesSize.circle ? (
          <circle cx={half} cy={half} r={half} />
        ) : (
          <rect x="0" y="0" rx="8" ry="8" width={size} height={size} />
        )}
      </ContentLoader>
    );
  }

  render(): React.ReactNode {
    const {
      col,
      type,
      image,
      label,
      width,
      className,
      labelClassName
    } = this.props;
    return (
      <div className={`col s${col}`}>
        <img
          style={{ width: 1, height: 1, visibility: 'hidden' }}
          decoding={'async'}
          src={image}
          alt=""
          onLoad={(): void => this.setLoaded()}
          onError={(): void => this.setLoaded()}
        />

        <IonRouterLink
          routerLink={this.props.routerLink}
          routerDirection={this.props.routerDirection}
        >
          <div
            className={`card image ${type} ${className}`}
            style={this.cardStyle()}
          >
            {this.renderSkeleton()}
          </div>

          <div
            className={`mt-15 f5 center-align ${labelClassName}`}
            style={{ width: width }}
          >
            {label}
          </div>
        </IonRouterLink>
      </div>
    );
  }
  setLoaded(): void {
    !this.state.isReady && !this._unmounted && this.setState({ isReady: true });
  }
}
