import React from 'react';
import { ShapesSize, RouterLinkDirection } from '../../../types';
import { IonRouterLink, IonCheckbox, IonImg } from '@ionic/react';
import { CloseIcon, ContentLoader } from '../..';

interface Props {
  image: string | undefined;
  className?: string;
  labelClassName?: string;
  key: number;
  type: ShapesSize;
  col: number;
  label?: string;
  innerContent?: React.ReactNode;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
  diameter?: string;
  selected?: boolean;
  selectAction?: Function;
  canRemove?: boolean;
  removeAction?: Function;
}

interface State {
  albumIsReady: boolean;
}

class CardImageComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      albumIsReady: false
    };
  }

  public static defaultProps = {
    type: ShapesSize.normal,
    col: 6,
    routerDirection: 'forward'
  };

  render(): React.ReactNode {
    const {
      col,
      type,
      image,
      label,
      diameter,
      selectAction,
      removeAction,
      className,
      labelClassName
    } = this.props;
    return (
      <div className={`col s${col}`}>
        <IonImg
          onIonImgDidLoad={(): void => {
            this.setState({
              albumIsReady: true
            });
          }}
          src={image}
          style={{ width: 0, height: 0, visibility: 'hidden' }}
        />
        <IonRouterLink
          routerLink={this.props.routerLink}
          routerDirection={this.props.routerDirection}
        >
          <div
            className={`card image ${type} ${className}`}
            style={
              this.state.albumIsReady
                ? {
                    backgroundImage: `url(${image})`,
                    height: diameter,
                    width: diameter,
                    minHeight: diameter,
                    minWidth: diameter,
                    visibility: 'visible'
                  }
                : { visibility: 'hidden' }
            }
          >
            {this.props.canRemove && (
              <div
                className="flex-compass north east p-1 btn-close"
                onClick={(): void => removeAction && removeAction()}
              >
                <CloseIcon />
              </div>
            )}

            {this.props.selected !== undefined && (
              <div className={'flex-compass south east p-1 mt-1'}>
                <IonCheckbox
                  mode="ios"
                  color="secondary"
                  checked={this.props.selected}
                  onClick={(e): void => selectAction && selectAction(e.target)}
                  style={{
                    '--checkmark-width': '3px',
                    '--background': '#ffffff30'
                  }}
                />
              </div>
            )}

            {this.props.innerContent}
          </div>
          <ContentLoader
            className="mt-3"
            speed={2}
            viewBox="0 0 400 400"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
            style={
              this.state.albumIsReady
                ? { visibility: 'hidden', display: 'none' }
                : { visibility: 'visible' }
            }
          >
            <rect x="20" y="0" rx="8" ry="8" width="500" height="500" />
          </ContentLoader>
          <div
            className={`mt-15 f5 center-align ${labelClassName}`}
            style={{ width: diameter }}
          >
            {label}
          </div>
        </IonRouterLink>
      </div>
    );
  }
}

export default CardImageComponent;
