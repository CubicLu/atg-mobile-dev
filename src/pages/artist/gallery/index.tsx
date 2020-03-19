import React from 'react';
import {
  Header,
  _,
  BackgroundImage,
  CardAlbumGallery,
  LoaderFullscreen
} from './../../../components';
import { IonContent, IonPage, CreateAnimation } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import { getArtistAPI, updateSettingsProperty } from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface State {
  blur: boolean;
}

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
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistGalleryPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<CreateAnimation> = React.createRef();
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

  handleScroll(event: any): void {
    const parentAnimation = this.headerRef.current!.animation;

    const { blur } = this.state;
    const eventBlur = event.detail.scrollTop > 30;
    if (blur && !eventBlur) {
      parentAnimation.duration(1500);
      parentAnimation.direction('reverse');
      parentAnimation.play();
    } else if (eventBlur && !blur) {
      parentAnimation.duration(500);
      parentAnimation.direction('normal');
      parentAnimation.play();
    }
    this.setState({ blur: eventBlur });
  }

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-page">
        <div className={`artist-gallery-page`}>
          <Header title="Gallery" />

          <CreateAnimation
            ref={this.headerRef}
            duration={500}
            fromTo={{
              property: 'opacity',
              fromValue: '0',
              toValue: '1'
            }}
          >
            <div className="top-header"></div>
          </CreateAnimation>

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
                {_.map(
                  this.props.currentArtist?.gallery,
                  (data, index): React.ReactNode => {
                    return (
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
                    );
                  }
                )}
              </div>
            </BackgroundImage>
          </IonContent>
        </div>
        <LoaderFullscreen visible={this.props.loading} />
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
  connect(mapStateToProps, {
    getArtistAPI,
    updateSettingsProperty
  })(ArtistGalleryPage)
);
