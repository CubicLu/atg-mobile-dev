import React, { CSSProperties } from 'react';
import ContentLoader from 'react-content-loader';
import { NavContext, NavContextState } from '@ionic/react';

interface Props {
  useSkeleton: boolean;
  onClick?: Function;
  width?: string | number;
  height?: string | number;
  skeletonWidth?: string | number;
  skeletonHeight?: string | number;
  src: string;
  alt?: string;
  routerLink?: string;
  className?: string;
  divClassName?: string;
  imgClassName?: string;
  timeout?: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  customSkeleton?: React.ReactNode;
  decoding: 'sync' | 'async' | 'auto';
  objectFit: 'cover' | 'contain' | 'none' | 'scale-down';
}
interface State {
  isReady: boolean;
  hasError: boolean;
}
export default class ImageSkeletonComponent extends React.PureComponent<
  Props,
  State
> {
  static contextType = NavContext;
  private _unmounted: boolean = false;
  constructor(props) {
    super(props);
    this.state = { hasError: false, isReady: false };
  }
  public static defaultProps = {
    useSkeleton: true,
    decoding: 'async',
    timeout: 5000,
    objectFit: 'cover'
  };
  private get fallbackImg(): string {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
  }
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  componentDidMount(): void {
    setTimeout((): void => {
      this.state.isReady === false &&
        this._unmounted === false &&
        this.setState({ isReady: true });
    }, this.props.timeout);
  }
  private onLoad = (): void => {
    !this._unmounted && this.setState({ isReady: true });
  };
  private onError = (): void => {
    !this._unmounted && this.setState({ isReady: true, hasError: true });
  };

  handleClick = (): void => {
    this.props.onClick && this.props.onClick();

    if (this.props.routerLink) {
      (this.context as NavContextState).navigate(
        this.props.routerLink,
        'forward'
      );
    }
  };

  render(): React.ReactNode {
    const src = this.state?.hasError ? this.fallbackImg : this.props.src;
    const className = this.props.className || '';
    const divClassName = this.props.divClassName || '';
    const imgClassName = this.props.imgClassName || '';
    return (
      <div
        onClick={this.handleClick}
        className={`${className} ${divClassName}`}
        style={{
          position: 'relative',
          width: this.props.width,
          height: this.props.height,
          ...this.props.style
        }}
      >
        {!this.state.isReady && this.props.useSkeleton && this.renderSkeleton()}
        <img
          className={`${className} ${imgClassName}`}
          style={{
            width: this.props.width,
            height: this.props.height,
            objectFit: this.props.objectFit,
            ...this.props.imgStyle
          }}
          decoding={this.props.decoding}
          alt={this.props.alt}
          onLoad={this.onLoad}
          onError={this.onError}
          src={src}
        />
      </div>
    );
  }
  renderSkeleton(): React.ReactNode {
    if (this.props.customSkeleton) {
      return this.props.customSkeleton;
    }
    const width = this.props.width;
    const height = this.props.height;
    return (
      <ContentLoader
        className={`${this.props.className} fluid`}
        speed={2}
        width={this.props.skeletonWidth || width}
        height={this.props.skeletonHeight || height}
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        <rect
          x="0"
          y="0"
          rx="8"
          ry="8"
          width={this.props.skeletonWidth || '100%'}
          height={this.props.skeletonHeight || '100%'}
        />
      </ContentLoader>
    );
  }
}
