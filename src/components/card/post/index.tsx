import React from 'react';
import {
  Avatar,
  ButtonIcon,
  BalloonIcon,
  ShareLineIcon,
  HeartIcon,
  DotsThreeIcon
} from './../../../components';
import { PostInterface, ShapesSize } from '../../../interfaces';
import { IonRouterLink } from '@ionic/react';

interface Props {
  post: PostInterface;
  showUser?: boolean;
  showOptions?: boolean;
}

export default class CardPostComponent extends React.Component<Props> {
  public static defaultProps = {
    showOptions: true
  };
  render(): React.ReactNode {
    const { post } = this.props;

    return (
      <div
        className="card post flex-column space-between"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="fluid flex-compass east">
          {this.props.showOptions && (
            <div className="mx-2 default-button dark btn large">
              <DotsThreeIcon />
            </div>
          )}
        </div>
        {this.renderPostInput()}
      </div>
    );
  }
  renderPostInput(): React.ReactNode {
    const { showUser, post } = this.props;
    return (
      <div className="mx-2 flex-align-items-center pb-1">
        {showUser && (
          <IonRouterLink
            routerDirection="forward"
            routerLink={`/community/artist/${post.username}`}
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
            routerLink={`/community/comments/${1}`}
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
