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
      <>
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseHref="/community"
        />
        <div
          className="card post"
          style={{
            backgroundImage: `linear-gradient(transparent, black), url(${cover.url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="h-100 flex-compass p-2 south east button-container action-btns">
            <div className="flex">
              <ButtonIcon icon={<ShareLineIcon />} />
              <ButtonIcon icon={<BalloonIcon />} label={3} />
              <ButtonIcon icon={<HeartIcon />} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PostCover;
