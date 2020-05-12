import React from 'react';
import { CommentInterface } from '../../../models';
import { ShapesSize } from '../../../types';
import { Avatar, DotsThreeIcon } from '../../../components';

interface Props {
  comment: CommentInterface;
}

export default class PostCommentsComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { comment } = this.props;
    return (
      <div className="mx-2 flex">
        <Avatar
          image={comment.user.avatar}
          type={ShapesSize.circle}
          width={48}
          height={48}
        />

        <div className={'mx-1 f5 fluid flex-column mb-2'}>
          <span className={'f7 gray'}>{comment.user.username}</span>
          <span className={'f6 dark mb-1'}>{comment.text}</span>
          {comment.replies && (
            <a className={'f7 bold reply'}>{comment.replies} replies</a>
          )}
        </div>

        <div>
          <DotsThreeIcon color={'#6a6565'} />
        </div>
      </div>
    );
  }
}
