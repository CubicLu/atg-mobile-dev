import React from 'react';
import { IonRouterLink } from '@ionic/react';
import {
  ShapesSize,
  Colors,
  GradientDirection,
  Sizes,
  RouterLinkDirection
} from '../../interfaces';

interface Props {
  onClick: Function;
  label?: string;
  className?: string;
  id?: string;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
  color?: Colors;
  bold?: boolean;
  type?: ShapesSize;
  size?: Sizes;
  gradient?: boolean;
  gradientDirection?: GradientDirection;
}

class ButtonComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  public static defaultProps = {
    onClick: (): any => {},
    gradient: false,
    routerDirection: 'forward',
    type: ShapesSize.normal,
    bold: false,
    size: Sizes.md
  };

  render(): React.ReactNode {
    const {
      onClick,
      color,
      type,
      label,
      id,
      routerLink: link,
      routerDirection
    } = this.props;
    let pattern = this.props.gradient ? 'gradient ' : '';
    pattern += this.props.bold ? 'bold ' : '';
    pattern += this.props.size !== Sizes.md && Sizes.lg ? 'large ' : '';
    pattern += this.props.className ? this.props.className : ' ';
    if (this.props.gradient) {
      pattern += ' ';
      pattern += this.props.gradientDirection
        ? this.props.gradientDirection
        : GradientDirection.horizontal;
    }
    return (
      <button
        id={id || 'btn-id'}
        onClick={(): void => (link ? this.linkRef.current?.click() : onClick())}
        className={`btn ${type} ${color} ${pattern.trim()}`}
      >
        <span>
          {label}
          {link && (
            <IonRouterLink
              ref={this.linkRef}
              routerLink={link}
              routerDirection={routerDirection}
            />
          )}
        </span>
      </button>
    );
  }
}

export default ButtonComponent;
