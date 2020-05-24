import React, { CSSProperties } from 'react';
import { ShapesSize } from '../../../types';
import { IonCheckbox } from '@ionic/react';
import { CloseIcon, ContentLoader } from '../..';

interface Props {
  className?: string;
  image?: string;
  frame?: boolean;
  innerContent?: React.ReactNode;
  width: number;
  selected: boolean;
  selectAction?: Function;
  canRemove: boolean;
  removeAction?: Function;
}
interface State {
  isReady: boolean;
}

export default class CardCameraComponent extends React.Component<Props, State> {
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
    routerDirection: 'forward',
    selected: false,
    canRemove: false
  };
  renderSkeleton(): React.ReactNode {
    if (this.state.isReady) return null;
    const size = this.props.width || 110;
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
        <rect x="0" y="0" rx="8" ry="8" width={size} height={size} />
      </ContentLoader>
    );
  }
  renderClose(): React.ReactNode {
    if (!this.props.canRemove) return null;
    return (
      <div
        className="flex-compass north east p-1 btn-close"
        onClick={(): void =>
          this.props.removeAction && this.props.removeAction()
        }
      >
        <CloseIcon />
      </div>
    );
  }
  renderSelected(): React.ReactNode {
    if (!this.props.selected) return null;
    return (
      <div className={'flex-compass south east p-1 mt-1'}>
        <IonCheckbox
          mode="ios"
          color="secondary"
          checked={this.props.selected}
          onClick={(e): void =>
            this.props.selectAction && this.props.selectAction(e.target)
          }
          style={{
            '--checkmark-width': '3px',
            '--background': '#ffffff30'
          }}
        />
      </div>
    );
  }
  cardStyle(): CSSProperties {
    return {
      backgroundImage: `url(${this.props.image})`,
      height: this.props.width,
      width: this.props.width,
      minHeight: this.props.width,
      minWidth: this.props.width
    };
  }
  render(): React.ReactNode {
    const { image, className } = this.props;
    const type = this.props.frame ? 'rounded-frame' : 'rounded';
    return (
      <div className={'col s0'}>
        <img
          style={{ width: 1, height: 1, visibility: 'hidden' }}
          decoding={'async'}
          src={image}
          alt=""
          onLoad={(): void => this.setLoaded()}
          onError={(): void => this.setLoaded()}
        />

        <div
          className={`card image ${type} ${className}`}
          style={this.cardStyle()}
        >
          {this.renderSkeleton()}
          {this.renderClose()}
          {this.renderSelected()}

          {this.props.innerContent}
        </div>
      </div>
    );
  }
  setLoaded(): void {
    !this.state.isReady && !this._unmounted && this.setState({ isReady: true });
  }
}
