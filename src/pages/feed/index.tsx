import React from 'react';
import { BackgroundImage, Header, CardPost, Button } from './../../components';
import { ApplicationState } from '../../reducers';
import {
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getFeedPostsAPI
} from '../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import { PostInterface, StorieInterface } from '../../interfaces';
import { ShapesSize, Colors } from '../../types';
import { RouteChildrenProps } from 'react-router';

interface StateProps {
  posts: PostInterface[];
  loading: boolean;
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
  getFeedPostsAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteChildrenProps {}

class FeedPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
    this.props.getFeedPostsAPI();
  }

  render(): React.ReactNode {
    const colors = ['#6A1EE4', '#1e053b'];
    const hist = this.props.history;
    return (
      <IonPage id="feed-page">
        <BackgroundImage
          gradient={`180deg,${colors[0]},${colors[1]}`}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.25}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.08}
        />
        <Header leftBackButton={false}>
          <div className="feed mx-3 mt-45">
            <div className="h2 feed ">Social feed</div>
          </div>
        </Header>

        <IonContent>
          <div className={'feed-page mt-3 content'}>
            <div className="row filter mx-3 flex">
              <div className="h1 p-0 letter-spacing-2 align-start my-auto">
                Amanda&apos;s feed
              </div>
              <div className="align-end my-auto">
                <Button
                  type={ShapesSize.rounded}
                  color={Colors.transparentGray}
                  label={'Filter'}
                  onClick={(): void => hist.push('fan-feed-filter')}
                />
              </div>
            </div>

            {this.props.posts?.map(
              (data, i): React.ReactNode => (
                <CardPost key={i} post={data} showUser={true} />
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
  const loading = communityAPI.loading;
  return { posts, loading, stories };
};

export default connect(mapStateToProps, {
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getFeedPostsAPI
})(FeedPage);
