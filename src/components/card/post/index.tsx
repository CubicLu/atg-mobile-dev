import React from 'react';
import { Avatar, ButtonIcon } from './../../../components';
import { PostInterface, ShapesSize } from '../../../interfaces';
import { ShareIcon } from '../../icon';

interface Props {
  post: PostInterface;
}

class CardPostComponent extends React.Component<Props> {
  render(): React.ReactNode {
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
              <div className="col s6 user">
                <Avatar
                  image={this.props.post.avatar}
                  type={ShapesSize.circle}
                  width={42}
                  height={42}
                />
                <label>{this.props.post.username} </label>
              </div>
              <div className="col s6 button">
                <ButtonIcon icon={<ShareIcon />} />
                <ButtonIcon
                  icon={<ShareIcon />}
                  label={this.props.post.commentsQuantity}
                />
                <ButtonIcon icon={<ShareIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardPostComponent;
