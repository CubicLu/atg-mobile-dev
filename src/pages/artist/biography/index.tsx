import React from 'react';
import { connect } from 'react-redux';
import {
  IonContent,
  IonSlides,
  IonSlide,
  IonImg,
  IonPage,
  CreateAnimation
} from '@ionic/react';
import {
  Header,
  ButtonIcon,
  StarIcon,
  ShareIcon,
  ArrowRightIcon,
  HeaderOverlay,
  LockedIcon,
  DefaultModal,
  CardImage,
  PopUpModal,
  PremiumFeaturesModalContent
} from './../../../components';
import {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI,
  updatePopUpModal
} from '../../../actions';
import { ApplicationState } from '../../../reducers';
import {
  ArtistInterface,
  ModalSlideInterface,
  BiographyInterface,
  AlbumInterface
} from '../../../models';
import { Colors, ShapesSize } from './../../../types';
import { validateScrollHeader } from '../../../utils';
import BottomTilesComponent from '../../../components/bottom-tiles';
import { RouteComponentProps } from 'react-router';

interface DispatchProps {
  getArtistAPI: (username: string) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  updateSettingsModal: (
    content: React.ReactNode,
    className?: string,
    height?: number
  ) => void;
  updatePopUpModal: (string: string | null) => void;
}
interface StateProps {
  currentArtist: ArtistInterface | null;
  modal: ModalSlideInterface;
  popUpModal: string | null;
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

