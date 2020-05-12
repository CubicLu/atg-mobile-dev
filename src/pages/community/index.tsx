import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  Button,
  SectionTitle
} from './../../components';
import { ApplicationState } from './../../reducers';
import { getCommunityPostsAPI, getCommunityStoriesAPI } from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import { PostInterface, StorieInterface } from '../../interfaces';
import { Colors, ShapesSize } from '../../types';
import { RouteChildrenProps } from 'react-router';

interface StateProps {
  posts: PostInterface[];
  loading: boolean;
  stories: StorieInterface[];
}
interface DispatchProps {
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
}
interface Props extends StateProps, DispatchProps, RouteChildrenProps {}

class CommunityPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
    this.props.getCommunityStoriesAPI();
  }

  render(): React.ReactNode {
    const hist = this.props.history;
    return (
      <IonPage id="community-page">
        <BackgroundImage default={true} />
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

        <IonContent>
          <div className={'community-page mt-3 content'}>
            {this.props.stories.length > 0 && (
              <React.Fragment>
                <SectionTitle
                  title={'ARTIST COMMUNITIES'}
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
                <Button
                  type={ShapesSize.rounded}
                  color={Colors.transparentGray}
                  label={'Filter'}
                  onClick={(): void => hist.push('fan-feed-filter')}
                />
              </div>
            </div>

            {this.props.posts?.map(
              (data, i): React.ReactNode => {
                return <CardPost key={i} post={data} showUser={true} />;
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
  const loading = communityAPI.loading;
  return { posts, loading, stories };
};

export default connect(mapStateToProps, {
  getCommunityPostsAPI,
  getCommunityStoriesAPI
})(CommunityPage);
