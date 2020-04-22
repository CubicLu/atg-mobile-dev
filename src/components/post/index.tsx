import React from 'react';
import { connect } from 'react-redux';
import {
  Colors,
  CommentCoverInterface,
  CommentInterface,
  Sizes
} from '../../interfaces';
import { ApplicationState } from '../../reducers';
import { Button } from './../index';
import { PostText, PostComment, InputText, PostCover } from '../index';
import {
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
} from '../../actions';

interface StateProps {
  currentPostComments: CommentInterface[] | null;
  currentPostCover: CommentCoverInterface;
}

interface DispatchProps {
  getCommunityCommentsAPI: (postId) => void;
  getCommunityCommentsCoverAPI: (postId) => void;
}

interface Props extends DispatchProps, StateProps {
  id: string;
}

class ArtistPostComponent extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityCommentsAPI(this.props.id);
    this.props.getCommunityCommentsCoverAPI(this.props.id);
  }
  render(): React.ReactNode {
    const { currentPostComments, currentPostCover } = this.props;
    return (
      <React.Fragment>
        <PostCover cover={currentPostCover} />
        <PostText className="mx-2 mb-1" />

        {currentPostComments?.map(
          (data, i): React.ReactNode => (
            <PostComment comment={data} key={i} />
          )
        )}

        <div className="comment-input fluid flex-align-items-center">
          <InputText
            size={Sizes.sm}
            className="f7 dark"
            type={'text'}
            placeholder={'Start a message'}
          />
          <span className="mb-1">
            <Button label="Post" color={Colors.grayTransparent} bold={true} />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { currentPostComments, currentPostCover } = communityAPI;
  return {
    currentPostComments,
    currentPostCover
  };
};

export default connect(mapStateToProps, {
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
})(ArtistPostComponent);
