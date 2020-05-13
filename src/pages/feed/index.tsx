import React from 'react';
import { BackgroundImage, Header, CardPost } from './../../components';
import { ApplicationState } from '../../reducers';
import {
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getFeedPostsAPI
} from '../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import { PostInterface, StorieInterface } from '../../models';
//import { ShapesSize, Colors } from '../../types';

interface StateProps {
  posts: PostInterface[];
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
  getFeedPostsAPI: () => void;
}
interface Props extends StateProps, DispatchProps {}

class FeedPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
    this.props.getFeedPostsAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="feed-page">
        <BackgroundImage default />
        <Header leftBackButton={true}>
          <div className="community ml-7 mt-45">
            <div className="h2 community">Community</div>
            <div className="f6 no-wrap">King of Pop</div>
          </div>
        </Header>

        <IonContent>
          <div className={'feed-page mt-3 content'}>
            <div className="row filter mx-3 flex">
              <div className="h1 p-0 letter-spacing-2 align-start my-auto">
                Fan Feed
              </div>
              <div className="align-end my-auto">
                {/* DISABLED FOR BETA */}
                {/* <Button
                  type={ShapesSize.rounded}
                  color={Colors.transparentGray}
                  label={'Filter'}
                  onClick={(): void => hist.push('fan-feed-filter')}
                /> */}
              </div>
            </div>

            {this.props.posts?.map(
              (data, i): React.ReactNode => (
                <CardPost
                  key={i}
                  post={data}
                  showUser={true}
                  clickToOpen={true}
                />
              )
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { posts, stories } = communityAPI;
  return { posts, stories };
};

export default connect(mapStateToProps, {
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getFeedPostsAPI
})(FeedPage);
