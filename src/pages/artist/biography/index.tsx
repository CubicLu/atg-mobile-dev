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
  ModalSlide,
  Header,
  BiographyList,
  ButtonIcon,
  StarIcon,
  ShareIcon,
  ArrowRightIcon,
  HeaderOverlay
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
import { setHeight, validateScrollHeader } from '../../../utils';

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
  private headerRef: React.RefObject<any> = React.createRef();
  private slides?: React.RefObject<HTMLIonSlidesElement> = React.createRef();
  private titleRef: React.RefObject<CreateAnimation> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = { currentPage: 0, blur: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  UNSAFE_componentWillMount(): void {
    this.props.getArtistAPI(this.props.match.params.id);
  }

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 180, 180);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef.current!.playTopHeader(currentScroll);
    //used only in biography to fadeout BIOGRAPHY TITLE
    this.titleRef.current!.animation.direction(currentScroll.animation!).play();
  }

  changeChapter(chapter?: number): void {
    const slides = this.slides?.current;
    if (!slides) return;
    chapter ? slides.slideTo(chapter) : slides.slideNext();
    this.props.updateSettingsModal(false, null);
  }

  zero = (<IonPage id="artist-biography" className="artist-biography-page" />);
  render(): React.ReactNode {
    const { currentArtist: artist, modal, updateSettingsModal } = this.props;

    if (!artist) {
      return this.zero;
    }
    const { biography } = artist;
    if (!biography) {
      return this.zero;
    }

    const toggleAction = updateSettingsModal.bind(
      this,
      true,
      React.createElement(BiographyList, {
        items: artist.biography,
        title: 'Biography',
        username: artist.username,
        onClick: (a: number): any => this.changeChapter(a),
        background: 'background-white-base'
      }),
      'background-white-base'
    );

    const activeBio = biography[this.state.currentPage];
    const topheader: React.ReactNode = (
      <React.Fragment>
        <br />
        <span className="biography-header">{artist.name}</span>
        <br />
        <span className="biography-subheader">Biography</span>
      </React.Fragment>
    );

    return (
      <IonPage id="artist-biography" className="artist-biography-page">
        <HeaderOverlay
          ref={this.headerRef}
          content={topheader}
          className="biography"
        />
        <Header
          rightActionButton={true}
          rightActionOnClick={toggleAction}
          centerContent={
            <CreateAnimation
              duration={500}
              ref={this.titleRef}
              fromTo={{
                property: 'color',
                toValue: 'var(--color)',
                fromValue: 'white'
              }}
            >
              <span className="biography-header">{activeBio.title}</span>
            </CreateAnimation>
          }
        />

        <IonContent
          scrollEvents={true}
          scrollY={true}
          scrollX={false}
          onIonScroll={this.handleScroll.bind(this)}
          className="artist-biography-content"
        >
          <IonSlides ref={this.slides} options={{ autoHeight: true }}>
            {biography.map((bio: BiographyInterface): any => (
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
                          {bio.items?.map(
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
                      <div className="col s1" />
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
                      <div className="col s1" />

                      <div className="col s1" />
                      <div
                        onClick={(): void => this.changeChapter()}
                        className="col s3 next"
                      >
                        <span>NEXT</span>
                      </div>
                      <div className="col s1 arrow">
                        <ArrowRightIcon width={18} height={18} color={'#000'} />
                      </div>
                      <div className="col s1" />
                    </IonRow>
                  </IonGrid>
                </div>
              </IonSlide>
            ))}
          </IonSlides>

          <ModalSlide
            onClose={(): void => updateSettingsModal(false, null)}
            visible={modal.visible}
            height={setHeight(40)}
            className={modal.classname}
          >
            {modal.content}
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
  const { currentArtist } = artistAPI;
  return { currentArtist, modal };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI
})(ArtistBiographyPage);
