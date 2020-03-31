import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { Colors, CommentInterface, ShapesSize } from '../../../interfaces';
import { Avatar, DotsThreeIcon, ButtonIcon } from '../../../components';

interface Props {
  comment: CommentInterface;
}

class PostCommentsComponent extends React.Component<Props> {
  componentDidMount(): void {}

  render(): React.ReactNode {
    const { comment } = this.props;
    return (
      <div className={'post-commentary'}>
        <div className="row close-btn">
          <div className="col s6">
            <Avatar
              image={comment.user.avatar}
              type={ShapesSize.circle}
              width={48}
              height={48}
            />
          </div>
        </div>
        <div className={'post-commentary-text'}>
          <span className={'fan-username'}>{comment.user.name}</span>
          <span className={'fan-comment'}>{comment.text}</span>
          {comment.replies != null && (
            <a className={'reply-link'} href={'/#'}>
              {comment.replies} replies
            </a>
          )}
        </div>
        <ButtonIcon
          color={Colors.transparent}
          icon={<DotsThreeIcon color={'#6a6565'} />}
        />
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};
export default connect(mapStateToProps, {})(PostCommentsComponent);
