import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { BackIcon, DotsThreeIcon } from '..';
import { CloseIcon, SettingsIcon, UserGroupIcon, SupportIcon } from '../icon';
import { IonHeader } from '@ionic/react';
import MinimizeIcon from '../icon/minimize';

interface Props extends RouteComponentProps {
  className?: string;
  title?: string | null;
  titleClassName?: string | null;
  leftBackButton?: boolean;
  top?: boolean;
  color?: string | undefined;
  leftMinimizeButton?: boolean;
  rightActionButton?: boolean;
  rightCloseButton?: boolean;
  rightSettingsButton?: boolean;
  rightSupportButton?: boolean;
  rightAddButton?: boolean;
  rightFilterButton?: boolean;
  rightUserGroupButton?: boolean;
  leftContent?: React.ReactNode | null;
  centerContent?: React.ReactNode | null;
  rightContent?: React.ReactNode | null;
  rightActionOnClick?: any | undefined;
  rightCloseOnClick?: any | undefined;
  leftMinimizeOnClick?: any | undefined;
  rightSettingsOnClick?: any | undefined;
  leftBackOnClick?: any | undefined;
  leftBackHref?: string | undefined;
}

class HeaderComponent extends React.Component<Props> {
  public static defaultProps = {
    title: null,
    titleAlign: 'center',
    leftBackButton: true,
    leftContent: null,
    rightActionButton: false,
    top: false,
    rightSettingsButton: false,
    rightSupportButton: false,
    rightAddButton: false,
    rightFilterButton: false,
    rightUserGroupButton: false,
    centerContent: null,
    rightContent: null
  };

  goBackClick = (ev: any): any => {
    if (this.props.leftBackOnClick) {
      return this.props.leftBackOnClick(ev);
    } else if (this.props.leftBackHref) {
      return this.props.history.push(this.props.leftBackHref);
    }
    return this.props.history.goBack();
  };

  render(): React.ReactNode {
    const top = this.props.top ? ' header-top' : '';
    const {
      color,
      className,
      leftBackButton,
      leftMinimizeButton,
      leftMinimizeOnClick,
      leftContent,
      centerContent,
      title,
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
      children
    } = this.props;

    return (
      <IonHeader className="ion-no-border">
        <div className={`atg-header fixed${top} ${color} ${className}`}>
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

          {centerContent}

          {title && (
            <div className={`title ${titleClassName}`}>
              <span>{title}</span>
            </div>
          )}

          <div className="end">
            {rightContent}

            {rightSupportButton && (
              <div className="default-button dark">
                <SupportIcon />
              </div>
            )}
            {rightActionButton && (
              <div className="default-button dark" onClick={rightActionOnClick}>
                <DotsThreeIcon />
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
              <div className="default-button" onClick={rightSettingsOnClick}>
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

        <div>{children}</div>
      </IonHeader>
    );
  }
}
export default withRouter(HeaderComponent);
