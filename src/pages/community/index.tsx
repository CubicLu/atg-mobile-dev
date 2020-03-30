import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  ButtonIcon,
  Button,
  ChatMessageIcon,
  SectionTitle
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
          titleClassName={`community-artist-name`}
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
          rightContent={
            <div className="default-button dark" onClick={(): void => {}}>
              <PlusIcon />
            </div>
          }
          rightActionButton={true}
        >
          <div className="community mx-3 mt-45">
            <div className="h2 community">Community</div>
            <div className="f6 no-wrap">Musical Goddess</div>
          </div>
        </Header>
      );
  }

  renderTitleAndFilterPosts(): React.ReactNode {
    return (
      <div className="row filter mx-3 fluid">
        <span className="h1 p-0 letter-spacing-2 align-start">
          {this.state.isArtist
            ? this.props.currentCommunityArtist?.name.toUpperCase()
            : 'MY'}{' '}
          COMMUNITY
        </span>
        <Button
          type={ShapesSize.rounded}
          color={Colors.transparentGray}
          label={'Filter'}
        />
      </div>
    );
  }

  renderJoinButton(): React.ReactNode {
    if (!this.state.joined && this.state.isArtist) {
      return (
        <div className="flex-justify-center">
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
    const { isArtist } = this.state;
    const { isPlaying } = this.props;
    return (
      <IonPage id="community-page">
        <BackgroundImage
          gradient={`180deg,${this.state.backgroundColor[0]},${this.state.backgroundColor[1]}`}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={isArtist ? 0.5 : 0.25}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.08}
        />
        {this.renderHeader()}
        <div
          className={`community-page content` + (isPlaying && ' is-playing')}
        >
          <IonContent>
            {this.renderJoinButton()}
            {this.props.stories.length > 0 && (
              <>
                <SectionTitle
                  title={isArtist ? 'DAILY DRIP' : 'ARTIST COMMUNITIES'}
                  viewAll={true}
                  className="mx-3"
                />
                <SliderStories
                  labelKey="label"
                  imageKey="image"
                  data={this.props.stories}
                />
              </>
            )}
            {this.renderTitleAndFilterPosts()}
            {this.props.posts.map(
              (data, i): React.ReactNode => {
                return <CardPost key={i} post={data} showUser={!isArtist} />;
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
