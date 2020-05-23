import React from 'react';
import {
  ContentLoader,
  Header,
  HeaderOverlay,
  ImageSkeleton
} from './../../../components';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import {
  getArtistAPI,
  setCurrentGallery,
  updateSettingsProperty,
  clearCurrentGallery
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import {
  GalleryInterface,
  ArtistInterface,
  GalleryImageInterface
} from '../../../models';

interface StateProps {
  currentArtist: ArtistInterface | null;
  currentGallery: GalleryImageInterface[] | null;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  setCurrentGallery: (galleryId: number) => void;
  clearCurrentGallery: () => void;
}

interface MatchParams {
  id: string;
  galleryId: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {
  album: GalleryInterface;
}
interface State {
  isReady: boolean;
}
class ArtistGalleryGridPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }
  private headerRef: React.RefObject<any> = React.createRef();
  private _unmounted: boolean = false;
  componentWillUnmount(): void {
    this._unmounted = true;
  }
  componentDidMount(): void {
    setTimeout((): void => {
      !this._unmounted && this.setState({ isReady: true });
    }, 2000);
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
    if (this.props.currentArtist?.username !== this.props.match.params.id) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
    if (this.props.currentArtist && !this.props.currentGallery) {
      this.props.setCurrentGallery(+this.props.match.params.galleryId);
    }
  }

  componentDidUpdate(prevProps): void {
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.currentArtist?.username !== this.props.match.params.id
    ) {
      this.props.getArtistAPI(this.props.match.params.id);
    }

    if (this.props.currentArtist && !this.props.currentGallery) {
      this.props.setCurrentGallery(+this.props.match.params.galleryId);
    }
  }

  onOpenImage(image: string): void {
    const { match, currentGallery } = this.props;
    const current = currentGallery?.find(
      (item): boolean => item.image === image
    );

    const artistId = match.params.id;
    const galleryId = match.params.galleryId;
    const index = current ? currentGallery?.indexOf(current) : 0;
    const url = `/artist/${artistId}/gallery/${galleryId}/image/${index}`;
    this.props.history.push({ pathname: url, state: { image: image } });
  }

  renderRow1Col3(data, i): React.ReactNode {
    return (
      <div className="row row1-col3" key={`row1-col3-${i}`}>
        {data?.map(
          (photo, j): React.ReactNode => (
            <div key={j} className="col s4">
              <ImageSkeleton
                height={window.innerWidth / 3}
                onClick={(): void => this.onOpenImage(photo.image)}
                src={photo.image}
              />
            </div>
          )
        )}
      </div>
    );
  }

  renderRow2Col2(data, i): React.ReactNode {
    let image0 = data[0] !== undefined ? data[0].image : null;
    let image1 = data[1] !== undefined ? data[1].image : null;
    let image2 = data[2] !== undefined ? data[2].image : null;
    return (
      <div className="row row2-col2" key={`row2-col2-${i}`}>
        <div className="col s4 col1">
          <div className="row">
            <div className="col s12">
              <ImageSkeleton
                onClick={(): void => this.onOpenImage(image0)}
                height={0.33 * window.innerWidth}
                src={image0}
              />
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <ImageSkeleton
                onClick={(): void => this.onOpenImage(image1)}
                height={0.33 * window.innerWidth}
                src={image1}
              />
            </div>
          </div>
        </div>

        <div className="col s8 col2" style={{ height: '67vw' }}>
          <ImageSkeleton
            onClick={(): void => this.onOpenImage(image2)}
            height={0.66 * window.innerWidth}
            src={image2}
          />
        </div>
      </div>
    );
  }

  renderRow1Col2(data, i): React.ReactNode {
    let image0 = data[0] !== undefined ? data[0].image : null;
    let image1 = data[1] !== undefined ? data[1].image : null;
    return (
      <div className="row row1-col2" key={`row1-col2-${i}`}>
        <div className="col s8">
          <ImageSkeleton
            onClick={(): void => this.onOpenImage(image0)}
            height={'inherit'}
            src={image0}
          />
        </div>
        <div className="col s4">
          <ImageSkeleton
            onClick={(): void => this.onOpenImage(image1)}
            height={'inherit'}
            src={image1}
          />
        </div>
      </div>
    );
  }

  renderTemplate(key, data, i): React.ReactNode {
    switch (key) {
      case 'row-1-col-3':
        return this.renderRow1Col3(data, i);
      case 'row-2-col-2':
        return this.renderRow2Col2(data, i);
      case 'row-1-col-2':
        return this.renderRow1Col2(data, i);
      default:
        return null;
    }
  }

  renderSkeleton(): React.ReactNode {
    if (this.state.isReady) return null;
    return (
      <ContentLoader
        speed={2}
        viewBox="0 0 400 800"
        baseUrl={window.location.pathname}
        backgroundColor="rgb(0,0,0)"
        foregroundColor="rgb(255,255,255)"
        backgroundOpacity={0.15}
        foregroundOpacity={0.25}
        style={{ overflow: 'auto' }}
      >
        <rect x="0" y="0" width="400" height="400" />
        <rect x="0" y="405" width="133" height="150" />
        <rect x="140" y="405" width="133" height="150" />
        <rect x="280" y="405" width="133" height="150" />
        <rect x="0" y="560" width="200" height="350" />
        <rect x="210" y="560" width="200" height="350" />
      </ContentLoader>
    );
  }

  render(): React.ReactNode {
    const params = this.props.match.params;

    let title =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[params.galleryId] !== undefined
          ? this.props.currentArtist?.gallery[params.galleryId].name
          : 'Gallery'
        : 'Gallery';

    let items =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[params.galleryId] !== undefined
          ? this.props.currentArtist?.gallery[params.galleryId].items
          : []
        : [];

    let cover =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[params.galleryId] !== undefined
          ? this.props.currentArtist?.gallery[params.galleryId].cover
          : undefined
        : undefined;

    return (
      <IonPage id="gallery-grid-page">
        <Header
          title={title}
          rightActionButton={true}
          leftBackAddAction={(): void => this.props.clearCurrentGallery()}
        />
        <HeaderOverlay ref={this.headerRef} />

        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          {this.renderSkeleton()}
          <div
            style={{ visibility: this.state.isReady ? 'visible' : 'hidden' }}
            className={'artist-gallery-grid-page'}
          >
            <div className={'images'}>
              <div key={0} onClick={(): void => this.onOpenImage(cover)}>
                <ImageSkeleton
                  width={'100%'}
                  height={'100%'}
                  src={cover}
                  style={{ minHeight: '100vw', maxHeight: '100vw' }}
                />
              </div>

              {items.map(
                (photo: any, i: number): React.ReactNode => {
                  let key = Object.keys(photo) ? Object.keys(photo)[0] : null;
                  return !!key && this.renderTemplate(key, photo[key], i);
                }
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, currentGallery } = artistAPI;
  return { currentArtist, currentGallery };
};

export default connect(mapStateToProps, {
  getArtistAPI,
  updateSettingsProperty,
  setCurrentGallery,
  clearCurrentGallery
})(ArtistGalleryGridPage);
