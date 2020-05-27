import React from 'react';
import {
  BackgroundImage,
  Header,
  CardPost,
  Button,
  SectionTitle,
  Avatar
} from './../../components';
import { ApplicationState } from './../../reducers';
import { getCommunityPostsAPI, getCommunityStoriesAPI } from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import { PostInterface, StorieInterface } from '../../models';
import { Colors, ShapesSize } from '../../types';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  posts: PostInterface[];
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class CommunityPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-page">
        <Header
          leftBackButton={false}
          fixed={false}
          className="minimum-height"
          leftContent={
            <div className="title-left-dual">
              <div className="h2 community">Community</div>
              <div className="f6 no-wrap">Musical Goddess</div>
            </div>
          }
          rightContent={
            <div
              onClick={(): void => this.props.history.push('/community/post')}
              className="default-button dark"
            >
              <PlusIcon />
            </div>
          }
        />

        <BackgroundImage default={true} />
        <IonContent>
          <div className={'mt-3'} />
          {this.renderArtistCommunities()}

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
  renderArtistCommunities(): React.ReactNode {
    if (this.props.stories.length === 0) return null;
    return (
      <React.Fragment>
        <SectionTitle
          title="ARTIST COMMUNITIES"
          viewAll={true}
          className="mt-1 mx-3"
          viewAllUrl="/community/artist"
        />
        <ul className="list inline ml-3 pb-3">
          {this.props.stories?.map(
            (d, i): React.ReactNode => (
              <li key={i} className="text-center pr-2">
                <Avatar
                  image={d.image}
                  type={ShapesSize.circle}
                  width={110}
                  height={110}
                  avatarUrl={d.url}
                />
                <label className="f6">{d.label}</label>
              </li>
            )
          )}
        </ul>
      </React.Fragment>
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
