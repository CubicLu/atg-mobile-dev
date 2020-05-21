import React from 'react';
import { IonPage, IonContent, NavContext, NavContextState } from '@ionic/react';
import {
  BackgroundImage,
  VideoPlayer,
  ShareIcon,
  ButtonIcon,
  ChatMessageIcon,
  PhotoChat,
  OutlinedButton,
  ContentLoader,
  FavoriteIcon
} from '../../../components';
import {
  ArtistInterface,
  CommentInterface,
  ActionSheetInterface
} from '../../../models';
import { Colors, Nullable } from '../../../types';
import { RouteComponentProps, withRouter } from 'react-router';

import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import BottomTilesComponent from '../../../components/bottom-tiles';
import {
  getArtistAPI,
  getArtistGalleryCommentsAPI,
  updateSettingsProperty,
  updateSettingsModal,
  updateSettingsModalClassName,
  updateActionSheet
} from '../../../actions';

interface StateProps {
  currentArtist: ArtistInterface | null;
  currentGalleryComments: CommentInterface[];
  playing: boolean;
}
interface State {
  readonly chatOpened: boolean;
  readonly chatExpanded: boolean;
  readonly orientation: Nullable<string>;
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateActionSheet: (property: ActionSheetInterface) => void;
  getArtistGalleryCommentsAPI: (videoId: number, username: string) => void;
  updateSettingsProperty: (property: string, value: string) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number,
    onClick?: Function,
    wrapperClassName?: string
  ) => void;
  updateSettingsModalClassName: (wrapperClassName: string) => void;
}
interface MatchParams {
  id: string;
  videoId: string;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistVideoDetailPage extends React.Component<Props, State> {
  static contextType = NavContext;
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = {
      chatOpened: false,
      chatExpanded: false,
      orientation: null
    };
  }

