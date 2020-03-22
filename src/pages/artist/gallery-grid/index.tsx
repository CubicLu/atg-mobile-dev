import React from 'react';
import { Header, HeaderOverlay } from './../../../components';
import { IonContent, IonPage, IonImg } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { GalleryInterface, ArtistInterface } from '../../../interfaces';
import { validateScrollHeader } from '../../../utils';

interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  isPlaying: boolean;
}

interface State {
  blur: boolean;
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

class ArtistGalleryGridPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = { blur: false };
  }

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

  onOpenImage(image: string): void {
    this.props.history.push({
      pathname: `/home/artist/${this.props.match.params.id}/gallery/${this.props.match.params.galleryId}/image`,
      state: { image: image }
    });
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
                onClick={this.onOpenImage.bind(this, item.image)}
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
              onClick={this.onOpenImage.bind(this, image0)}
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
              onClick={this.onOpenImage.bind(this, image1)}
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
          onClick={this.onOpenImage.bind(this, image2)}
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
          onClick={this.onOpenImage.bind(this, image0)}
        >
          <div
            style={{
              backgroundImage: `url(${image0})`
            }}
          ></div>
        </div>
        <div
          className="col s4 img"
          onClick={this.onOpenImage.bind(this, image1)}
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

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 30);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef.current!.playTopHeader(currentScroll);
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
        <div
          className={`artist-gallery-grid-page ${this.props.isPlaying &&
            'is-playing'}`}
        >
          <Header
            centerContent={<h1 className="title">{title}</h1>}
            rightActionButton={true}
          />
          <HeaderOverlay ref={this.headerRef} />

          <IonContent
            fullscreen={true}
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
            style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#FFF' }}
          >
            <div className={`images`}>
              {cover !== undefined && (
                <div key={0} onClick={this.onOpenImage.bind(this, cover)}>
                  <IonImg src={cover} />
                </div>
              )}

              {items.map(
                (data: any, i: number): React.ReactNode => {
                  let key = Object.keys(data) ? Object.keys(data)[0] : null;
                  return !!key && this.renderTemplate(key, data[key], i);
                }
              )}
            </div>
          </IonContent>
        </div>
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
