import React from 'react';
import { ArtistInterface } from '../../../interfaces';
import { Colors, ShapesSize, Sizes, GradientDirection } from '../../../types';
import {
  ButtonIcon,
  CloseIcon,
  AddPlaylistIcon,
  Avatar,
  ButtonSupportIcon as SupportIcon,
  Button,
  MessageBalloonIcon,
  ArrowRightIcon,
  ButtonSupport,
  UserGroupIcon
} from '../..';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonRouterLink
} from '@ionic/react';

interface Props {
  sliding: boolean;
  slidingClassName?: string;
  optionRemove?: boolean;
  optionAddPlaylist?: boolean;
  bottomBorder: boolean;
  communityFeedButton: boolean;
  leftDisabled: boolean;
  username?: string;
  songName?: string;
  artistName?: string;
  hasAvatar: boolean;
  avatarBadge: boolean;
  badgeColor?: Colors;
  avatarSize?: number;
  node?: number;
  avatarImage?: string;
  artist: ArtistInterface | null;
  supported?: boolean;
  pendingButton: boolean;
  chatButton: boolean;
  supportButtonIcon: boolean;
  supportButton: boolean;
  connectButton: boolean;
  expandArrow: boolean;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  songAction?: () => void;
  expandAction?: () => void;
  leftContentAction?: () => void;
  rightContentAction?: () => void;
  avatarClick?: () => void;
}

export default class ListItemComponent extends React.Component<Props> {
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  public static defaultProps = {
    sliding: false,
    artist: null,
    optionRemove: false,
    optionAddPlaylist: false,
    bottomBorder: false,
    leftDisabled: false,
    hasAvatar: false,
    avatarBadge: false,
    avatarSize: 48,
    avatarImage: undefined,
    pendingButton: false,
    connectButton: false,
    chatButton: false,
    supportButtonIcon: false,
    supportButton: false,
    expandArrow: false,
    leftContentAction: (): void => {},
    rightContentAction: (): void => {},
    avatarClick: (): void => {},
    communityFeedButton: false
  };

  sliding(item: React.ReactNode): React.ReactNode {
    const { username } = this.props;
    return (
      <IonItemSliding className={this.props.slidingClassName}>
        {item}
        <IonItemOptions side="end">
          {this.props.chatButton && (
            <ButtonIcon
              className="no-padding"
              icon={<MessageBalloonIcon />}
              color={Colors.transparent}
              type={ShapesSize.normal}
            />
          )}
          {this.props.communityFeedButton && (
            <IonRouterLink
              ref={this.linkRef}
              routerLink={`/feed/${username}`}
              routerDirection="root"
            >
              <ButtonIcon
                className="no-padding"
                icon={<UserGroupIcon />}
                color={Colors.transparent}
                type={ShapesSize.normal}
              ></ButtonIcon>
            </IonRouterLink>
          )}
          {this.props.optionRemove && (
            <ButtonIcon
              icon={<CloseIcon strokeWidth={2} width={18} height={18} />}
              className="no-padding"
              color={Colors.red}
              type={ShapesSize.normal}
            />
          )}
          {this.props.optionAddPlaylist && (
            <ButtonIcon
              icon={<AddPlaylistIcon />}
              color={Colors.green}
              className="no-padding"
              type={ShapesSize.normal}
            />
          )}
        </IonItemOptions>
      </IonItemSliding>
    );
  }

  itemList(): React.ReactNode {
    const {
      leftDisabled,
      artist,
      leftContentAction,
      username,
      supported
    } = this.props;
    const expand = this.props.expandArrow ? '' : '';
    return (
      <IonItem
        className={this.props.bottomBorder ? 'with-border' : ''}
        style={{ pointerEvents: 'all' }}
      >
        <div className="m-1 fluid flex-justify-content-end">
          <div
            onClick={leftContentAction}
            className={`align-start ${leftDisabled ? 'opacity' : ''}`}
          >
            <div className="p-05 flex-align-items-center">
              {this.props.hasAvatar && (
                <Avatar
                  badge={this.props.avatarBadge}
                  badgeColor={this.props.badgeColor}
                  image={this.props.avatarImage}
                  type={ShapesSize.circle}
                  width={this.props.avatarSize}
                  height={this.props.avatarSize}
                  onClick={this.props.avatarClick}
                />
              )}
              {username && (
                <span className="ml-2 f5" onClick={this.props.avatarClick}>
                  {username}
                </span>
              )}

              {this.props.songName && this.props.artistName && (
                <div className="ml-2 flex-column">
                  <span className="song f5" onClick={this.props.songAction}>
                    {this.props.songName}
                  </span>
                  <span className="artist f6" onClick={this.props.songAction}>
                    {this.props.artistName}
                  </span>
                </div>
              )}

              {this.props.leftContent}
            </div>
          </div>

          {this.props.centerContent && (
            <div className="flex-align-items-center">
              {this.props.centerContent}
            </div>
          )}

          <div
            className={`align-end no-padding flex-align-items-center my-auto ${expand}`}
          >
            {this.props.rightContent}

            {this.props.pendingButton && (
              <Button
                gradient={true}
                color={Colors.blue}
                size={Sizes.md}
                type={ShapesSize.rounded}
                label="PENDING"
              />
            )}

            {this.props.supportButtonIcon && (
              <SupportIcon
                artist={artist}
                supported={supported || artist?.support}
              />
            )}

            {this.props.supportButton && (
              <ButtonSupport
                artist={artist}
                supported={supported || artist?.support}
              />
            )}

            {this.props.connectButton && (
              <Button
                gradient={true}
                color={Colors.blue}
                size={Sizes.md}
                gradientDirection={GradientDirection.horizontal}
                type={ShapesSize.rounded}
                label="Connect"
              />
            )}

            {this.props.expandArrow && (
              <div
                className="arrow-expand flip"
                onClick={(e): void => {
                  this.props.expandAction
                    ? this.props.expandAction()
                    : this.openSlider(e);
                }}
              >
                <ArrowRightIcon />
              </div>
            )}
          </div>
        </div>
      </IonItem>
    );
  }

  openSlider(i): void {
    let clickedSlider =
      i.currentTarget.parentElement.parentElement.parentElement.parentElement;
    if (clickedSlider.classList.contains('item-sliding-active-options-end')) {
      clickedSlider.close();
      return;
    }
    clickedSlider.open(undefined);
  }

  render(): React.ReactNode {
    return this.props.sliding ? this.sliding(this.itemList()) : this.itemList();
  }
}
