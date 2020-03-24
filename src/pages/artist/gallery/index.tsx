import React from 'react';
import {
  Header,
  BackgroundImage,
  CardAlbumGallery,
  HeaderOverlay
} from './../../../components';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';
import { validateScrollHeader } from '../../../utils';

interface State {
  blur: boolean;
}

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
}

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
}

interface MatchParams {
  id: string;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<any> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = { blur: false };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist == null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentDidMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef.current!.playTopHeader(currentScroll);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-page">
        <div className={`artist-gallery-page`}>
          <Header title="Gallery" />
          <HeaderOverlay ref={this.headerRef} />

          <IonContent
            fullscreen={true}
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
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
              <div
                className={`row content-container ${this.props.isPlaying &&
                  ' is-playing'}`}
              >
                {this.props.currentArtist?.gallery?.map(
                  (data, index): React.ReactNode => (
                    <CardAlbumGallery
                      key={index}
                      onClick={(): void => {
                        this.props.history.push(
                          `/home/artist/${this.props.currentArtist?.username}/gallery/${index}`
                        );
                      }}
                      image={data.cover}
                      label={data.name}
                      quantity={data.quantity}
                      col={6}
                    />
                  )
                )}
              </div>
            </BackgroundImage>
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
  const { currentArtist } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistGalleryPage)
);
