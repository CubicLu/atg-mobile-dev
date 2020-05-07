import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  VideoPlayer,
  ShareIcon,
  ButtonIcon,
  StarIcon,
  ChatMessageIcon,
  PhotoChat
} from '../../../components';
import { ArtistInterface, Colors, CommentInterface } from '../../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import {
  getArtistAPI,
  getArtistGalleryCommentsAPI,
  hideToastAction,
  showToastAction,
  updateSettingsProperty
} from '../../../actions';
import { shadowTitle } from '../../../utils';
import ToastComponent from '../../../components/toast';

interface StateProps {
  currentArtist: ArtistInterface | null;
  currentGalleryComments: CommentInterface[];
  showToast: boolean;
}
interface State {
  readonly chatOpened: boolean;
  readonly chatExpanded: boolean;
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  getArtistGalleryCommentsAPI: (videoId: number, username: string) => void;
  hideToastAction: () => void;
  showToastAction: () => void;
  updateSettingsProperty: (property: string, value: string) => void;
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
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = {
      chatOpened: false,
      chatExpanded: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  componentDidMount(): void {
    this.props.getArtistGalleryCommentsAPI(0, 'pharrell-williams');
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  bottomTiles(): React.ReactNode {
    return (
      <div className="bottom-tiles fluid">
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push(
              `/artist/${this.props.match.params.id}/deep-dive`
            );
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/happy.png'
          )}
        >
          <span className="f6">Deep Dive</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push(
              `/community/artist/${this.props.match.params.id}`
            );
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/gallery/untitled-folder-1/cover.png'
          )}
        >
          <span className="f6">Community</span>
        </div>
        <div
          className="tile"
          onClick={(): void => {
            this.props.history.push(
              `/artist/gateway/${this.props.match.params.id}`
            );
          }}
          style={shadowTitle(
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/album/number_one.png'
          )}
        >
          <span className="f6">Artist Home</span>
        </div>
      </div>
    );
  }

  setChat(condition = false): void {
    this.setState({ chatOpened: condition, chatExpanded: false });
  }
  expandChat(): void {
    this.setState({ chatExpanded: !this.state.chatExpanded });
  }

  toastClickHandler = (e): void => {
    const { updateSettingsProperty, history } = this.props;
    e.preventDefault();
    updateSettingsProperty('activeFanTab', 'vault');
    history.push('/profile');
  };

  renderButtons(): React.ReactNode {
    const { showToast } = this.props;
    return (
      <div className="flex-justify-content-center buttons">
        <ButtonIcon
          color={Colors.orange}
          icon={<StarIcon width={28} height={28} />}
          onClick={this.props.showToastAction}
        />
        <div className="mx-1" />
        <ButtonIcon color={Colors.green} icon={<ShareIcon />} />
        <div className="mx-1" />
        <ButtonIcon
          styles={{ position: 'relative' }}
          color={Colors.cyan}
          icon={<ChatMessageIcon />}
          onClick={(): void => this.setChat(!this.state.chatOpened)}
          overlay={50}
        />
        {showToast && (
          <ToastComponent
            clickId={'toastClick'}
            clickHandler={this.toastClickHandler}
            message={
              '<span>Added to your <a href="#" id="toastClick">VAULT</a></span>'
            }
            hideToast={hideToastAction}
            classNames={'custom-toast'}
          />
        )}
      </div>
    );
  }
  renderContent(): React.ReactNode {
    return (
      <>
        <div className="row mt-2 mb-3 mx-3">
          {this.renderButtons()}
          <p className="f3">Happy</p>
          <p className="f6">
            Williams provided vocals for French duo Daft Punk’s 2013 album
            Random Access Memories, on the songs “Lose Yourself to Dance” and
            “Get Lucky”. After returning from the recording sessions in Paris,
            he attended a meeting with record label managers who said that the
            results were “spectacular” and that “Get Lucky” would be Daft Punk’s
            next single.
          </p>
        </div>
      </>
    );
  }

  render(): React.ReactNode {
    if (!this.props.currentArtist) return <IonPage />;
    const {
      match: {
        params: { videoId }
      },
      currentArtist: { videos }
    } = this.props;
    const videoUrl = videos?.recents[videoId];
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
            onClickClose={(): void => this.props.history.goBack()}
            videoUrl={videoUrl.video}
          />
          {this.renderContent()}
          {!this.state.chatOpened && this.bottomTiles()}
        </IonContent>

        <PhotoChat
          displayChat={this.state.chatOpened}
          parentCallback={(): void => this.setChat(false)}
          currentPostComments={this.props.currentGalleryComments}
        />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, currentGalleryComments } = artistAPI;
  const { showToast } = settings;
  return { currentArtist, currentGalleryComments, showToast };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    getArtistGalleryCommentsAPI,
    hideToastAction,
    updateSettingsProperty,
    showToastAction
  })(ArtistVideoDetailPage)
);
