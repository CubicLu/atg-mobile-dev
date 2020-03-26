import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  ButtonIcon,
  Button,
  ChatMessageIcon
} from './../../components';
import { ApplicationState } from './../../reducers';
import {
  updateSettingsProperty,
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getCommunityByArtistUsernameAPI,
  updateCommunitySetInitialProperty
} from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';
import {
  PostInterface,
  ShapesSize,
  Colors,
  StorieInterface,
  CommunityArtistInterface
} from '../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';

interface MatchParams {
  artistId: string;
}
interface StateProps {
  isPlaying: boolean;
  posts: PostInterface[];
  loadingCommunity: boolean;
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
  getCommunityPostsAPI: () => void;
  getCommunityByArtistUsernameAPI: (username: string) => void;
  getCommunityStoriesAPI: () => void;
  updateCommunitySetInitialProperty: (property: string) => void;
}

interface State {
  backgroundColor: string[];
  joined: boolean;
  isArtist: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class CommunityPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      backgroundColor: ['#6A1EE4', '#1e053b'],
      joined: false,
      isArtist: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.artistId !== undefined &&
      nextProps.currentCommunityArtist === null
    ) {
      this.setBackgroundArtist();
      if (
        nextProps.match.params.artistId !==
          this.props.currentCommunityArtist?.username ||
        nextProps.match.params.artistId !== this.props.match.params.artistId ||
        (nextProps.currentCommunityArtist == null &&
          nextProps.match.params.artistId !== undefined)
      ) {
        this.props.getCommunityByArtistUsernameAPI(
          nextProps.match.params.artistId
        );
      }
    }
  }

  componentDidMount(): void {
    if (this.props.match.params.artistId !== undefined) {
      this.setBackgroundArtist();
      this.props.getCommunityByArtistUsernameAPI(
        this.props.match.params.artistId
      );
    } else {
      this.props.getCommunityPostsAPI();
      this.props.getCommunityStoriesAPI();
      this.props.updateCommunitySetInitialProperty('currentArtistCommunity');
    }
  }

  setBackgroundArtist(defaultBackground = ['#230541', '#180727']): void {
    this.setState({
      backgroundColor: defaultBackground,
      isArtist: true
    });
  }

  renderHeader(): React.ReactNode {
    if (this.state.isArtist) {
      return (
        <Header
          leftBackOnClick={(): void => {
            this.props.getCommunityPostsAPI();
            this.props.getCommunityStoriesAPI();
            this.props.updateCommunitySetInitialProperty(
              'currentArtistCommunity'
            );
            this.props.history.goBack();
          }}
          leftBackButton={true}
          title={this.props.currentCommunityArtist?.fullname}
          titleClassName={`artist-name`}
          rightActionButton={this.state.joined ? false : true}
          rightContent={
            this.state.joined && (
              <ButtonIcon
                styles={{ width: 36, height: 36 }}
                type={ShapesSize.circle}
                color={Colors.support}
                icon={<ChatMessageIcon />}
              />
            )
          }
        />
      );
    } else
      return (
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
      );
  }

  renderTitleAndFilterPosts(): React.ReactNode {
    return (
      <div className="row filter">
        <div className="col s9">
          <h1 className="title">
            {this.state.isArtist
              ? this.props.currentCommunityArtist?.name.toUpperCase()
              : 'MY'}{' '}
            COMMUNITY
          </h1>
        </div>
        <div className="col s3 justify-content-end">
          <Button
            type={ShapesSize.rounded}
            color={Colors.transparentGray}
            label={'Filter'}
          />
        </div>
      </div>
    );
  }

  renderJoinButton(): React.ReactNode {
    if (!this.state.joined && this.state.isArtist) {
      return (
        <div className="justify-center">
          <ButtonIcon
            color={Colors.support}
            type={ShapesSize.rounded}
            icon={<ChatMessageIcon height={12} />}
            label={' Join Chat'}
            onClick={(): void => this.setState({ joined: true })}
          />
        </div>
      );
    }
    return null;
  }

  render(): React.ReactNode {
    return (
      <IonPage id="community-page">
        <BackgroundImage
          gradient={`180deg,${this.state.backgroundColor[0]},${this.state.backgroundColor[1]}`}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.15}
          backgroundBottom
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.4}
        />
        {this.renderHeader()}
        <div
          className={
            `community-page content` + (this.props.isPlaying && ' is-playing')
          }
        >
          <IonContent>
            {this.renderJoinButton()}
            {this.props.stories.length > 0 && (
              <SliderStories
                title={
                  this.state.isArtist ? 'DAILY DRIP' : 'ARTIST COMMUNITIES'
                }
                labelKey="label"
                imageKey="image"
                data={this.props.stories}
              />
            )}
            {this.renderTitleAndFilterPosts()}
            {this.props.posts.map(
              (data, i): React.ReactNode => {
                return (
                  <CardPost
                    key={i}
                    post={data}
                    showUser={!this.state.isArtist}
                  />
                );
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
  const { posts, stories, currentCommunityArtist } = communityAPI;
  const loadingCommunity = communityAPI.loading;
  return {
    isPlaying,
    posts,
    loadingCommunity,
    stories,
    currentCommunityArtist
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty,
    getCommunityPostsAPI,
    getCommunityByArtistUsernameAPI,
    getCommunityStoriesAPI,
    updateCommunitySetInitialProperty
  })(CommunityPage)
);
