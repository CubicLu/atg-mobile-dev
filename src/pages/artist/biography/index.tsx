import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, IonSlides, IonSlide, IonImg } from '@ionic/react';
import {
  Header,
  ButtonIcon,
  BackIcon,
  BackgroundImage,
  LoaderFullscreen,
  DotsThreeIcon,
  BiographyList,
  ModalSlide
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
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> { }

class ArtistBiographyPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { currentPage: 0 };
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

  render(): React.ReactNode {
    const activeBio =
      this.props.currentArtist &&
      this.props.currentArtist.biography &&
      this.props.currentArtist.biography[this.state.currentPage];
    console.log(activeBio);
    return (
      <IonPage id="artist-biography">
        <IonContent>
          <Header
            type="fixed"
            leftContent={
              <ButtonIcon
                icon={<BackIcon color={'#FFF'} />}
                onClick={(): void => {
                  this.props.history.goBack();
                }}
              />
            }
            centerContent={<h1 className="biography">Biography</h1>}
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
                      )
                    }),
                    'white'
                  )}
                />
              )
            }
          />
          <div className="artist-biography-page">
            <IonSlides
              id="biography-slides"
              className="slides"
              options={{ initialSlide: 0, speed: 400 }}
              onIonSlideWillChange={(ev: any): void => {
                ev.target
                  .getActiveIndex()
                  .then((n: number): void => this.setState({ currentPage: n }));
              }}
            >
              <IonSlide key={0}>
                <BackgroundImage
                  backgroundImage={this.props.currentArtist?.cover.biography}
                >
                  <h1 className="feature">
                    {this.props.currentArtist?.biography &&
                      this.props.currentArtist?.biography[0].headline}
                  </h1>
                </BackgroundImage>
              </IonSlide>

              <IonSlide key={1} className="fullscreen">
                {this.props.currentArtist?.biography && (
                  <div className="skyline">
                    <IonImg
                      src={this.props.currentArtist?.biography[1].skyline}
                    />
                  </div>
                )}

                <div>
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
                </div>
              </IonSlide>

              <IonSlide key={2}>
                <h1>Slide 3</h1>
              </IonSlide>
            </IonSlides>
          </div>
        </IonContent>
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