  UNSAFE_componentWillReceiveProps(next: Props): void {
    if (this.props.currentArtist?.username !== next.match.params.id) {
      this.props.getArtistAPI(next.match.params.id);
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
  openChapterModal(): void {
    this.props.updateSettingsModal(
      <DefaultModal
        onClick={(): void => {}}
        title="Biography"
        data={[]}
        content={
          <ul>
            {this.props.currentArtist?.biography?.map(
              (data, i): React.ReactNode => (
                <li
                  key={i}
                  className="f6 dark"
                  onClick={(): void => this.changeChapter(i)}
                >
                  {data.name}

                  {data.accessLevel && data.accessLevel > 0 ? (
                    <ButtonIcon
                      icon={<LockedIcon color={'#000'} />}
                      color={Colors.transparent}
                    />
                  ) : (
                    <ButtonIcon
                      icon={<ArrowRightIcon color={'#000'} />}
                      color={Colors.transparent}
                    />
                  )}
                </li>
              )
            )}
          </ul>
        }
      />,
      'background-white-base',
      45
    );
  }
  checkSupport(): void {
    const slides = this.slides?.current;
    if (!slides) return;
    if (!this.props.currentArtist!.biography!) return;
    const slide = this.props.currentArtist!.biography![this.state.currentPage];
    if (slide.accessLevel > 0) return this.toggleSupportModal();
  }
  changeChapter(specific?: number): void {
    const slides = this.slides?.current;
    if (!slides) return;
    if (specific) {
      const slide = this.props.currentArtist!.biography![specific];
      if (slide.accessLevel > 0) return this.toggleSupportModal();
      slides.slideTo(specific!);
      this.props.updateSettingsModal(null);
    } else {
      let next = this.state.currentPage + 1;
      const slide = this.props.currentArtist!.biography![next];
      if (slide.accessLevel > 0) return this.toggleSupportModal();

      slides.slideNext();
      this.props.updateSettingsModal(null);
    }
  }

  toggleSupportModal(): void {
    this.props.updatePopUpModal('premiumFeatureModal');
    this.props.updateSettingsModal(null);
  }

  transferToSupportPage(): void {
    const { currentArtist, updateSettingsModal } = this.props;
    if (currentArtist && currentArtist.username) {
      updateSettingsModal(null, '');
      this.props.updatePopUpModal(null);
      this.props.history.push(`/artist/${currentArtist.username}/support`);
    }
  }

  renderEmpty(): React.ReactNode {
    return (
      <IonPage
        style={{ background: '#2d0758' }}
        id="artist-biography"
        className="artist-biography-page"
      >
        <IonContent />
      </IonPage>
    );
  }
  render(): React.ReactNode {
    if (!this.props.currentArtist) return this.renderEmpty();
    const {
      currentArtist: artist,
      currentArtist: { biography }
    } = this.props;
    if (!biography) return this.renderEmpty();

    const bio = biography[this.state.currentPage];

    return (
      <IonPage
        style={{ background: '#fff' }}
        id="artist-biography"
        className="artist-biography-page"
      >
        <Header
          rightActionButton={true}
          rightActionOnClick={(): void => this.openChapterModal()}
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
              <span className={`baskerville h0 text-${bio.titleColor} l08`}>
                {bio.title}
              </span>
            </CreateAnimation>
          }
        />
        <HeaderOverlay
          ref={this.headerRef}
          className={`biography top-${bio.headerColor}`}
          content={
            <div className="m-4">
              <span className="text-18 l1">{artist.name}</span>
              <br />
              <span className="text-14 l1">Biography</span>
            </div>
          }
        />

        <IonContent
          ref={this.content}
          scrollEvents={true}
          scrollY={true}
          scrollX={false}
          onIonScroll={(e): void => this.handleScroll(e)}
        >
          {biography && (
            <IonSlides
              ref={this.slides}
              mode="ios"
              scrollbar={false}
              options={{ autoHeight: true }}
              onIonSlidesDidLoad={(): Promise<void> => this.updateSlide(false)}
              onIonSlideDidChange={(): Promise<void> => this.updateSlide()}
              onIonSlideWillChange={(): Promise<void> | undefined =>
                this.content?.current?.scrollToTop(700)
              }
            >
              {biography?.map(
                (b: BiographyInterface): React.ReactFragment => (
                  <IonSlide
                    key={b.chapter}
                    style={{ display: 'block' }}
                    className={b.template}
                  >
                    {this.coverPage(b)}
                    {this.headline(b)}
                    {this.gallery(b.items)}
                    {this.readMore(b)}
                    {this.bandMembers()}
                    {this.bioFooter()}
                    {this.supportModal()}
                    <BottomTilesComponent tiles={artist.tiles} />
                  </IonSlide>
                )
              )}
            </IonSlides>
          )}
        </IonContent>
      </IonPage>
    );
  }
  async updateSlide(updateIndex = true): Promise<void> {
    if (!this.slides?.current) return;
    if (updateIndex) {
      const index = await this.slides.current.getActiveIndex();
      this.setState({ currentPage: index });
    }
    setTimeout((): void => {
      this.slides?.current?.updateAutoHeight();
    }, 1500);
  }
  coverPage(bio: BiographyInterface): React.ReactNode {
    return (
      <div
        className={`page-cover ${bio.template}`}
        style={{
          backgroundImage: `url(${bio.cover}), linear-gradient(#231441, #080709)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {bio.name && (
          <div className="cover-feature">
            <h1 className={`name-feature text-${bio.featureColor}`}>
              {bio.name}
            </h1>

            <p className="read mt-2 f4 my-auto right-align">
              Read&nbsp;
              <ArrowRightIcon width={10} height={14} stroke={3} />
            </p>
            <h2 className="sub l15 f4">{bio.subtitle}</h2>
          </div>
        )}
      </div>
    );
  }
  headline(bio: BiographyInterface): React.ReactNode {
    return (
      <div className="left-align">
        {bio.nameHeadline && (
          <div className={`p-3 mt-2 mb-0 f0 bold text-${bio.headlineColor}`}>
            {bio.nameHeadline}
          </div>
        )}

        {bio.skyline && bio.skylineBefore && (
          <IonImg className="sky-image-before" src={bio.skyline} />
        )}

        <div className={'p-3 mb-1 headline h000 text-' + bio.headlineColor}>
          {bio.headline}
        </div>

        <div className={`px-3 baskerville italic h4 text-${bio.textColor}`}>
          by {bio.byline}
        </div>

        {bio.skyline && !bio.skylineBefore && (
          <IonImg className="mt-2 sky-image-after" src={bio.skyline} />
        )}

        <div className={`p-3 h3 baskerville text l15 text-${bio.textColor}`}>
          {bio.leadParagraph === '.... details'
            ? this.victoria
            : bio.leadParagraph}
        </div>
      </div>
    );
  }
  gallery(items?: AlbumInterface[]): React.ReactNode {
    if (!items) return;
    return (
      <div
        className="p-3 row no-margin"
        style={{ height: 'auto', minHeight: 500 }}
      >
        {items.map((item: AlbumInterface, i: number): any => (
          <div className={`no-padding col s${item.cols || 4}`} key={i}>
            <IonImg style={{ border: '4px solid #fff' }} src={item.image} />
          </div>
        ))}
      </div>
    );
  }
  readMore(bio: BiographyInterface): React.ReactNode {
    if (!bio.readMore) return null;
    return (
      <div className="p-3">
        <div className="row">
          <div className="readmore h00 dark mb-2">{bio.readMore?.title}</div>

          {bio.readMore?.items.map((item: AlbumInterface, i: number): any => (
            <div
              className={`album no-padding center-align col s${item.cols || 4}`}
              key={i}
            >
              <IonImg src={item.image} />
              <span className="f6 dark read-more-label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  bandMembers(): React.ReactNode {
    if (!this.props.currentArtist?.bandMembers) return null;
    return (
      <div className="py-3 px-2 h1 left-align text-black">
        <span className="p-0 ml-1 letter-spacing-2">BAND MEMBER BIOS</span>
        <div className="row">
          {this.props.currentArtist.bandMembers.map(
            (d, i): React.ReactNode => (
              <CardImage
                labelClassName="f6 dark"
                image={d.image}
                type={ShapesSize.rounded}
                key={i}
                diameter="100px"
                routerLink={d.redirectUrl}
                col={4}
                label={d.name}
              />
            )
          )}
        </div>
      </div>
    );
  }
  bioFooter(): React.ReactNode {
    return (
      <div className="footer flex p-3 fluid mt-2 mb-2">
        <ButtonIcon
          color={Colors.orange}
          icon={<StarIcon width={24} height={24} />}
        />
        <span className="mx-3" />
        <ButtonIcon
          color={Colors.green}
          icon={<ShareIcon width={22} height={20} />}
        />
        <div
          className="align-end flex"
          onClick={(): void => this.changeChapter()}
        >
          <div className="f4 l15 dark my-auto mr-1">NEXT</div>
          <div className="f0 l05 dark my-auto">&#10132;</div>
        </div>
      </div>
    );
  }
  supportModal(): React.ReactNode {
    const { popUpModal } = this.props;
    const { currentArtist } = this.props;

    return (
      popUpModal === 'premiumFeatureModal' && (
        <PopUpModal header={'PREMIUM FEATURES'}>
          <PremiumFeaturesModalContent
            title={`${currentArtist?.name} Radio`}
            description={
              <>
                You must be support <span>{currentArtist?.name}</span> in order
                to listen!
              </>
            }
            artistAvatar={currentArtist?.cover.event}
            onDoneClick={(): void => this.props.updatePopUpModal(null)}
            onSuccessClick={(): void => this.transferToSupportPage()}
          />
        </PopUpModal>
      )
    );
  }

  private victoria = (
    <div className="article">
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
    </div>
  );
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { modal, popUpModal } = settings;
  const { currentArtist } = artistAPI;
  return { currentArtist, modal, popUpModal };
};

export default connect(mapStateToProps, {
  updateSettingsProperty,
  updateSettingsModal,
  getArtistAPI,
  updatePopUpModal
})(ArtistBiographyPage);
