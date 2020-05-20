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
import { IonRouterLink, IonSlides, IonSlide, IonImg } from '@ionic/react';

interface Props {
  post: PostInterface;
  showUser?: boolean;
  showOptions?: boolean;
  disableComment: boolean;
  clickToOpen: boolean;
  className?: string;
  rounded: boolean;
}

interface State {
  communityIsReady: boolean;
}

export default class CardPostComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      communityIsReady: false
    };
  }

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
    return (
      <div>
        <IonImg
          className={`flex-column space-between overflow-x ${this.props.className}`}
          // @ts-ignore
          src={this.props.post.image}
          onIonImgDidLoad={(): void => {
            this.setState({
              communityIsReady: true
            });
          }}
          style={
            this.state.communityIsReady
              ? {
                  height: '290px',
                  position: 'relative',
                  backgroundImage: 'linear-gradient(#5f5f5f80, #8f8f8f80)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: this.props.rounded ? '20px' : 0,
                  overflowY: 'hidden',
                  objectFit: 'cover'
                }
              : { visibility: 'hidden', width: 0, height: 0 }
          }
        />
        <ContentLoader
          className="fluid"
          speed={2}
          width={'100%'}
          height={400}
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.state.communityIsReady
              ? {
                  visibility: 'hidden',
                  display: 'none'
                }
              : { visibility: 'visible' }
          }
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="268" />
        </ContentLoader>
      </div>
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
          <IonRouterLink routerDirection="forward" routerLink={'/share'}>
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
