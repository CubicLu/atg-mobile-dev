import React from 'react';
import {
  Avatar,
  ButtonIcon,
  BalloonIcon,
  ShareLineIcon,
  HeartIcon
} from './../../../components';
import { PostInterface, ShapesSize } from '../../../interfaces';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  post: PostInterface;
  showUser?: boolean;
}

class CardPostComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { history } = this.props;

    return (
      <div
        className="card post"
        style={{
          backgroundImage: `url(${this.props.post.image})`
        }}
      >
        <div className="row info">
          <div className="col s12">
            <div className="row">
              <div
                className="col s6 user"
                onClick={(): void => {
                  if (this.props.showUser)
                    this.props.history.push(
                      `/community/${this.props.post.username}`
                    );
                }}
              >
                {this.props.showUser && (
                  <>
                    <Avatar
                      image={this.props.post.avatar}
                      type={ShapesSize.circle}
                      width={42}
                      height={42}
                    />
                    <label className="text-12 my-auto">
                      {this.props.post.username}
                    </label>
                  </>
                )}
              </div>
              <div className="col s6 button">
                <ButtonIcon icon={<ShareLineIcon />} />
                <ButtonIcon
                  icon={<BalloonIcon />}
                  label={this.props.post.commentsQuantity}
                  onClick={(): void => {
                    history.push(`/community/comments/${1}`);
                  }}
                />
                <ButtonIcon icon={<HeartIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CardPostComponent);
