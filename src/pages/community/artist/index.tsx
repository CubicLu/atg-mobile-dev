import React from 'react';
import {
  BackgroundImage,
  Header,
  SliderStories,
  CardPost,
  ButtonIcon,
  Button,
  ChatMessageIcon,
  SectionTitle,
  HeaderOverlay
} from './../../../components';
import { ApplicationState } from './../../../reducers';
import {
  getCommunityPostsAPI,
  getCommunityStoriesAPI,
  getCommunityByArtistUsernameAPI
} from './../../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import {
  ShapesSize,
  Colors
} from '../../../types';
import {
  PostInterface,
  StorieInterface,
  CommunityArtistInterface
} from '../../../interfaces';
import { RouteChildrenProps } from 'react-router-dom';
interface MatchParams {
  artistId: string;
}
interface StateProps {
  posts: PostInterface[];
  loading: boolean;
  stories: StorieInterface[];
  currentCommunityArtist: CommunityArtistInterface | null;
}
interface DispatchProps {
  getCommunityByArtistUsernameAPI: (username: string) => void;
  getCommunityPostsAPI: () => void;
  getCommunityStoriesAPI: () => void;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteChildrenProps<MatchParams> {}
interface State {
  joined: boolean;
}

class CommunityArtistPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = { joined: false };
  }
  componentDidMount(): void {
    this.loadPostsAndStories(this.props.match!.params);
  }
  UNSAFE_componentWillReceiveProps(nProps: Props): void {
    nProps.match!.params.artistId !== this.props.match?.params.artistId &&
      !nProps.loading &&
      this.loadPostsAndStories(nProps.match!.params!);
  }

  loadPostsAndStories(p: MatchParams): void {
    if (p.artistId) {
      this.props.getCommunityByArtistUsernameAPI(p.artistId);
    } else {
      this.props.getCommunityPostsAPI();
      this.props.getCommunityStoriesAPI();
    }
  }

  renderTitleAndFilterPosts(): React.ReactNode {
    return (
      <div className="row filter mx-3 flex">
        <div className="h1 p-0 letter-spacing-2 align-start my-auto">
          {this.props.currentCommunityArtist?.name.toUpperCase()}
        </div>
        <div className="align-end my-auto">
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
    return (
      <div className="flex-justify-content-center mb-2">
        <ButtonIcon
          color={Colors.support}
          type={ShapesSize.rounded}
          icon={<ChatMessageIcon />}
          label={'\u00A0 JOIN CHAT'}
          onClick={(): void => this.setState({ joined: true })}
        />
      </div>
    );
  }

  render(): React.ReactNode {
    const { joined } = this.state;
    const { currentCommunityArtist } = this.props;
    let color1 =
      currentCommunityArtist?.backgroundGradient !== null
        ? currentCommunityArtist?.backgroundGradient.color1
        : '';
    let color2 =
      currentCommunityArtist?.backgroundGradient !== null
        ? currentCommunityArtist?.backgroundGradient.color1
        : '';
    return (
      <IonPage id="community-page">
        <BackgroundImage
          gradient={`180deg,${color1},${color2}`}
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.5}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOpacity={0.08}
          default={currentCommunityArtist?.backgroundGradient === null}
        />

        <Header
          leftBackOnClick={(): void => this.props.history.push('/community')}
          leftBackButton={true}
          title={this.props.currentCommunityArtist?.fullname}
          titleClassName={'community-artist-name'}
          rightActionButton={false}
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
        >
          <div className="community m-4">&nbsp;</div>
        </Header>
        <IonContent
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <HeaderOverlay ref={this.headerRef} />
          <div className={'community-page mt-3 content'}>
            {!joined && this.renderJoinButton()}

            {this.props.stories.length > 0 && (
              <React.Fragment>
                <SectionTitle
                  title={'DAILY DRIP'}
                  viewAll={true}
                  className="mt-1 mx-3"
                  onClickAll={(): void => {
                    this.props.history.push('/community/artist');
                  }}
                />
                <SliderStories
                  labelKey="label"
                  imageKey="image"
                  data={this.props.stories}
                  onPressItem={(id): void =>
                    this.props.history.push(
                      `/community/artist/${this.props.match?.params.artistId}/daily-drip/${id}`
                    )
                  }
                />
              </React.Fragment>
            )}

            {this.renderTitleAndFilterPosts()}

            {this.props.posts?.map(
              (data, i): React.ReactNode => (
                <CardPost key={i} post={data} showUser={false} />
              )
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ communityAPI }: ApplicationState): StateProps => {
  const { posts, stories, currentCommunityArtist } = communityAPI;
  const { loading } = communityAPI;
  return {
    posts,
    loading,
    stories,
    currentCommunityArtist
  };
};

export default connect(mapStateToProps, {
  getCommunityPostsAPI,
  getCommunityByArtistUsernameAPI,
  getCommunityStoriesAPI
})(CommunityArtistPage);
