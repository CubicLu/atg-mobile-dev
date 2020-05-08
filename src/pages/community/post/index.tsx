import React from 'react';
import { connect } from 'react-redux';
import {
  CommentInterface,
  CommentCoverInterface,
  PostInterface,
  Sizes,
  Colors
} from '../../../interfaces';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  CardPost,
  PostComment,
  InputText,
  Button,
  HeaderOverlay
} from '../../../components';
import {
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { RouteChildrenProps } from 'react-router';

interface StateProps {
  currentPostComments: CommentInterface[] | null;
  currentPostCover: CommentCoverInterface;
}
interface DispatchProps {
  getCommunityCommentsAPI: (postId) => void;
  getCommunityCommentsCoverAPI: (postId) => void;
}
interface MatchParams {
  id: string;
}
interface Props
  extends DispatchProps,
    StateProps,
    RouteChildrenProps<MatchParams> {}
class CommunityPostPage extends React.Component<Props> {
  private hRef: React.RefObject<any> = React.createRef();
  componentDidMount(): void {
    this.props.getCommunityCommentsAPI(this.props.match?.params.id);
    this.props.getCommunityCommentsCoverAPI(this.props.match?.params.id);
  }
  render(): React.ReactNode {
    return (
      <IonPage style={{ background: '#fff' }} id="community-post">
        <Header
          leftBackButton={false}
          rightCloseButton={true}
          rightClickGoBack={true}
        />
        <HeaderOverlay ref={this.hRef} />
        <IonContent
          className={'post-comments'}
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void => this.hRef.current?.handleParentScroll(e)}
        >
          <div className="flex space-between h-100">
            <div className="scroll-post h-100">
              <CardPost
                post={this.getPost()}
                showUser={false}
                showOptions={false}
              />
              {this.renderPostDescription()}
              {this.renderPostComments()}
            </div>
          </div>
        </IonContent>
        {this.renderPostInput()}
      </IonPage>
    );
  }
  renderPostDescription(): React.ReactNode {
    return (
      <div className={'f6 dark mb-1 mx-2'}>
        GET THE MONEY - Cross The Line is the first song from Taylor Hawkins &
        The Coattail Riders new Album. Support Us and listen to the whole album.
      </div>
    );
  }
  renderPostComments(): React.ReactNode {
    return (
      <React.Fragment>
        {this.props.currentPostComments?.map(
          (data, i): React.ReactNode => (
            <PostComment comment={data} key={i} />
          )
        )}
      </React.Fragment>
    );
  }
  getPost(): PostInterface {
    return {
      username: '',
      avatar: '',
      image: this.props.currentPostCover.url,
      comments: this.props.currentPostComments || [],
      commentsQuantity: this.props.currentPostComments?.length || 0
    };
  }
  renderPostInput(): React.ReactNode {
    return (
      <div className="comment-input flex-align-items-center">
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
})(CommunityPostPage);
