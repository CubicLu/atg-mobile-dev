import React from 'react';
import { connect } from 'react-redux';
import {
  Colors,
  CommentCoverInterface,
  CommentInterface
} from '../../interfaces';
import { ApplicationState } from './../../reducers';
import { Button } from './../index';
import { PostText, PostComment, InputText, PostCover } from '../index';
import {
  updateSettingsProperty,
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
} from './../../actions';

interface StateProps {
  isPlaying: boolean;
  currentPostComments: CommentInterface[] | null;
  loading: boolean;
  currentPostCover: CommentCoverInterface;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getCommunityCommentsAPI: (postId) => void;
  getCommunityCommentsCoverAPI: (postId) => void;
}

interface Props extends DispatchProps, StateProps {
  id: string;
}

class ArtistPostComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.getCommunityCommentsAPI(this.props.id);
    this.props.getCommunityCommentsCoverAPI(this.props.id);
  }

  render(): React.ReactNode {
    const { currentPostComments } = this.props;
    const { currentPostCover } = this.props;
    return (
      <div>
        <PostCover cover={currentPostCover} />
        <PostText />
        {!!currentPostComments &&
          currentPostComments.map(
            (data, i): React.ReactNode => {
              return <PostComment comment={data} key={i} />;
            }
          )}
        <div className="comment-input">
          <InputText type={'text'} placeholder={'Start a message'} />
          <Button label="Post" color={Colors.grayTransparent} bold={true} />
        </div>
      </div>
    );
  }
}
// eslint-disable-next-line
const mapStateToProps = ({ settings, communityAPI}: ApplicationState): StateProps => {
  const { isPlaying } = settings;
  const { currentPostComments, loading, currentPostCover } = communityAPI;
  return {
    currentPostComments,
    isPlaying,
    loading,
    currentPostCover
  };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
})(ArtistPostComponent);
