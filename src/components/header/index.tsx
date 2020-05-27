import React, { CSSProperties } from 'react';
import { BackIcon, ButtonIcon, DotsThreeIcon, StarIcon, Button } from './../';
import {
  CloseIcon,
  SettingsIcon,
  UserGroupIcon,
  BalloonIcon,
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
  centerInfoOnClick?: any;
  leftBackAddAction?: any;
  leftBackHref?: string;
  rightActionHref?: string;
  rightCloseHref?: string;
  rightFanFeedUrl?: string;
  translucent?: boolean;
  ios?: boolean;
  fixed?: boolean;
  leftTitle?: string;
  routerDirection?: RouterLinkDirection;
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
  rightInfoButton?: boolean;
  rightAddButton?: boolean;
  rightFilterButton?: boolean;
  rightActionYellow?: boolean;
  rightClickGoBack?: boolean;
  likeButtonOnClick?: () => void;
  style?: CSSProperties;
}

export default class HeaderComponent extends React.PureComponent<Props> {
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
    rightAddButton: false,
    rightFilterButton: false,
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
    this.props.leftBackAddAction && this.props.leftBackAddAction(ev);

    const back = this.props.leftBackHref;
    return back
      ? (this.context as NavContextState).navigate(back, 'back')
      : (this.context as NavContextState).goBack();
  };
  rightCloseBtn = (): void => {
    const { rightCloseHref, routerDirection, rightCloseOnClick } = this.props;
    if (this.props.rightClickGoBack) this.goBackClick(null);
    else if (rightCloseHref) {
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
      rightNotificationButton,
      rightDashboardButton,
      rightInfoButton,
      rightInfoOnClick,
      rightActionYellow,
      leftTitle,
      children,
      notificationsNumber,
      rightActionHref,
      rightChatButton,
      rightConnectedButton,
      rightFanFeedButton,
      rightFilterButton,
      style
    } = this.props;

    let customHeaderClass = 'atg-header ';
    customHeaderClass += fixed ? 'fixed' : ' ';
    customHeaderClass += top ? top : ' ';
    customHeaderClass += color ? color : ' ';
    customHeaderClass += className ? className : ' ';

    return (
      <IonHeader id="ion-header" className="ion-no-border" style={style}>
        <div className={`${customHeaderClass.trim()}`}>
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

          <div
            onClick={(): void => this.props.centerInfoOnClick()}
            className="center"
          >
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
                onClick={(): void => this.routeNavigate('/message', 'forward')}
              >
                <UserGroupIcon width={20} height={15} />
              </div>
            )}
            {rightChatButton && (
              <div
                className="default-button dark"
                onClick={(): void => this.routeNavigate('/chat/0', 'forward')}
              >
                <BalloonIcon width={20} height={15} />
              </div>
            )}
            {rightFanFeedButton && this.props.rightFanFeedUrl && (
              <div
                className="default-button dark"
                onClick={(): void =>
                  this.routeNavigate(this.props.rightFanFeedUrl!, 'forward')
                }
              >
                <StarIcon />
              </div>
            )}
            {rightNotificationButton && (
              <div
                className="default-button"
                onClick={(): void => this.routeNavigate('/message', 'forward')}
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
          </div>
        </div>
        <div>{children}</div>
      </IonHeader>
    );
  }
}
