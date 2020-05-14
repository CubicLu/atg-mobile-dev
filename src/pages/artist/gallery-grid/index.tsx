import React from 'react';
import { ContentLoader, Header, HeaderOverlay } from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';

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
import { RouteComponentProps } from 'react-router';

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

class ArtistGalleryGridPage extends React.Component<Props, {}> {
  private headerRef: React.RefObject<any> = React.createRef();
  isReady = false;

  displayContent = (): void => {
    setTimeout((): void => {
      let that = this;
      that.isReady = true;
      this.forceUpdate();
    }, 2000);
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
      currentArtist,
      getArtistAPI,
      match,
      currentGallery,
      setCurrentGallery
    } = this.props;
    if (currentArtist === null) {
      getArtistAPI(match.params.id);
    }
    if (currentArtist && !currentGallery) {
      setCurrentGallery(+match.params.galleryId);
    }
  }

  componentDidUpdate(): void {
    const {
      currentArtist,
      currentGallery,
      match,
      setCurrentGallery
    } = this.props;
    if (currentArtist && !currentGallery) {
      setCurrentGallery(+match.params.galleryId);
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
        {data.map(
          (item, i): React.ReactNode => {
            return (
              <div
                className="col s4 img"
                key={i}
                onClick={(): void => this.onOpenImage(item.image)}
              >
                <div
                  style={{
                    backgroundImage: `url(${item.image})`
                  }}
                ></div>
              </div>
            );
          }
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
            <div
              className="col s12 img"
              onClick={(): void => this.onOpenImage(image0)}
            >
              <div
                style={{
                  backgroundImage: `url(${image0})`
                }}
              ></div>
            </div>
          </div>
          <div className="row">
            <div
              className="col s12 img"
              onClick={(): void => this.onOpenImage(image1)}
            >
              <div
                style={{
                  backgroundImage: `url(${image1})`
                }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="col s8 col2 img"
          onClick={(): void => this.onOpenImage(image2)}
        >
          <div
            style={{
              backgroundImage: `url(${image2})`
            }}
          ></div>
        </div>
      </div>
    );
  }

  renderRow1Col2(data, i): React.ReactNode {
    let image0 = data[0] !== undefined ? data[0].image : null;
    let image1 = data[1] !== undefined ? data[1].image : null;
    return (
      <div className="row row1-col2" key={`row1-col2-${i}`}>
        <div
          className="col s8 img"
          onClick={(): void => this.onOpenImage(image0)}
        >
          <div
            style={{
              backgroundImage: `url(${image0})`
            }}
          ></div>
        </div>
        <div
          className="col s4 img"
          onClick={(): void => this.onOpenImage(image1)}
        >
          <div
            style={{
              backgroundImage: `url(${image1})`
            }}
          ></div>
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

  render(): React.ReactNode {
    const params = this.props.match.params;
    if (!this.isReady) this.displayContent();

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
        <ContentLoader
          speed={2}
          viewBox="0 0 400 650"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(0,0,0)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.15}
          foregroundOpacity={0.25}
          style={
            this.isReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <rect x="0" y="0" width="400" height="300" />
          <rect x="0" y="305" width="200" height="150" />
          <rect x="210" y="305" width="200" height="150" />
          <rect x="0" y="460" width="200" height="150" />
          <rect x="210" y="460" width="200" height="150" />
        </ContentLoader>
        <IonContent
          style={
            this.isReady
              ? { visibility: 'visible', background: '#fff' }
              : { visibility: 'hidden' }
          }
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className={'artist-gallery-grid-page'}>
            <div className={'images'}>
              <div>
                {cover !== undefined && (
                  <div key={0} onClick={(): void => this.onOpenImage(cover)}>
                    <IonImg src={cover} />
                  </div>
                )}
              </div>
              {items.map(
                (data: any, i: number): React.ReactNode => {
                  let key = Object.keys(data) ? Object.keys(data)[0] : null;
                  return !!key && this.renderTemplate(key, data[key], i);
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
