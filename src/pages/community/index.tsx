import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  //Button,
  SectionTitle,
  ContentLoader
} from './../../components';
import { ApplicationState } from './../../reducers';
import { getCommunityPostsAPI, getCommunityStoriesAPI } from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import { PostInterface, StorieInterface } from '../../models';
//import { Colors, ShapesSize } from '../../types';
import { RouteChildrenProps } from 'react-router';

interface StateProps {
  posts: PostInterface[];
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteChildrenProps {}

class CommunityPage extends React.Component<Props> {
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
  };

  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();

    const hist = this.props.history;
    return (
      <IonPage id="community-page">
        <BackgroundImage default={true} />
        {!this.isReady ? (
          <ContentLoader
            className="mt-3"
            speed={2}
            viewBox="0 0 400 100"
            baseUrl={window.location.pathname}
            backgroundColor="rgb(255,255,255)"
            foregroundColor="rgb(255,255,255)"
            backgroundOpacity={0.05}
            foregroundOpacity={0.15}
          >
            <rect x="20" y="20" width="110" height="30" />
            <rect x="20" y="60" width="140" height="20" />
          </ContentLoader>
        ) : (
          <Header
            leftBackButton={false}
            rightActionButton={false}
            rightContent={
              <div
                className="default-button dark"
                onClick={(): void => hist.push('/community/post')}
              >
                <PlusIcon />
              </div>
            }
          >
            <div className="community mx-3 mt-45">
              <div className="h2 community">Community</div>
              <div className="f6 no-wrap">Musical Goddess</div>
            </div>
          </Header>
        )}
        <IonContent>
          <div className={'community-page mt-3 content'}>
            {this.props.stories.length > 0 && (
              <React.Fragment>
                <SectionTitle
                  title="EXCLUSIVES"
                  viewAll={true}
                  className="mt-1 mx-3"
                  onClickAll={(): void => hist.push('/community/artist')}
                />
                <SliderStories
                  labelKey="label"
                  imageKey="image"
                  data={this.props.stories}
                />
              </React.Fragment>
            )}

            <div className="row filter mx-3 flex">
              <div className="h1 p-0 letter-spacing-2 align-start my-auto">
                MY COMMUNITY
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
              (data, i): React.ReactNode => {
                return (
                  <CardPost
                    clickToOpen={true}
                    key={i}
                    post={data}
                    showUser={true}
                    showOptions={false}
                  />
                );
              }
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
  getCommunityStoriesAPI
})(CommunityPage);
