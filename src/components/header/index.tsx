import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { BackIcon, ButtonIcon, DotsThreeIcon, ShareIcon, StarIcon } from '..';
import { CloseIcon, SettingsIcon, UserGroupIcon, SupportIcon } from '../icon';
import { IonHeader } from '@ionic/react';
import MinimizeIcon from '../icon/minimize';
import { SongInfoButton } from '../icon/player';
import { Colors } from '../../interfaces';
import ChatMessageIcon from '../icon/chat-message';

interface Props extends RouteComponentProps {
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
  direction?: 'PUSH' | 'POP' | 'REPLACE';
  rightButtonGroup?: boolean;
  parentCallback?: Function;
  overlay?: string | number;
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
    rightButtonGroup: false,
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

  pushUrl(url: string): void {
    const direction = this.props.direction || 'PUSH';
    switch (direction) {
      case 'PUSH':
        return this.props.history.push(url);
      case 'POP':
        return this.props.history.goBack();
      case 'REPLACE':
        return this.props.history.replace(url);
    }
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
      rightButtonGroup,
      children,
      overlay,
      rightActionHref,
      rightCloseHref
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
              <div
                className="default-button dark"
                onClick={
                  rightCloseHref
                    ? (): void => this.pushUrl(rightCloseHref)
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
                    icon={<ChatMessageIcon width={22} height={20} />}
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
export default withRouter(HeaderComponent);
