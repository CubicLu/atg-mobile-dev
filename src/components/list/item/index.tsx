import React from 'react';
import { ArtistInterface } from '../../../models';
import { Colors, ShapesSize, Sizes, GradientDirection } from '../../../types';
import {
  ButtonIcon,
  CloseIcon,
  AddPlaylistIcon,
  Avatar,
  ButtonSupportIcon,
  Button,
  MessageBalloonIcon,
  ArrowRightIcon,
  ContentLoader,
  UserGroupIcon
} from '../..';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonRouterLink
} from '@ionic/react';
import { ShareIcon } from '../../icon';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  sliding: boolean;
  slidingClassName?: string;
  optionRemove?: boolean;
  optionAddPlaylist?: boolean;
  optionShare?: boolean;
  bottomBorder: boolean;
  communityFeedButton: boolean;
  leftDisabled: boolean;
  routeLink?: string;
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
  isArtist: boolean;
  supported?: boolean;
  pendingButton: boolean;
  chatButton: boolean;
  supportButtonIcon: boolean;
  connectButton: boolean;
  expandArrow: boolean;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  songAction?: () => void;
  expandAction?: () => void;
  leftContentAction?: () => void;
  rightContentAction?: () => void;
}
interface State {
  isReady: boolean;
}
export default class ListItemComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }
  linkRef: React.RefObject<HTMLIonRouterLinkElement> = React.createRef();
  private _unmounted: boolean = false;
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  displayContent = (): void => {
    setTimeout((): void => {
      !this._unmounted && this.setState({ isReady: true });
    }, 2000);
  };
  public static defaultProps = {
    sliding: false,
    artist: null,
    optionRemove: false,
    optionAddPlaylist: false,
    optionShare: false,
    bottomBorder: false,
    leftDisabled: false,
    hasAvatar: false,
    avatarBadge: false,
    avatarSize: 48,
    avatarImage: undefined,
    isArtist: false,
    pendingButton: false,
    connectButton: false,
    chatButton: false,
    supportButtonIcon: false,
    supportButtonHorizontal: false,
    expandArrow: false,
    leftContentAction: (): void => {},
    rightContentAction: (): void => {},
    communityFeedButton: false
  };
  ref: React.RefObject<HTMLIonItemSlidingElement> = React.createRef();

  confirmDelete(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Remove Item',
        confirmButtons: true,
        cannotDismiss: true
      })
    );
  }
  confirmShare(): void {
    store.dispatch(
      updateActionSheet({
        title: 'Share',
        confirmButtons: false,
        shareOption: true
      })
    );
  }

  sliding(item: React.ReactNode): React.ReactNode {
    const { username, isArtist } = this.props;
    return (
      <IonItemSliding className={this.props.slidingClassName} ref={this.ref}>
        {item}
        <IonItemOptions side="end">
          {this.props.chatButton && (
            <ButtonIcon
              className="no-padding"
              icon={<MessageBalloonIcon />}
              routerLink={'/chat/0'}
              color={Colors.transparent}
              type={ShapesSize.normal}
            />
          )}
          {this.props.communityFeedButton && (
            <ButtonIcon
              routerLink={
                isArtist
                  ? `/community/artist/${username}`
                  : `/community/feed/${username}`
              }
              className="no-padding"
              icon={<UserGroupIcon />}
              color={Colors.transparent}
              type={ShapesSize.normal}
            ></ButtonIcon>
          )}
          {this.props.optionRemove && (
            <ButtonIcon
              onClick={(): void => this.confirmDelete()}
              icon={<CloseIcon strokeWidth={2} width={18} height={18} />}
              className="no-padding"
              color={Colors.red}
              type={ShapesSize.normal}
            />
          )}
          {this.props.optionShare && (
            <ButtonIcon
              onClick={(): void => this.confirmShare()}
              icon={<ShareIcon />}
              color={Colors.orange}
              className="no-padding"
              type={ShapesSize.normal}
            />
          )}
          {this.props.optionAddPlaylist && (
            <ButtonIcon
              icon={<AddPlaylistIcon />}
              onClick={(): void => this.confirmShare()}
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
      supported,
      routeLink
    } = this.props;
    const expand = this.props.expandArrow ? '' : '';

    return (
      <IonItem
        className={this.props.bottomBorder ? 'with-border' : ''}
        style={{ pointerEvents: 'all' }}
      >
        <div className="my-1 mx-15 fluid flex-justify-content-end">
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
                  avatarUrl={
                    username ? `/profile/friend/${username}` : routeLink
                  }
                />
              )}
              {username && (
                <IonRouterLink routerLink={`/profile/friend/${username}`}>
                  <span className="ml-2 f5">{username}</span>
                </IonRouterLink>
              )}

              {this.props.songName && this.props.artistName && (
                <IonRouterLink routerLink={routeLink}>
                  <div className="ml-2 flex-column">
                    <span className="song f5" onClick={this.props.songAction}>
                      {this.props.songName}
                    </span>
                    <span className="artist f6" onClick={this.props.songAction}>
                      {this.props.artistName}
                    </span>
                  </div>
                </IonRouterLink>
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
                className="mr-05 hide-on-slide"
                gradient={true}
                color={Colors.blue}
                size={Sizes.md}
                type={ShapesSize.rounded}
                label="PENDING"
              />
            )}

            {this.props.supportButtonIcon && (
              <ButtonSupportIcon
                className="mr-05 hide-on-slide"
                artist={artist}
                supported={supported || artist?.support}
              />
            )}

            {this.props.connectButton && (
              <Button
                className="mr-05 hide-on-slide"
                gradient={true}
                color={Colors.blue}
                size={Sizes.md}
                gradientDirection={GradientDirection.horizontal}
                type={ShapesSize.rounded}
                label="CONNECT"
                routerLink={`/profile/friend/${username}`}
              />
            )}

            {this.props.expandArrow && (
              <span
                className="arrow-expand flip"
                onClick={(): void => {
                  this.props.expandAction
                    ? this.props.expandAction()
                    : this.openSlider();
                }}
              >
                <ArrowRightIcon />
              </span>
            )}
          </div>
        </div>
      </IonItem>
    );
  }

  openSlider(): void {
    let clickedSlider = this.ref.current;
    if (!clickedSlider) return;
    if (clickedSlider.classList.contains('item-sliding-active-options-end')) {
      clickedSlider.close();
      return;
    }
    clickedSlider.open(undefined);
  }

  loadContent(): React.ReactNode {
    return (
      <ContentLoader
        className="my-05"
        speed={2}
        viewBox="0 0 400 60"
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
      >
        <circle cx="60" cy="30" r="30" />
        <rect x="100" y="20" rx="3" ry="3" width="240" height="20" />
      </ContentLoader>
    );
  }

  render(): React.ReactNode {
    if (!this.state.isReady) {
      this.displayContent();
      return this.loadContent();
    } else {
      return this.props.sliding
        ? this.sliding(this.itemList())
        : this.itemList();
    }
  }
}
