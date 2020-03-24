import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost
} from './../../components';
import { ApplicationState } from './../../reducers';
import { updateSettingsProperty, getCommunityPostsAPI } from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import { PostInterface } from '../../interfaces';

interface StateProps {
  isPlaying: boolean;
  posts: PostInterface[];
  loadingCommunity: boolean;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getCommunityPostsAPI: () => void;
}

interface Props extends StateProps, DispatchProps {}

class CommunityPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getCommunityPostsAPI();
  }
  render(): React.ReactNode {
    return (
      <IonPage id="community-page">
        <BackgroundImage
          gradient="180deg,#6A1EE4,#1e053b"
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.15}
          backgroundBottom
          backgroundBottomDark={false}
          bottomRotate={true}
          backgroundBottomOpacity={0.15}
        />
        <Header
          leftBackButton={false}
          leftContent={
            <div className="community">
              <h2 className="title community">Community</h2>
              <h1 className="subtitle community">Musical Goddess</h1>
            </div>
          }
          rightContent={
            <div className="default-button dark" onClick={(): void => {}}>
              <PlusIcon />
            </div>
          }
          rightActionButton={true}
        />
        <div
          className={
            `community-page content` + (this.props.isPlaying && ' is-playing')
          }
        >
          <IonContent>
            <SliderStories
              title={'ARTIST COMMUNITIES'}
              labelKey="name"
              imageKey="avatar"
              data={[
                {
                  name: 'Panthr COM',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Maia Davies',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'It’s Ok Now',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Panthr COM',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Maia Davies',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'It’s Ok Now',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                }
              ]}
            />

            {this.props.posts.map(
              (data, i): React.ReactNode => {
                return <CardPost key={i} post={data} />;
              }
            )}
          </IonContent>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  communityAPI
}: ApplicationState): StateProps => {
  const { isPlaying } = settings;
  const { posts } = communityAPI;
  const loadingCommunity = communityAPI.loading;
  return { isPlaying, posts, loadingCommunity };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  getCommunityPostsAPI
})(CommunityPage);
