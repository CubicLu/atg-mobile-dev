import React from 'react';
import { BackIcon, ButtonIcon, DotsThreeIcon, ShareIcon, StarIcon } from '..';
import { CloseIcon, SettingsIcon, UserGroupIcon, SupportIcon } from '../icon';
import { IonHeader, NavContext, NavContextState } from '@ionic/react';
import MinimizeIcon from '../icon/minimize';
import { SongInfoButton } from '../icon/player';
import { Colors, RouterLinkDirection } from '../../interfaces';
import ChatMessageIcon from '../icon/chat-message';

interface Props {
  className?: string;
  title?: string | null;
  titleClassName?: string;
  titleLeft?: boolean;
  leftBackButton?: boolean;
  top?: boolean;
  color?: string;
  leftMinimizeButton?: boolean;
  rightActionButton?: boolean;
  rightCloseButton?: boolean;
  rightSettingsButton?: boolean;
  rightSupportButton?: boolean;
  rightInfoButton?: boolean;
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
  overlay?: string | number;
}

class HeaderComponent extends React.Component<Props> {
  //using it instead of withRouter
  context!: React.ContextType<typeof NavContext>;
  static get contextType(): React.Context<NavContextState> {
    return NavContext;
  } //using it instead of withRouter

  public static defaultProps = {
    direction: 'back',
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
    centerContent: null,
    rightContent: null,
    translucent: false,
    ios: false,
    fixed: true
  };

  goBackClick = (ev: any): any => {
    if (this.props.leftBackOnClick) {
      return this.props.leftBackOnClick(ev);
    }
    return this.context.goBack(
      this.props.leftBackHref ? this.props.leftBackHref : undefined
    );
  };

  pushUrl(url: string, direction?: RouterLinkDirection): void {
    const routerDirection = direction || this.props.routerDirection || 'back';
    this.context.navigate(url, routerDirection);
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
      rightCloseOnClick,
      rightActionButton,
      rightActionOnClick,
      rightSettingsButton,
      rightSettingsOnClick,
      rightSupportButton,
      rightUserGroupButton,
      rightInfoButton,
      rightInfoOnClick,
      rightActionYellow,
      leftTitle,
      rightButtonGroup,
      children,
      overlay,
      rightActionHref,
      rightCloseHref,
      routerDirection
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
                    ? (): void => this.pushUrl(rightActionHref)
                    : rightActionOnClick
                }
              >
                <DotsThreeIcon color={rightActionYellow ? '#000' : '#fff'} />
              </div>
            )}
            {rightUserGroupButton && (
              <div
                className="default-button"
                onClick={(): any => this.pushUrl('/feed', 'forward')}
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
              <div
                className="default-button dark"
                onClick={
                  rightCloseHref
                    ? (): void => this.pushUrl(rightCloseHref, routerDirection)
                    : rightCloseOnClick
                }
              >
                <CloseIcon />
              </div>
            )}
            {rightInfoButton && (
              <div className="default-button" onClick={rightInfoOnClick}>
                <SongInfoButton />
              </div>
            )}

            {rightButtonGroup && (
              <ul className="list inline">
                <li>
                  <ButtonIcon
                    color={Colors.orange}
                    icon={<StarIcon width={24} height={24} />}
                  />
                </li>
                <li>
                  <ButtonIcon
                    color={Colors.green}
                    icon={<ShareIcon width={22} height={20} />}
                  />
                </li>
                <li>
                  <ButtonIcon
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
