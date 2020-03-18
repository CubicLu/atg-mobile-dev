import React from 'react';
import { Header, _, BackgroundImage } from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { GalleryInterface, ArtistInterface } from '../../../interfaces';
import Masonry from 'react-masonry-css';

interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  isPlaying: boolean;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
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

class ArtistGalleryGridPage extends React.Component<Props> {
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist === null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist === null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  onOpenImage(imageId: number): void {
    this.props.history.push(
      `/home/artist/${this.props.match.params.id}/gallery/${this.props.match.params.galleryId}/${imageId}`
    );
  }

  render(): React.ReactNode {
    let title =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[
            this.props.match.params.galleryId
          ] !== undefined
          ? this.props.currentArtist?.gallery[this.props.match.params.galleryId]
              .name
          : 'Gallery'
        : 'Gallery';

    let items =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[
            this.props.match.params.galleryId
          ] !== undefined
          ? this.props.currentArtist?.gallery[this.props.match.params.galleryId]
              .items
          : []
        : [];

    let cover =
      this.props.currentArtist?.gallery !== undefined
        ? this.props.currentArtist?.gallery[
            this.props.match.params.galleryId
          ] !== undefined
          ? this.props.currentArtist?.gallery[this.props.match.params.galleryId]
              .cover
          : undefined
        : undefined;
    return (
      <IonPage id="gallery-grid-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
        >
          <BackgroundImage
            gradient={`180deg,#1F0739,#1F0739`}
            backgroundTop
            backgroundBottom
            backgroundBottomDark={false}
            bottomRotate
            backgroundTopDark
            backgroundTopOpacity={0.7}
          >
            <div className={`artist-gallery-grid-page`}>
              <Header
                centerContent={<h1 className="title">{title}</h1>}
                rightActionButton={true}
              />

              <div
                className={`${this.props.isPlaying && ' is-playing'} images`}
              >
                <Masonry
                  breakpointCols={{
                    default: 1
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {cover !== undefined && (
                    <div key={0} onClick={this.onOpenImage.bind(this, 0)}>
                      <IonImg src={cover} />
                    </div>
                  )}
                </Masonry>
                <Masonry
                  breakpointCols={{
                    default: 2
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {_.map(
                    items,
                    (data, i): React.ReactNode => {
                      return (
                        <div
                          key={i + 1}
                          onClick={this.onOpenImage.bind(this, Number(i + 1))}
                        >
                          <IonImg src={data.image} />
                        </div>
                      );
                    }
                  )}
                </Masonry>
              </div>
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, loading } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, loading, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, { getArtistAPI, updateSettingsProperty })(
    ArtistGalleryGridPage
  )
);
