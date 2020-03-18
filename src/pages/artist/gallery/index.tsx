import React from 'react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  _,
  BackgroundImage,
  CardAlbumGallery,
  LoaderFullscreen
} from './../../../components';
import { IonContent, IonPage, IonHeader, CreateAnimation } from '@ionic/react';
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

  async handleScroll(event: any): Promise<void> {
    const parentAnimation = this.headerRef.current!.animation;
    const { blur } = this.state;
    const eventBlur = event.detail.currentY >= 20;
    const header = document.getElementById('ionHeader');

    if (blur && !eventBlur) {
      parentAnimation.direction('reverse');
      header?.classList.remove('blur');
      await parentAnimation.play();
    } else if (eventBlur && !blur) {
      parentAnimation.direction('normal');
      header?.classList.add('blur');
      await parentAnimation.play();
    }

    this.setState({ blur: eventBlur });
  }

  render(): React.ReactNode {
    return (
      <IonPage id="gallery-page">
        <div className={`artist-gallery-page`}>
          <CreateAnimation
            ref={this.headerRef}
            duration={300}
            fromTo={{
              property: 'background',
              toValue: 'var(--background)',
              fromValue: 'transparent'
            }}
          >
            <IonHeader id="ionHeader" className="fixed ion-no-border">
              <Header
                leftContent={
                  <ButtonIcon
                    icon={<BackIcon color={'#FFF'} />}
                    onClick={(): void => {
                      this.props.history.goBack();
                    }}
                  />
                }
                centerContent={<h1 className="title">Gallery</h1>}
              />
            </IonHeader>
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
