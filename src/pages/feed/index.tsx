import React from 'react';
import { BackgroundImage, Header, CardPost, Button } from './../../components';
import { ApplicationState } from '../../reducers';
import { getCommunityPostsAPI, getCommunityStoriesAPI } from '../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import { PostInterface, StorieInterface } from '../../models';
import { ShapesSize, Colors } from '../../types';

interface StateProps {
  posts: PostInterface[];
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps {}

class FeedPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="feed-page">
        <BackgroundImage default />
        <Header
          fixed={false}
          leftContent={
            <div className="title-left-dual">
              <div className="h2 community">Community</div>
              <div className="f6 no-wrap">King of Pop</div>
            </div>
          }
        />

        <IonContent>
          <div className={'mt-3'} />
          <div className="row filter mx-3 flex">
            <div className="h1 p-0 letter-spacing-2 align-start my-auto">
              Fan Feed
            </div>
            <div className="align-end my-auto">
              <Button
                type={ShapesSize.filter}
                color={Colors.transparentGray}
                label="Filter"
                routerLink="/community/fan-feed-filter"
              />
            </div>
          </div>

          {this.props.posts?.map(
            (data, i): React.ReactNode => (
              <CardPost
                key={i}
                showUser={false}
                post={data}
                showOptions={false}
                clickToOpen={true}
              />
            )
          )}
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
  getCommunityStoriesAPI
})(FeedPage);
