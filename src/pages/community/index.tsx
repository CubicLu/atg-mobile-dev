import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  Button,
  SectionTitle,
  ContentLoader
} from './../../components';
import { ApplicationState } from './../../reducers';
import { getCommunityPostsAPI, getCommunityStoriesAPI } from './../../actions';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import { PostInterface, StorieInterface } from '../../models';
import { Colors, ShapesSize } from '../../types';
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

  renderSkeleton(): React.ReactNode {
    return (
      <IonPage id="community-page">
        <BackgroundImage default={true} />(
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
      </IonPage>
    );
  }
  render(): React.ReactNode {
    if (!this.isReady) this.displayContent();
    if (!this.isReady) return this.renderSkeleton();

    return (
      <IonPage id="community-page">
        <BackgroundImage default={true} />
        <Header
          fixed={false}
          leftContent={
            <div className="title-left-dual">
              <div className="h2 community">Community</div>
              <div className="f6 no-wrap">Musical Goddess</div>
            </div>
          }
          rightContent={
            <IonRouterLink routerLink="/community/post">
              <div className="default-button dark">
                <PlusIcon />
              </div>
            </IonRouterLink>
          }
        />

        <IonContent>
          <div className={'mt-3'} />
          {this.props.stories.length > 0 && (
            <React.Fragment>
              <SectionTitle
                title="ARTIST COMMUNITIES"
                viewAll={true}
                className="mt-1 mx-3"
                viewAllUrl="/community/artist"
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
              <Button
                type={ShapesSize.filter}
                color={Colors.transparentGray}
                label="Filter"
                routerLink="/community/fan-feed-filter"
              />
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
