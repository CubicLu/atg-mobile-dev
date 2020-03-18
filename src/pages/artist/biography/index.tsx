import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonImg,
  IonGrid,
  IonRow,
  IonPage,
  IonHeader,
  CreateAnimation
} from '@ionic/react';
import {
  BackgroundImage,
  LoaderFullscreen,
  ModalSlide,
  Header,
  ButtonIcon,
  BackIcon,
  DotsThreeIcon,
  BiographyList
} from './../../../components';
import {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import { ArtistInterface, ModalSlideInterface } from '../../../interfaces';
import { setHeight } from '../../../utils';

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  updateSettingsModal: (
    visible: boolean,
    content: React.ReactNode,
    className?: string
  ) => void;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
  loading: boolean;
  modal: ModalSlideInterface;
}
interface MatchParams {
  id: string;
}

interface State {
  currentPage: number;
  blur: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistBiographyPage extends React.Component<Props, State> {
  private headerRef: React.RefObject<CreateAnimation> = React.createRef();
  private headerTitleRef: React.RefObject<CreateAnimation> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = { currentPage: 0, blur: false };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      nextProps.currentArtist == null
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  async componentDidMount(): Promise<void> {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  async handleScroll(event: any): Promise<void> {
    const parentAnimation = this.headerRef.current!.animation;
    const headerTitleAnimation = this.headerTitleRef.current!.animation;

    if (parentAnimation.childAnimations.length === 0) {
      parentAnimation.addAnimation([headerTitleAnimation]);
    }
    const { blur } = this.state;
    const eventBlur = event.detail.currentY >= 250;
    if (blur && !eventBlur) {
      parentAnimation.direction('reverse');
      await parentAnimation.play();
    } else if (eventBlur && !blur) {
      parentAnimation.direction('normal');
      await parentAnimation.play();
    }

    this.setState({ blur: eventBlur });
  }

  render(): React.ReactNode {
    // const activeBio =
    //   this.props.currentArtist &&
    //   this.props.currentArtist.biography &&
    //   this.props.currentArtist.biography[this.state.currentPage];
    return (
      <IonPage id="artist-biography" className="artist-biography-page">
        <CreateAnimation
          ref={this.headerRef}
          duration={0}
          fromTo={{
            property: 'background',
            toValue: 'var(--background)',
            fromValue: 'transparent'
          }}
        >
          <IonHeader className="fixed ion-no-border">
            <Header
              leftContent={
                <ButtonIcon
                  icon={<BackIcon color={'#FFF'} />}
                  onClick={(): void => {
                    this.props.history.goBack();
                  }}
                />
              }
              centerContent={
                <CreateAnimation
                  duration={500}
                  ref={this.headerTitleRef}
                  fromTo={{
                    property: 'color',
                    toValue: 'var(--color)',
                    fromValue: 'white'
                  }}
                >
                  <h1 className="biography">Biography</h1>
                </CreateAnimation>
              }
              rightContent={
                this.props.currentArtist && (
                  <ButtonIcon
                    icon={<DotsThreeIcon color={'#FFF'} />}
                    onClick={this.props.updateSettingsModal.bind(
                      this,
                      true,
                      React.createElement(BiographyList, {
                        items: this.props.currentArtist.biography,
                        title: 'Biography',
                        username: this.props.currentArtist.username,
                        onClick: this.props.updateSettingsModal.bind(
                          this,
                          false,
                          null
                        ),
                        background: 'background-white-base'
                      }),
                      'background-white-base'
                    )}
                  />
                )
              }
            />
          </IonHeader>
        </CreateAnimation>
        <IonContent
          scrollEvents={true}
          onIonScroll={this.handleScroll.bind(this)}
          className="artist-biography-content"
        >
          <IonSlides options={{ autoHeight: true }}>
            <IonSlide>
              <BackgroundImage
                className="cover"
                backgroundImage={this.props.currentArtist?.cover.biography}
              >
                <h1 className="feature">
                  {this.props.currentArtist?.biography &&
                    this.props.currentArtist?.biography[0].headline}
                </h1>
              </BackgroundImage>
            </IonSlide>
            <IonSlide>
              <IonGrid>
                {this.props.currentArtist?.biography && (
                  <IonRow>
                    <IonImg
                      src={this.props.currentArtist?.biography[1].skyline}
                    />
                  </IonRow>
                )}
                <IonRow>
                  {this.props.currentArtist?.biography && (
                    <h1 className="headline">
                      {this.props.currentArtist?.biography[1].headline}
                    </h1>
                  )}
                  {this.props.currentArtist?.biography && (
                    <div className="byline">
                      by {this.props.currentArtist?.biography[1].byline}
                    </div>
                  )}
                  {this.props.currentArtist?.biography && (
                    <div className="article">
                      {this.props.currentArtist?.biography[1].leadParagraph}

                      {this.props.currentArtist?.biography && (
                        <div>
                          <br />
                          {this.props.currentArtist?.biography[1] &&
                            this.props.currentArtist?.biography[1].items && (
                              <IonImg
                                src={
                                  this.props.currentArtist?.biography[1]
                                    .items[1].image
                                }
                              />
                            )}
                        </div>
                      )}
                    </div>
                  )}
                </IonRow>
              </IonGrid>
            </IonSlide>
          </IonSlides>
          <LoaderFullscreen visible={this.props.loading} />
          <ModalSlide
            onClose={(): void => {
              this.props.updateSettingsModal(false, null);
            }}
            visible={this.props.modal.visible}
            height={setHeight(40)}
            classname={this.props.modal.classname}
          >
            {this.props.modal.content}
          </ModalSlide>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { modal } = settings;
  const { currentArtist, loading } = artistAPI;
  return { currentArtist, loading, modal };
};

export default withRouter(
  connect(mapStateToProps, {
    updateSettingsProperty,
    updateSettingsModal,
    getArtistAPI
  })(ArtistBiographyPage)
);
