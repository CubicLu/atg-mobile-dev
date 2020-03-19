import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonImg,
  IonGrid,
  IonRow,
  IonPage,
  CreateAnimation,
  IonCol
} from '@ionic/react';
import {
  BackgroundImage,
  LoaderFullscreen,
  ModalSlide,
  Header,
  BiographyList,
  ButtonIcon,
  StarIcon,
  ShareIcon,
  ArrowRightIcon
} from './../../../components';
import {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import {
  ArtistInterface,
  ModalSlideInterface,
  BiographyInterface,
  AlbumInterface
} from '../../../interfaces';
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
  slides?: React.RefObject<HTMLIonSlidesElement> = React.createRef();
  private headerTitleRef: React.RefObject<CreateAnimation> = React.createRef();
  constructor(props: Props) {
    super(props);
    this.state = { currentPage: 0, blur: false };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  UNSAFE_componentWillMount(): void {
    this.props.getArtistAPI(this.props.match.params.id);
  }

  async handleScroll(event: any): Promise<void> {
    const parentAnimation = this.headerRef.current!.animation;
    const headerTitleAnimation = this.headerTitleRef.current!.animation;

    if (parentAnimation.childAnimations.length === 0) {
      parentAnimation.addAnimation([headerTitleAnimation]);
    }
    const { blur } = this.state;
    const eventBlur = event.detail.currentY >= 450;
    if (blur && !eventBlur) {
      parentAnimation.direction('reverse');
      await parentAnimation.play();
    } else if (eventBlur && !blur) {
      parentAnimation.direction('normal');
      await parentAnimation.play();
    }

    this.setState({ blur: eventBlur });
  }

  changeChapter(chapter?: number): void {
    const slides = this.slides?.current;
    if (!slides) return;
    chapter ? slides.slideTo(chapter) : slides.slideNext();
    this.props.updateSettingsModal(false, null);
  }

  render(): React.ReactNode {
    const hasArtist = this.props.currentArtist;
    if (!hasArtist) {
      return (
        <IonPage id="artist-biography" className="artist-biography-page">
          <LoaderFullscreen visible={true} />
        </IonPage>
      );
    }

    const toggleAction = this.props.updateSettingsModal.bind(
      this,
      true,
      React.createElement(BiographyList, {
        items: this.props.currentArtist!.biography,
        title: 'Biography',
        username: this.props.currentArtist!.username,
        onClick: (a: number): any => this.changeChapter(a),
        background: 'background-white-base'
      }),
      'background-white-base'
    );

    const activeBio =
      hasArtist &&
      hasArtist.biography &&
      hasArtist?.biography[this.state.currentPage];

    return (
      <IonPage id="artist-biography" className="artist-biography-page">
        <Header
          rightActionButton={true}
          rightActionOnClick={toggleAction}
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
              <span className="biography-header">{activeBio?.title}</span>
            </CreateAnimation>
          }
        />

        <CreateAnimation
          ref={this.headerRef}
          duration={500}
          fromTo={{
            property: 'opacity',
            fromValue: '0',
            toValue: '0.9'
          }}
        >
          <div className="top-header yellow">
            {this.props.currentArtist!.name}
          </div>
        </CreateAnimation>

        <IonContent
          scrollEvents={true}
          scrollY={true}
          scrollX={false}
          onIonScroll={this.handleScroll.bind(this)}
          className="artist-biography-content"
        >
          <IonSlides ref={this.slides} options={{ autoHeight: true }}>
            {this.props.currentArtist?.biography &&
              this.props.currentArtist?.biography.map(
                (bio: BiographyInterface): any => (
                  <IonSlide key={bio.chapter} className={bio.template}>
                    <div className="chapter-zero">
                      <BackgroundImage
                        gradient="180deg, #231441, #080709"
                        className={bio.template}
                        backgroundImage={bio.cover}
                      />
                      <div className="cover-feature">
                        <h1 className="feature">
                          {bio.name}
                          <p className="read">Read&nbsp;</p>
                        </h1>
                        <h2 className="subtitle">{bio.subtitle}</h2>
                      </div>
                    </div>

                    <div className="chapter">
                      <IonGrid>
                        <h1 className="name-headline">{bio.nameHeadline}</h1>
                        <h1 className="headline">{bio.headline}</h1>
                        <div className="byline">by {bio.byline}</div>
                        <IonRow className="skyline">
                          <IonImg src={bio.skyline} />
                        </IonRow>
                        <IonRow>
                          <div className="article">
                            {bio.leadParagraph === '.... details'
                              ? this.victoria
                              : bio.leadParagraph}
                            <IonRow>
                              <br />
                              {bio.items &&
                                bio.items.map(
                                  (item: AlbumInterface, i: number): any => (
                                    <IonCol size="6" key={i}>
                                      <IonImg src={item.image} />
                                    </IonCol>
                                  )
                                )}
                            </IonRow>
                          </div>
                          {bio.readMore && (
                            <div className="article">
                              <h1 className="readmore">{bio.readMore.title}</h1>
                              <IonRow>
                                <br />
                                {bio.readMore.items.map(
                                  (item: AlbumInterface, i: number): any => (
                                    <IonCol size="4" key={i}>
                                      <IonImg src={item.image} />
                                      <span className="item">{item.name}</span>
                                    </IonCol>
                                  )
                                )}
                              </IonRow>
                            </div>
                          )}
                        </IonRow>
                        <IonRow className="row footer">
                          <div className="col s2" />
                          <div className="col s2">
                            <ButtonIcon
                              color={'orange'}
                              icon={<StarIcon width={24} height={24} />}
                            />
                          </div>
                          <div className="col s2">
                            <ButtonIcon
                              color={'green'}
                              icon={<ShareIcon width={22} height={20} />}
                            />
                          </div>

                          <div
                            onClick={(): void => this.changeChapter()}
                            className="col s3 next"
                          >
                            <span>NEXT</span>
                          </div>
                          <div className="col s1 arrow">
                            <ArrowRightIcon
                              width={18}
                              height={18}
                              color={'#000'}
                            />
                          </div>
                          <div className="col s2" />
                        </IonRow>
                      </IonGrid>
                    </div>
                  </IonSlide>
                )
              )}
          </IonSlides>

          <LoaderFullscreen visible={this.props.loading} />

          <ModalSlide
            onClose={(): void => this.props.updateSettingsModal(false, null)}
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

  private victoria = (
    <div>
      <p>
        <b>From: </b>Sacramento, California
      </p>
      <p>
        <b>Sounds like: </b>Uplifting, empowering anthems that throwback to
        R&amp;B’s golden age
      </p>
      <p>
        <b>For fans of: </b>Ariana Grande, Solange
      </p>
      <p>
        <b>USP:</b>She’s penned some of pop’s pure-fire hits of the past few
        years.
      </p>

      <p>
        <b>Why you’re going to love them:&nbsp;</b> You may not think you’ve
        heard a Victoria Monét song, but you most certainly have. ‘Work From
        Home’? Maybe ‘A Little More’? You’ve definitely heard ‘Thank U, Next’
        and ‘7 Rings’. The Cali native has penned songs for everyone from Chris
        Brown and Fifth Harmony to Nas and Machine Gun Kelly, but it’s her work
        with Ariana Grande for which she’s best known, with credits on all of
        Grande’s albums to date. Monét’s solo career has so far seen her release
        four EPs of sleek, soulful R&amp;B, including the recent self-love slow
        jam ‘Ass Like That’. But recent trap-inspired Ariana collab, ‘Monopoly’,
        could signal a new direction for her upcoming ‘Jaguar’ EP, expected this
        year.
      </p>
      <div>
        <b>Key track:</b>‘Ass Like That’ (LMB)
      </div>
    </div>
  );
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { modal } = settings;
  const { currentArtist, loading } = artistAPI;
  return { currentArtist, loading, modal };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI
})(ArtistBiographyPage);
