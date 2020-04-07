import React from 'react';
import { CommentCoverInterface } from '../../../interfaces';
import {
  ButtonIcon,
  ShareLineIcon,
  BalloonIcon,
  HeartIcon,
  Header
} from '../../index';

interface Props {
  cover: CommentCoverInterface;
}

class PostCover extends React.Component<Props> {
  render(): React.ReactNode {
    const { cover } = this.props;
    return (
      <div
        className="post-cover"
        style={{
          backgroundImage: `linear-gradient(transparent, black), url(${cover.url})`
        }}
      >
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseHref="/community"
        />
        <div className="row button-container">
          <div className="action-btns row">
            <div className="col s6 cover-btns mx-1">
              <ButtonIcon icon={<ShareLineIcon />} />
              <ButtonIcon icon={<BalloonIcon />} label={3} />
              <ButtonIcon icon={<HeartIcon />} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PostCover;
