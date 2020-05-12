import React from 'react';
import { IonRouterLink } from '@ionic/react';
import {
  ShapesSize,
  Colors,
  GradientDirection,
  Sizes,
  RouterLinkDirection
} from '../../types';

interface Props {
  onClick: Function;
  label?: string;
  className?: string;
  id?: string;
  routerLink?: string;
  routerDirection: RouterLinkDirection;
  color?: Colors;
  bold?: boolean;
  disabled: boolean;
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
    disabled: false,
    size: Sizes.md
  };

  render(): React.ReactNode {
    const { onClick, label, routerLink: link, routerDirection } = this.props;

    let pattern = this.props.gradient ? 'gradient' : '';
    pattern += ' ';
    pattern += this.props.bold ? 'bold' : '';
    pattern += ' ';
    pattern += this.props.size ? this.props.size : '';
    pattern += ' ';
    pattern += this.props.type ? this.props.type : '';
    pattern += ' ';
    pattern += this.props.color ? this.props.color : '';
    pattern += ' ';
    pattern += this.props.className ? this.props.className : '';
    pattern += ' ';
    if (this.props.gradient) {
      pattern += this.props.gradientDirection
        ? this.props.gradientDirection
        : GradientDirection.horizontal;
    }
    return (
      <button
        id={this.props.id}
        disabled={this.props.disabled}
        onClick={(): void => (link ? this.linkRef.current?.click() : onClick())}
        className={`btn ${pattern.trim()} `}
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