  componentDidMount(): void {
    this.props.getArtistGalleryCommentsAPI(0, 'pharrell-williams');
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
    if (this.props.currentArtist?.username !== this.props.match.params.id) {
      this.props.getArtistGalleryCommentsAPI(0, 'pharrell-williams');
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.playing && !this.props.playing) {
      this.props.updateSettingsModalClassName('vertical-video-modal-container');
    }

    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.currentArtist?.username !== this.props.match.params.id
    ) {
      this.props.getArtistGalleryCommentsAPI(0, 'pharrell-williams');
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  setChat(condition = false): void {
    this.setState({ chatOpened: condition, chatExpanded: false });
  }
  expandChat(): void {
    this.setState({ chatExpanded: !this.state.chatExpanded });
  }
  confirmShare(): void {
    this.props.updateActionSheet({
      title: 'Share',
      confirmButtons: false,
      shareOption: true
    });
  }
  renderButtons(): React.ReactNode {
    const isPortrait = this.state.orientation === 'portrait';
    return (
      <div
        className={`${
          isPortrait
            ? 'flex-align-items-baseline buttons vertical-video-buttons'
            : 'flex-justify-content-center'
        }`}
      >
        <FavoriteIcon />
        <div className="mx-1" />

        <ButtonIcon
          onClick={(): void => this.confirmShare()}
          color={Colors.green}
          icon={<ShareIcon />}
        />

        <div className="mx-1" />
        <ButtonIcon
          styles={{ position: 'relative' }}
          color={Colors.cyan}
          icon={<ChatMessageIcon />}
          onClick={(): void => this.setChat(!this.state.chatOpened)}
          overlay={50}
        />

        {isPortrait && (
          <OutlinedButton
            onClick={(): void =>
              this.props.updateSettingsModal(
                <>
                  <div className="vertical-video-modal-content">
                    {this.renderVideoInfo()}
                  </div>
                  <BottomTilesComponent
                    tiles={this.props.currentArtist?.tiles}
                    onClick={(): void => this.props.updateSettingsModal(null)}
                  />
                </>,
                undefined,
                undefined,
                undefined,
                `${
                  this.props.playing
                    ? 'sliding-panel-with-player-container'
                    : 'vertical-video-modal-container'
                }`
              )
            }
            style={{ marginLeft: 'auto' }}
            text={'More'}
          />
        )}
      </div>
    );
  }

  renderVideoInfo(): React.ReactNode {
    return (
      <>
        <p className="f3">Happy</p>
        <p className="f6">
          Williams provided vocals for French duo Daft Punk’s 2013 album Random
          Access Memories, on the songs “Lose Yourself to Dance” and “Get
          Lucky”. After returning from the recording sessions in Paris, he
          attended a meeting with record label managers who said that the
          results were “spectacular” and that “Get Lucky” would be Daft Punk’s
          next single.
        </p>
      </>
    );
  }

  renderContent(): React.ReactNode {
    const isPortrait = this.state.orientation === 'portrait';
    return (
      <div className={'row mt-2 mb-3 mx-3'}>
        {this.renderButtons()}
        {!isPortrait && this.renderVideoInfo()}
      </div>
    );
  }

  changeVideoOrientation = (value: string): void => {
    this.setState((prevState): State => ({ ...prevState, orientation: value }));
  };

  renderSkeleton(): React.ReactNode {
    return (
      <ContentLoader
        className="mt-3 px-1"
        speed={2}
        width={370}
        height={800}
        viewBox="0 0 370 800"
        baseUrl={window.location.pathname}
        backgroundColor="rgb(255,255,255)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.05}
        foregroundOpacity={0.15}
      >
        <rect x="-13" y="492" rx="3" ry="3" width="431" height="6" />
        <rect x="0" y="512" rx="3" ry="3" width="423" height="6" />
        <rect x="-34" y="531" rx="3" ry="3" width="453" height="7" />
        <rect x="-6" y="472" rx="3" ry="3" width="426" height="6" />
        <rect x="1" y="63" rx="0" ry="0" width="406" height="343" />
        <rect x="6" y="594" rx="0" ry="0" width="104" height="104" />
        <rect x="126" y="594" rx="0" ry="0" width="113" height="104" />
        <rect x="254" y="592" rx="0" ry="0" width="108" height="105" />
      </ContentLoader>
    );
  }

  goBackClick = (ev): void => {
    ev?.preventDefault();
    (this.context as NavContextState).goBack();
  };

  render(): React.ReactNode {
    if (!this.props.currentArtist) return <div />;
    const {
      match: {
        params: { videoId }
      },
      currentArtist: { videos }
    } = this.props;
    const { orientation } = this.state;
    const videoUrl =
      videos?.recents[videoId] ||
      (videos?.showcase && videos?.showcase[videoId]?.video);
    const isPortrait = orientation === 'portrait';
    return (
      <IonPage id="artist-videos-page">
        <BackgroundImage default />
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="mt-5" />
          <VideoPlayer
            onClickClose={this.goBackClick}
            videoUrl={videoUrl?.video || videoUrl}
            changeVideoOrientation={this.changeVideoOrientation}
            isPortrait={isPortrait}
          />
          {this.renderContent()}
          {!this.state.chatOpened && !isPortrait && (
            <BottomTilesComponent tiles={this.props.currentArtist?.tiles} />
          )}
          {!orientation && (
            <div className="video-detail-overlay">{this.renderSkeleton()}</div>
          )}
        </IonContent>

        <PhotoChat
          displayChat={this.state.chatOpened}
          parentCallback={(): void => this.setChat(false)}
          currentPostComments={this.props.currentGalleryComments}
          className={'vertical-video-chat'}
        />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  player
}: ApplicationState): StateProps => {
  const { currentArtist, currentGalleryComments } = artistAPI;
  const { playing } = player;
  return { currentArtist, currentGalleryComments, playing };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    getArtistGalleryCommentsAPI,
    updateSettingsProperty,
    updateSettingsModal,
    updateSettingsModalClassName,
    updateActionSheet
  })(ArtistVideoDetailPage)
);
