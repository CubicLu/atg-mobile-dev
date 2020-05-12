import React from 'react';
import {
  BackIcon,
  ButtonIcon,
  DotsThreeIcon,
  ShareIcon,
  StarIcon,
  Button
} from './../';
import {
  CloseIcon,
  SettingsIcon,
  UserGroupIcon,
  SupportIcon,
  BalloonIcon,
  ChatMessageIcon,
  DashboardIcon,
  NotificationIcon,
  MinimizeIcon
} from '../icon';
import { IonHeader, NavContext, NavContextState } from '@ionic/react';
import { SongInfoButton } from '../icon/player';
import { Colors, RouterLinkDirection, RouterLinkAction } from '../../types';

interface Props {
  className?: string;
  title?: string | null;
  titleClassName?: string;
  titleLeft?: boolean;
  leftBackButton?: boolean;
  top?: boolean;
  color?: string;
  leftMinimizeButton?: boolean;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  rightActionOnClick?: any;
  rightCloseOnClick?: any;
  rightDashboardOnClick?: any;
  leftMinimizeOnClick?: any;
  rightSettingsOnClick?: any;
  rightInfoOnClick?: any;
  leftBackOnClick?: any;
  leftBackHref?: string;
  rightActionHref?: string;
  rightCloseHref?: string;
  translucent?: boolean;
  ios?: boolean;
  fixed?: boolean;
  leftTitle?: string;
  routerDirection?: RouterLinkDirection;
  rightButtonGroup?: boolean;
  parentCallback?: Function;
  overlay?: number;
  notificationsNumber?: number;
  rightChatButton?: boolean;
  rightConnectedButton?: boolean;
  rightFanFeedButton?: boolean;
  rightNotificationButton?: boolean;
  rightDashboardButton?: boolean;
  rightActionButton?: boolean;
  rightCloseButton?: boolean;
  rightSettingsButton?: boolean;
  rightSupportButton?: boolean;
  rightInfoButton?: boolean;
  rightAddButton?: boolean;
  rightFilterButton?: boolean;
  rightUserGroupButton?: boolean;
  rightActionYellow?: boolean;
  rightClickGoBack?: boolean;
  likeButtonOnClick?: () => void;
}

class HeaderComponent extends React.Component<Props> {
  static contextType = NavContext; //retrieving ionic context
  public static defaultProps = {
    routerDirection: 'back',
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
    rightButtonGroup: false,
    rightNotificationButton: false,
    rightDashboardButton: false,
    centerContent: null,
    rightContent: null,
    translucent: false,
    ios: false,
    fixed: true,
    rightChatButton: false,
    rightConnectedButton: false,
    rightFanFeedButton: false,
    rightClickGoBack: false
  };

  goBackClick = (ev): void => {
    ev?.preventDefault();
    if (this.props.leftBackOnClick) {
      return this.props.leftBackOnClick(ev);
    }
    const back = this.props.leftBackHref;
    return back
      ? (this.context as NavContextState).navigate(back, 'back')
      : (this.context as NavContextState).goBack();
  };
  rightCloseBtn = (): void => {
    const { rightCloseHref, routerDirection, rightCloseOnClick } = this.props;
    if (rightCloseHref) {
      return this.routeNavigate(rightCloseHref, routerDirection);
    } else if (rightCloseOnClick) {
      this.props.rightCloseOnClick();
    } else this.goBackClick(null);
  };

  routeNavigate(
    path: string,
    direction?: RouterLinkDirection,
    ionRouteAction?: RouterLinkAction
  ): void {
    (this.context as NavContextState).navigate(
      path,
      direction || this.props.routerDirection || 'back',
      ionRouteAction
    );
  }

