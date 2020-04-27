import React from 'react';
import {
  ButtonIcon,
  FullscreenIcon,
  Header,
  PhotoChat
} from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  getArtistAPI,
  updateSettingsProperty,
  getArtistGalleryCommentsAPI,
  updateSettingsModal,
  setCurrentGallery,
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
  updateSettingsProperty: (property: string, value: any) => void;
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

  callbackFunction = (childData: boolean, showHeader?: boolean): void => {
    this.setState({ displayChat: childData });
    if (showHeader) this.setState({ displayHeader: true });
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist === null
    ) {
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
    getArtistGalleryCommentsAPI(0, 'pharell-williams');
    if (currentArtist === null) {
      getArtistAPI(match.params.id);
    }
    if (!currentGallery) {
      setCurrentGallery(+match.params.galleryId);
    }
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

  componentWillUnmount(): void {
    this.props.clearFullscreenImage();
  }

  getImage(): any {
    const { currentGallery, match } = this.props;
    return currentGallery?.[+match.params.imageId]?.image;
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event);
    if (!currentScroll.validScroll) return;
    this.setState({ displayHeader: !currentScroll.blur });
  }

  changePage = (increase?: boolean): void => {
    const { match, history, setFullscreenImage } = this.props;
    const resultIndex = increase
      ? +match.params.imageId + 1
      : +match.params.imageId - 1;
    history.push(
      `/artist/${match.params.id}/gallery/${match.params.galleryId}/image/${resultIndex}`
    );
    setFullscreenImage(resultIndex);
  };

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
    history.push(
      `/artist/${match.params.id}/gallery/${match.params.galleryId}`
    );
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
          <div className={'artist-gallery-photo-page'} ref={this.image}>
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
