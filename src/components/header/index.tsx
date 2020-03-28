import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { BackIcon, DotsThreeIcon } from '..';
import { CloseIcon, SettingsIcon, UserGroupIcon, SupportIcon } from '../icon';
import { IonHeader } from '@ionic/react';
import MinimizeIcon from '../icon/minimize';

interface Props extends RouteComponentProps {
  className?: string;
  title?: string | null;
  titleClassName?: string;
  leftBackButton?: boolean;
  top?: boolean;
  color?: string;
  leftMinimizeButton?: boolean;
  rightActionButton?: boolean;
  rightCloseButton?: boolean;
  rightSettingsButton?: boolean;
  rightSupportButton?: boolean;
  rightAddButton?: boolean;
  rightFilterButton?: boolean;
  rightUserGroupButton?: boolean;
  rightActionYellow?: boolean;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  rightActionOnClick?: any;
  rightCloseOnClick?: any;
  leftMinimizeOnClick?: any;
  rightSettingsOnClick?: any;
  leftBackOnClick?: any;
  leftBackHref?: string;
  translucent?: boolean;
  ios?: boolean;
  fixed?: boolean;
}

class HeaderComponent extends React.Component<Props> {
  public static defaultProps = {
    title: null,
    leftBackButton: true,
    leftContent: null,
    rightActionButton: false,
    rightActionYellow: false,
    top: false,
    rightSettingsButton: false,
    rightSupportButton: false,
    rightAddButton: false,
    rightFilterButton: false,
    rightUserGroupButton: false,
    centerContent: null,
    rightContent: null,
    translucent: false,
    ios: false,
    fixed: true
  };

  goBackClick = (ev: any): any => {
    if (this.props.leftBackOnClick) {
      this.props.history.action = 'POP';
      return this.props.leftBackOnClick(ev);
    } else if (this.props.leftBackHref) {
      return this.props.history.push(this.props.leftBackHref);
    }
    this.props.history.action = 'POP';
    return this.props.history.goBack();
  };

  render(): React.ReactNode {
    const top = this.props.top ? 'header-top' : '';
    const {
      color,
      className,
      leftBackButton,
      leftMinimizeButton,
      leftMinimizeOnClick,
      leftContent,
      centerContent,
      title,
      fixed,
      titleClassName,
      rightContent,
      rightCloseButton,
      rightCloseOnClick,
      rightActionButton,
      rightActionOnClick,
      rightSettingsButton,
      rightSettingsOnClick,
      rightSupportButton,
      rightUserGroupButton,
      rightActionYellow,
      children
    } = this.props;

    const isFixed = fixed ? 'fixed' : '';

    return (
      <IonHeader id="ion-header" className="ion-no-border">
        <div className={`atg-header ${isFixed} ${top} ${color} ${className}`}>
          <div className="start">
            {leftBackButton && (
              <div className="default-button dark" onClick={this.goBackClick}>
                <BackIcon />
              </div>
            )}

            {leftMinimizeButton && (
              <div onClick={leftMinimizeOnClick}>
                <MinimizeIcon />
              </div>
            )}

            {leftContent}
          </div>

          <div className="center">
            {centerContent}
            {title && <span className={`h2 ${titleClassName}`}>{title}</span>}
          </div>

          <div className="end">
            {rightContent}

            {rightSupportButton && (
              <div className="default-button dark">
                <SupportIcon />
              </div>
            )}
            {rightActionButton && (
              <div
                className={`default-button ${
                  rightActionYellow ? 'gold' : 'dark'
                }`}
                onClick={rightActionOnClick}
              >
                <DotsThreeIcon color={rightActionYellow ? '#000' : '#fff'} />
              </div>
            )}
            {rightUserGroupButton && (
              <div
                className="default-button"
                onClick={(): any => this.props.history.push('/home/feed')}
              >
                <UserGroupIcon color={'#FFF'} height={23} width={23} />
              </div>
            )}
            {rightSettingsButton && (
              <div
                className="default-button dark"
                onClick={rightSettingsOnClick}
              >
                <SettingsIcon height={24} width={24} />
              </div>
            )}
            {rightCloseButton && (
              <div className="default-button dark" onClick={rightCloseOnClick}>
                <CloseIcon />
              </div>
            )}
          </div>
        </div>

        <React.Fragment>{children}</React.Fragment>
      </IonHeader>
    );
  }
}
export default withRouter(HeaderComponent);
