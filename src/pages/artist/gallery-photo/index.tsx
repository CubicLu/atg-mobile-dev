import React from 'react';
import {
  ButtonIcon,
  FullscreenIcon,
  Header,
  PhotoChat
} from './../../../components';
import {
  IonContent,
  IonPage,
  IonImg,
  Gesture,
  GestureConfig
} from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  getArtistAPI,
  updateSettingsProperty,
  getArtistGalleryCommentsAPI,
  setCurrentGallery,
  updateSettingsModal,
  setFullscreenImage,
  clearFullscreenImage
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import {
  ArtistInterface,
  CommentInterface,
  ShapesSize,
  GalleryImageInterface
} from '../../../interfaces';
import { validateScrollHeader } from '../../../utils';
import FullScreenImageModal from '../../../components/modal/image-gallery';
import { createGesture } from '@ionic/react';

interface State {
  displayChat: boolean;
  displayHeader: boolean;
  currentGalleryComments: number;
  gestureSet: boolean;
}

interface StateProps {
  currentArtist: ArtistInterface | null;
  currentGalleryComments: CommentInterface[];
  currentGallery: GalleryImageInterface[] | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  getArtistGalleryCommentsAPI: (photoId: number, username: string) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number
  ) => void;
  setCurrentGallery: (galleryId: number) => void;
  setFullscreenImage: (index: number) => void;
  clearFullscreenImage: () => void;
}

interface MatchParams {
  id: string;
  galleryId: string;
  imageId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPhotoPage extends React.Component<Props, State> {
  private image: React.RefObject<HTMLDivElement>;
  swipeGesture: Gesture | undefined;
  constructor(props: Props) {
    super(props);
    this.state = {
      displayChat: false,
      displayHeader: true,
      currentGalleryComments: 10,
      gestureSet: false
    };
    this.image = React.createRef();
  }
  private DOUBLE_CLICK_THRESHOLD = 500;
  private lastOnStart = 0;

  onStart = (): void => {
    const now = Date.now();
    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.showFullScreenModal();
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  componentDidMount(): void {
    const {
      getArtistGalleryCommentsAPI,
      currentArtist,
      getArtistAPI,
      match,
      currentGallery,
      setCurrentGallery
    } = this.props;
    getArtistGalleryCommentsAPI(0, 'pharrell-williams');
    if (currentArtist === null) {
      getArtistAPI(match.params.id);
    }
    if (!currentGallery) {
      setCurrentGallery(+match.params.galleryId);
    }
    this.createSwipeGesture();
  }

  changePage = (increase: boolean = true): void => {
    const { match, history, setFullscreenImage } = this.props;
    const resultIndex = increase
      ? +match.params.imageId + 1
      : +match.params.imageId - 1;
    history.push(
      `/artist/${match.params.id}/gallery/${match.params.galleryId}/image/${resultIndex}`
    );
    setFullscreenImage(resultIndex);
  };

  onSwipe = (gesture: any): void => {
    let position = gesture.deltaX;
    let id = Number(this.props.match.params.imageId);
    let galleryLength = this.props.currentGallery?.length || 0;
    if (position > 0) {
      if (id !== 0) {
        this.changePage(false);
      }
    } else if (position < 0) {
      if (galleryLength - 1 !== id) {
        this.changePage();
      }
    }
  };

  createSwipeGesture(): void {
    const image = document.querySelector('#gallery-image-gesture');
    if (!image) return;
    const gestureConfigGesture: GestureConfig = {
      el: image,
      direction: 'x',
      gestureName: 'swipeImageGalleryGesture',
      gesturePriority: 20,
      passive: true,
      onEnd: this.onSwipe
    };
    this.swipeGesture = createGesture(gestureConfigGesture);
    this.swipeGesture.enable();
  }

  componentDidUpdate(): void {
    const { setCurrentGallery, currentGallery, match } = this.props;
    const node = this.image.current;
    if (!this.state.gestureSet && node) {
      const gesture = createGesture({
        el: node,
        threshold: 0,
        onStart: (): void => {
          this.onStart();
        },
        gestureName: 'doubleClick'
      });
      gesture.enable();
      this.setState((prevState): State => ({ ...prevState, gestureSet: true }));
    }
    if (!currentGallery) {
      setCurrentGallery(+match.params.galleryId);
    }
  }

  getImage(): any {
    if (this.props.currentGallery !== null) {
      let gallery = this.props.currentGallery;
      let imageObj = gallery[this.props.match.params.imageId];
      if (imageObj !== undefined) {
        let image = imageObj.image;
        if (image !== undefined) {
          return image;
        } else {
          return;
        }
      }
    }
  }

  componentWillUnmount(): void {
    this.props.clearFullscreenImage();
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event);
    if (!currentScroll.validScroll) return;
    this.setState({ displayHeader: !currentScroll.blur });
  }

  showFullScreenModal = (): void => {
    const { currentGallery, setFullscreenImage, match } = this.props;
    window.screen.orientation.unlock();
    this.props.updateSettingsModal(
      <FullScreenImageModal
        currentGallery={currentGallery}
        changePage={this.changePage}
        galleryLength={currentGallery?.length || 0}
      />,
      'background-black-base',
      100
    );
    setFullscreenImage(+match.params.imageId);
    //@ts-ignore
    if (window.deviceready && window.StatusBar) {
      //@ts-ignore
      window.StatusBar.hide();
    }
  };

  backToGalleryGrid = (): void => {
    const { match, history } = this.props;
    this.props.clearFullscreenImage();
    history.replace(
      `/artist/${match.params.id}/gallery/${match.params.galleryId}`
    );
  };

  callbackFunction = (childData: boolean, showHeader?: boolean): void => {
    this.setState({ displayChat: childData });
    if (showHeader) this.setState({ displayHeader: true });
  };

  render(): React.ReactNode {
    const { match } = this.props;
    const imageSrc = this.getImage();
    return (
      <IonPage id="gallery-photo-page">
        <div>
          {this.state.displayHeader && (
            <Header
              rightButtonGroup
              parentCallback={this.callbackFunction}
              overlay={this.props.currentGalleryComments.length}
              leftBackHref={`/artist/${match.params.id}/gallery/${match.params.galleryId}`}
              leftBackOnClick={this.backToGalleryGrid}
            />
          )}
        </div>
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={this.handleScroll.bind(this)}
          style={{
            overflow: 'auto',
            zIndex: 1,
            backgroundColor: '#000'
          }}
        >
          <div
            className={'artist-gallery-photo-page'}
            ref={this.image}
            id="gallery-image-gesture"
          >
            <div style={{ marginTop: 100 }}>
              {imageSrc && <IonImg src={imageSrc} alt={''} />}
            </div>
            <ButtonIcon
              type={ShapesSize.normal}
              icon={<FullscreenIcon />}
              onClick={this.showFullScreenModal}
              styles={{ top: '15px', position: 'absolute', left: '20px' }}
            />
          </div>
        </IonContent>

        <PhotoChat
          displayChat={this.state.displayChat}
          parentCallback={this.callbackFunction}
          currentPostComments={this.props.currentGalleryComments}
        />
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, currentGalleryComments, currentGallery } = artistAPI;
  return { currentGalleryComments, currentArtist, currentGallery };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty,
    getArtistGalleryCommentsAPI,
    updateSettingsModal,
    setCurrentGallery,
    setFullscreenImage,
    clearFullscreenImage
  })(ArtistGalleryPhotoPage)
);
