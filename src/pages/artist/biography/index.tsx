import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonImg,
  IonPage,
  CreateAnimation
} from '@ionic/react';
import {
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
  AlbumInterface,
  Colors
} from '../../../interfaces';
import { setHeight, validateScrollHeader } from '../../../utils';

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  updateSettingsModal: (content: React.ReactNode, className?: string) => void;
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
  private content?: React.RefObject<HTMLIonContentElement> = React.createRef();
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

  handleScroll(event: CustomEvent<any>): void {
    const currentScroll = validateScrollHeader(event, 180, 180);
    if (!currentScroll.validScroll) return;
    if (currentScroll.blur === this.state.blur) return;
    this.setState({ blur: currentScroll.blur });
    this.headerRef && this.headerRef.current.playTopHeader(currentScroll);
    //used only in biography to fadeout BIOGRAPHY TITLE
    this.titleRef.current!.animation.direction(currentScroll.animation!).play();
  }

  changeChapter(chapter?: number): void {
    const slides = this.slides?.current;
    if (!slides) return;
    chapter ? slides.slideTo(chapter) : slides.slideNext();
    this.props.updateSettingsModal(null);
  }

  chapterFooter(): React.ReactNode {
    return (
      <div className="row footer p-4 fluid mt-2 mb-4">
        <div className="footer-buttons align-start">
          <ButtonIcon
            color={Colors.orange}
            icon={<StarIcon width={24} height={24} />}
          />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <ButtonIcon
            color={Colors.green}
            icon={<ShareIcon width={22} height={20} />}
          />
        </div>
        <div className="align-end" onClick={(): void => this.changeChapter()}>
          <span className="f3 l15 dark">NEXT&nbsp;</span>
          <ArrowRightIcon width={18} height={18} color={'#000'} />
        </div>
      </div>
    );
  }

  articleAlbum(items: AlbumInterface[]): React.ReactNode {
    return (
      <div className="row no-margin">
        {items.map((item: AlbumInterface, i: number): any => (
          <div className="col s6 no-padding" key={i}>
            <IonImg style={{ border: '4px solid #fff' }} src={item.image} />
          </div>
        ))}
      </div>
    );
  }
  readMore(activeBio: BiographyInterface): React.ReactNode {
    return (
      <div className="row">
        <div className="readmore h00 dark mb-2">
          {activeBio.readMore?.title}
        </div>

        {activeBio.readMore?.items.map(
          (item: AlbumInterface, i: number): any => (
            <div className="col s4 album no-padding center-align" key={i}>
              <IonImg src={item.image} />
              <span className="f6 dark read-more-label">{item.name}</span>
            </div>
          )
        )}
      </div>
    );
  }

  render(): React.ReactNode {
    if (!this.props.currentArtist) return <IonPage />;
    const {
      currentArtist: artist,
      currentArtist: { biography },
      modal,
      updateSettingsModal
    } = this.props;
    if (!biography) return <IonPage />;

    const toggleAction = (): void =>
      updateSettingsModal(
        React.createElement(BiographyList, {
          items: artist.biography,
          title: 'Biography',
          username: artist.username,
          onClick: (a: number): any => this.changeChapter(a)
        }),
        'background-white-base'
      );
    const activeBio = biography[this.state.currentPage];

    return (
      <IonPage id="artist-biography" className="artist-biography-page">
        <Header
          rightActionButton={true}
          rightActionOnClick={toggleAction}
          centerContent={
            <CreateAnimation
              duration={500}
              ref={this.titleRef}
              fromTo={{
                property: 'color',
                fromValue: '#ffffff',
                toValue: '#00000000'
              }}
            >
              <span className="baskerville h0 l1">{activeBio.title}</span>
            </CreateAnimation>
          }
        />
        <HeaderOverlay
          ref={this.headerRef}
          content={
            <div className="m-4">
              <span className="text-18 l1">{artist.name}</span>
              <br />
              <span className="text-14 l1">Biography</span>
            </div>
          }
          className="biography"
        />

        <IonContent
          ref={this.content}
          scrollEvents={true}
          scrollY={true}
          scrollX={false}
          onIonScroll={(e): void => this.handleScroll(e)}
        >
          <IonSlides
            ref={this.slides}
            mode="ios"
            scrollbar={true}
            options={{ autoHeight: false }}
            onIonSlideWillChange={(): Promise<void> | undefined =>
              this.content?.current?.scrollToTop(700)
            }
          >
            {biography.map((bio: BiographyInterface): any => (
              <IonSlide key={bio.chapter} className={bio.template}>
                <div
                  className={`chapter-zero ${bio.template}`}
                  style={{
                    backgroundImage: `url(${bio.cover}), linear-gradient(#231441, #080709)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="cover-feature">
                    <h1 className="feature">
                      {bio.name}
                      <p className="read">Read&nbsp;</p>
                    </h1>
                    <h2 className="sub f4">{bio.subtitle}</h2>
                  </div>
                </div>

                <div className="chapter left-align">
                  {bio.nameHeadline && (
                    <div className="p-3 mt-2 mb-0 f0 bold dark name-headline">
                      {bio.nameHeadline}
                    </div>
                  )}

                  <div className="m-3 mb-1 headline h000">{bio.headline}</div>

                  <div className="mx-3 baskerville italic h4 dark">
                    by {bio.byline}
                  </div>

                  {bio.skyline && <IonImg className="sky" src={bio.skyline} />}

                  <div className="p-3 mt-2 mb-2 h3 baskerville left-align article l15">
                    {bio.leadParagraph === '.... details'
                      ? this.victoria
                      : bio.leadParagraph}
                  </div>

                  {bio.items && (
                    <div className="p-3">{this.articleAlbum(bio.items)}</div>
                  )}

                  {bio.readMore && (
                    <div className="p-3">{this.readMore(bio)}</div>
                  )}

                  {this.chapterFooter()}
                </div>
              </IonSlide>
            ))}
          </IonSlides>
        </IonContent>
        <ModalSlide height={setHeight(40)} className={modal.classname}>
          {modal.content}
        </ModalSlide>
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
