import React from 'react';
import {
  Avatar,
  ButtonIcon,
  BalloonIcon,
  ShareLineIcon,
  HeartIcon,
  DotsThreeIcon
} from './../../../components';
import { PostInterface } from '../../../interfaces';
import { ShapesSize } from '../../../types';
import { IonRouterLink, IonSlides, IonSlide } from '@ionic/react';

interface Props {
  post: PostInterface;
  showUser?: boolean;
  showOptions?: boolean;
  disableComment: boolean;
  className?: string;
}

export default class CardPostComponent extends React.Component<Props> {
  public static defaultProps = {
    showOptions: true,
    disableComment: false
  };

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  render(): React.ReactNode {
    const { post } = this.props;
    const className = this.props.className || '';
    return (
      <div
        className={`card post flex-column space-between overflow-x ${className}`}
        style={{
          height: '290px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div>
          {Array.isArray(post.image) ? (
            <IonSlides
              pager={true}
              options={this.slideOpts}
              style={{
                height: '290px',
                position: 'relative',
                borderRadius: '20px'
              }}
            >
              {post.image.map(
                (image, index): React.ReactNode => (
                  <IonSlide
                    key={index}
                    className={'flex-compass space-between'}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: 'auto'
                    }}
                  />
                )
              )}
            </IonSlides>
          ) : (
            <div
              className="post flex-column space-between"
              style={{
                height: '290px',
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px'
              }}
            />
          )}
          {this.renderControls()}
        </div>
      </div>
    );
  }

  renderControls(): React.ReactNode {
    return (
      <>
        <div className="absolute-dots-top-right">
          {this.props.showOptions && (
            <div className="default-button dark btn large">
              <DotsThreeIcon />
            </div>
          )}
        </div>
        {this.renderPostInput()}
      </>
    );
  }

  renderPostInput(): React.ReactNode {
    const { showUser, post } = this.props;
    return (
      <div className="mx-2 flex-align-items-center pb-2 absolute-community-interactions">
        {showUser && (
          <IonRouterLink
            routerDirection="forward"
            routerLink={
              post.artist
                ? `/artist/${post.username}`
                : `/profile/${post.username}`
            }
          >
            <div className="align-start flex">
              <Avatar
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
}