  openChatPanel = (shouldDisplay: boolean): Function => {
    return this.props.parentCallback
      ? this.props.parentCallback(shouldDisplay)
      : null;
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
      titleLeft,
      rightContent,
      rightCloseButton,
      rightActionButton,
      rightActionOnClick,
      rightSettingsButton,
      rightSettingsOnClick,
      rightSupportButton,
      rightUserGroupButton,
      rightNotificationButton,
      rightDashboardButton,
      rightInfoButton,
      rightInfoOnClick,
      rightActionYellow,
      leftTitle,
      rightButtonGroup,
      children,
      overlay,
      notificationsNumber,
      rightActionHref,
      rightChatButton,
      rightConnectedButton,
      rightFanFeedButton,
      rightFilterButton,
      likeButtonOnClick
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

            {leftTitle && (
              <div className={`h1 l11 ${titleClassName ? titleClassName : ''}`}>
                {leftTitle}
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

            {title && (
              <div
                className={`h2 l11 ${titleLeft ? 'title-left' : ''} ${
                  titleClassName ? titleClassName : ''
                }`}
              >
                {title}
              </div>
            )}
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
                onClick={
                  rightActionHref
                    ? (): void => this.routeNavigate(rightActionHref)
                    : rightActionOnClick
                }
              >
                <DotsThreeIcon color={rightActionYellow ? '#000' : '#fff'} />
              </div>
            )}

            {rightDashboardButton && (
              <div
                className="default-button dark"
                onClick={this.props.rightDashboardOnClick}
              >
                <DashboardIcon />
              </div>
            )}
            {rightConnectedButton && (
              <div
                className="default-button dark"
                onClick={(): any => this.routeNavigate('/message', 'forward')}
              >
                <UserGroupIcon width={20} height={15} />
              </div>
            )}
            {rightChatButton && (
              <div
                className="default-button dark"
                onClick={(): any => this.routeNavigate('/message', 'forward')}
              >
                <BalloonIcon width={20} height={15} />
              </div>
            )}
            {rightFanFeedButton && (
              <div
                className="default-button dark"
                onClick={(): any => this.routeNavigate('/feed', 'forward')}
              >
                <StarIcon />
              </div>
            )}
            {rightUserGroupButton && (
              <div
                className="default-button"
                onClick={(): any => this.routeNavigate('/community', 'forward')}
              >
                <UserGroupIcon color={'#FFF'} height={23} width={23} />
              </div>
            )}
            {rightNotificationButton && (
              <div
                className="default-button"
                onClick={(): any => this.routeNavigate('/message', 'forward')}
              >
                <ButtonIcon
                  color={Colors.transparent}
                  icon={<NotificationIcon width={30} height={20} />}
                  overlay={notificationsNumber}
                  overlayClassName={'notificationCounter'}
                />
              </div>
            )}
            {rightSettingsButton && (
              <div
                className="default-button dark"
                onClick={
                  rightActionHref
                    ? (): void => this.routeNavigate(rightActionHref)
                    : rightSettingsOnClick
                }
              >
                <SettingsIcon height={24} width={24} />
              </div>
            )}
            {rightCloseButton && (
              <div className="default-button dark" onClick={this.rightCloseBtn}>
                <CloseIcon />
              </div>
            )}
            {rightInfoButton && (
              <div className="default-button" onClick={rightInfoOnClick}>
                <SongInfoButton />
              </div>
            )}

            {rightFilterButton && (
              <Button
                onClick={rightInfoOnClick}
                color={Colors.transparentGray}
                label="Filter"
                className="btn filter"
              />
            )}

            {rightButtonGroup && (
              <ul className="list inline">
                <li onClick={likeButtonOnClick}>
                  <ButtonIcon
                    className="mt-15"
                    color={Colors.orange}
                    icon={<StarIcon width={24} height={24} />}
                  />
                </li>
                <li>
                  <ButtonIcon
                    className="mt-15"
                    color={Colors.green}
                    icon={<ShareIcon width={22} height={20} />}
                    onClick={(): void => this.routeNavigate('/share')}
                  />
                </li>
                <li>
                  <ButtonIcon
                    className="mt-15"
                    color={Colors.cyan}
                    icon={<ChatMessageIcon />}
                    onClick={this.openChatPanel.bind(this, true)}
                    overlay={overlay}
                  />
                </li>
              </ul>
            )}
          </div>
        </div>
        <div>{children}</div>
      </IonHeader>
    );
  }
}
export default HeaderComponent;
