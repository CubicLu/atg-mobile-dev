import React from 'react';
import { ShapesSize, Colors } from '../../../types';
import { IonRouterLink } from '@ionic/react';

interface Props {
  onClick: Function;
  icon: any;
  color?: Colors;
  type?: ShapesSize;
  styles?: object;
  fixed: boolean;
  label?: string | number;
  overlay?: number;
  className?: string;
  overlayClassName?: string;
  routerLink?: string;
}

export default class ButtonIconComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  public static defaultProps = {
    onClick: (): any => {},
    color: Colors.transparentGray,
    type: ShapesSize.circle,
    fixed: false,
    overlayClassName: 'overlay'
  };

  render(): React.ReactNode {
    const isFixed = (this.props.fixed && ' fixed') || '';
    const {
      onClick,
      type,
      color,
      styles,
      icon,
      label,
      overlay,
      overlayClassName,
      className,
      routerLink: url
    } = this.props;
    const custom = className ? className : '';

    return (
      <button
        onClick={(): void => (url ? this.linkRef.current?.click() : onClick())}
        className={`btn icon ${type} ${color} ${isFixed} ${custom}`}
        style={{ ...styles }}
      >
        {icon}

        {label && <span>{label}</span>}
        {url && (
          <IonRouterLink
            ref={this.linkRef}
            routerLink={url}
            routerDirection="forward"
          />
        )}

        {!!overlay && overlay >= 0 && (
          <div className={overlayClassName}>
            {overlay > 999 ? overlay / 1000 + 'k' : overlay}
          </div>
        )}
      </button>
    );
  }
}
