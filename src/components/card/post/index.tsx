import React, { CSSProperties } from 'react';
import {
  Avatar,
  ButtonIcon,
  BalloonIcon,
  ShareLineIcon,
  HeartIcon,
  DotsThreeIcon,
  ContentLoader
} from './../../../components';
import { PostInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import { IonRouterLink, IonSlides, IonSlide } from '@ionic/react';

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
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };

  public static defaultProps = {
    showOptions: false,
    disableComment: false,
    clickToOpen: false,
    rounded: true
  };

  renderSkeleton(): React.ReactNode {
    return (
      <ContentLoader
        className="mt-3"
        speed={2}
        width={500}
        height={290}
        viewBox="0 0 500 290"
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
      >
        <rect x="2" y="0" rx="8" ry="8" width="355" height="268" />
      </ContentLoader>
    );
  }

  stylizePost(url: string, rounded: boolean = true): CSSProperties {
    return {
      height: '290px',
      position: 'relative',
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: rounded ? '20px' : 0,
      overflowY: 'hidden'
    };
  }

  renderPostSingle(): React.ReactNode {
    return (
      <div
        className={`flex-column space-between overflow-x ${this.props.className}`}
        style={this.stylizePost(
          this.props.post.image as string,
          this.props.rounded
        )}
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
  renderPostInput(): React.ReactNode {
    const { showUser, post } = this.props;
    return (
      <div className="mx-2 flex-align-items-center pb-2 absolute-community-interactions">
        {showUser && (
          <IonRouterLink
            routerDirection="forward"
            routerLink={`/profile/${post.username}`}
          >
            <div className="align-start flex">
              <Avatar
                avatarUrl={`/profile/${post.username}`}
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
          <IonRouterLink
            routerDirection="forward"
            routerLink={'/community/share'}
          >
            <ButtonIcon className="btn large" icon={<ShareLineIcon />} />
          </IonRouterLink>

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

          <ButtonIcon className="btn large" icon={<HeartIcon />} />
        </div>
      </div>
    );
  }
  render(): React.ReactNode {
    const { post, clickToOpen } = this.props;
    const url = clickToOpen ? `/community/comments/${post.id || 1}` : undefined;

    if (!this.isReady) this.displayContent();
    if (!this.isReady) return this.renderSkeleton();

    return (
      <div className="mb-4" style={{ position: 'relative' }}>
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
