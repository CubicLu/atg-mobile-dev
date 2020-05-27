import React from 'react';
import { connect } from 'react-redux';
import {
  CommentInterface,
  CommentCoverInterface,
  PostInterface
} from '../../../models';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  CardPost,
  PostComment,
  HeaderOverlay,
  InputChat
} from '../../../components';
import {
  getCommunityCommentsAPI,
  getCommunityCommentsCoverAPI
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { RouteComponentProps } from 'react-router';

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
    RouteComponentProps<MatchParams> {}
class CommunityPostPage extends React.Component<Props> {
  private hRef: React.RefObject<any> = React.createRef();
  componentDidMount(): void {
    this.props.getCommunityCommentsAPI(this.props.match.params.id);
    this.props.getCommunityCommentsCoverAPI(this.props.match.params.id);
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
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void => this.hRef.current?.handleParentScroll(e)}
        >
          <CardPost
            rounded={false}
            clickToOpen={false}
            post={this.getPost()}
            showUser={false}
            showOptions={false}
            disableComment={true}
          />

          {this.renderPostDescription()}
          {this.renderPostComments()}
        </IonContent>
        {this.renderPostInput()}
      </IonPage>
    );
  }
  getPost(): PostInterface {
    return {
      id: this.props.match.params.id || '1',
      username: '',
      artist: true,
      avatar: '',
      image: this.props.currentPostCover.url,
      comments: this.props.currentPostComments || [],
      commentsQuantity: this.props.currentPostComments?.length || 0
    };
  }
  renderPostDescription(): React.ReactNode {
    return (
      <div className={'f6 dark mb-1 mx-2'}>
        {this.props.currentPostCover.description}
      </div>
    );
  }
  renderPostComments(): React.ReactNode {
    return this.props.currentPostComments?.map(
      (data, i): React.ReactNode => <PostComment comment={data} key={i} />
    );
  }
  renderPostInput(): React.ReactNode {
    return <InputChat label={'Post'} placeholder={'Start a message'} />;
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
