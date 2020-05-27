import React, { CSSProperties } from 'react';
import {
  Avatar,
  ButtonIcon,
  BalloonIcon,
  ShareLineIcon,
  DotsThreeIcon,
  FavoriteIcon,
  ImageSkeleton
} from './../../../components';
import { PostInterface } from '../../../models';
import { ShapesSize, Colors } from '../../../types';
import { IonRouterLink, IonSlides, IonSlide } from '@ionic/react';
import { store } from '../../../store';
import { updateActionSheet } from '../../../actions';

interface Props {
  post: PostInterface;
  showUser?: boolean;
  showOptions?: boolean;
  disableComment: boolean;
  clickToOpen: boolean;
  className?: string;
  rounded: boolean;
}

export default class CardPostComponent extends React.Component<Props> {
  public static defaultProps = {
    showOptions: false,
    disableComment: false,
    clickToOpen: false,
    rounded: true
  };

  stylizePost(url: string, rounded: boolean = true): CSSProperties {
    return {
      height: '290px',
      position: 'relative',
      backgroundImage: `url(${url}), linear-gradient(#5f5f5f80, #8f8f8f80)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: rounded ? '20px' : 0,
      overflowY: 'hidden'
    };
  }

  renderPostSingle(): React.ReactNode {
    if (typeof this.props.post.image !== 'string') return;
    if (this.props.post.image.length === 0) return;
    return (
      <ImageSkeleton
        className={`flex-column space-between overflow-x ${this.props.className}`}
        src={this.props.post.image}
        width={'100%'}
        height={290}
        useSkeleton={true}
        style={this.stylizePost('', this.props.rounded)}
      />
    );
  }
  renderPostSlideshow(): React.ReactNode {
    const images = this.props.post.image as string[];
    return (
      <IonSlides
        pager={true}
        className={this.props.className}
        style={this.stylizePost('', this.props.rounded)}
      >
        {images.map(
          (image, index): React.ReactNode => (
            <IonSlide
              key={index}
              className={`flex-compass space-between overflow-x ${this.props.className}`}
              style={this.stylizePost(image, this.props.rounded)}
            />
          )
        )}
      </IonSlides>
    );
  }
  renderControls(): React.ReactNode {
    return (
      <React.Fragment>
        <div className="absolute-dots-top-right">
          {this.props.showOptions && (
            <div className="default-button dark btn large">
              <DotsThreeIcon />
            </div>
          )}
        </div>
        {this.renderPostInput()}
      </React.Fragment>
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
  renderPostInput(): React.ReactNode {
    const { showUser, post } = this.props;
    return (
      <div className="mx-2 flex-align-items-center pb-2 absolute-community-interactions">
        {showUser && (
          <IonRouterLink
            routerDirection="forward"
            routerLink={`/profile/friend/${post.username}`}
          >
            <div className="align-start flex">
              <Avatar
                avatarUrl={`/profile/friend/${post.username}`}
                image={post.avatar}
                type={ShapesSize.circle}
                width={40}
                height={40}
              />
              <label className="ml-1 f7 my-auto">{post.username}</label>
            </div>
          </IonRouterLink>
        )}

        <div className="align-end flex">
          <ButtonIcon
            onClick={(): void => this.confirmShare()}
            className="btn large"
            icon={<ShareLineIcon />}
          />

          <span className="mx-05" />

          <IonRouterLink
            routerDirection="forward"
            routerLink={
              this.props.disableComment
                ? undefined
                : `/community/comments/${post.id || 1}`
            }
          >
            <ButtonIcon
              className="btn large"
              icon={<BalloonIcon />}
              label={post.commentsQuantity}
            />
          </IonRouterLink>

          <span className="mx-05" />

          <FavoriteIcon icon="heart" color={Colors.transparentGray} />
        </div>
      </div>
    );
  }
  render(): React.ReactNode {
    const { post, clickToOpen } = this.props;
    const url = clickToOpen ? `/community/comments/${post.id || 1}` : undefined;

    return (
      <div
        className="mb-4"
        style={{
          position: 'relative',
          minHeight: 290
        }}
      >
        <IonRouterLink routerLink={url}>
          {Array.isArray(post.image)
            ? this.renderPostSlideshow()
            : this.renderPostSingle()}
        </IonRouterLink>
        {this.renderControls()}
      </div>
    );
  }
}
