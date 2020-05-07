import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, createAnimation } from '@ionic/react';
import { Menu, SupportBy, ButtonSupport, Header } from './../../components';
import { ApplicationState } from './../../reducers';
import { artistBackground, getFixedTranslatePoints } from '../../utils';
import { ArtistInterface, MenuInterface } from '../../interfaces';
import { clearCurrentArtist, getArtistAPI } from './../../actions';

interface StateProps {
  currentArtist: ArtistInterface | null;
  artistTabs: MenuInterface[];
  loading: boolean;
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  clearCurrentArtist: () => void;
}
interface MatchParams {
  id: string;
}
interface CustomAnimation {
  animation: any;
  progressStarted: boolean;
  loaded: boolean;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

const HEADER_ANIMATION_OFFSET = 200;

class ArtistPage extends React.PureComponent<Props, {}> {
  private lastOffset: number = 0;
  private lastOffsetA: number = 0;
  private custom: CustomAnimation = {
    animation: undefined,
    progressStarted: false,
    loaded: false
  };
  private customAlpha: CustomAnimation = {
    animation: undefined,
    progressStarted: false,
    loaded: false
  };

  UNSAFE_componentWillReceiveProps(next: Props): void {
    if (next.loading) return;
    if (this.props.loading) return;
    if (
      this.props.currentArtist == null ||
      this.props.currentArtist.username !== next.match.params.id
    ) {
      this.props.getArtistAPI(next.match.params.id);
    }
  }
  componentDidMount(): void {
    if (!this.customAlpha.loaded) this.loadAnimationsAlpha();
  }
  componentWillUnmount(): void {
    this.custom?.animation?.destroy();
    this.customAlpha?.animation?.destroy();
    this.custom.loaded = false;
    this.customAlpha.loaded = false;
  }
  loadAnimationsAlpha(): void {
    const normalMenu = document.querySelector('#artist-menu');
    if (!normalMenu) return;
    this.customAlpha.loaded = true;
    this.customAlpha.animation = createAnimation('customAlpha')
      .easing('linear')
      .duration(1600)
      .addAnimation([
        createAnimation('background')
          .addElement(document.querySelector('#fade-background')!)
          .fromTo('opacity', '0', '1'),
        createAnimation('header')
          .addElement(document.querySelector('#ion-item-header')!)
          .fromTo(
            'transform',
            'translateY(0)',
            `translateY(-${HEADER_ANIMATION_OFFSET}px)`
          )
      ]);
    this.customAlpha.progressStarted = true;
    this.customAlpha.animation.progressStart(true);
  }
  loadAnimations(): void {
    this.custom.loaded = true;
    const normalMenu = document.querySelector('#artist-menu')!;
    const supportButton = document.querySelector('#support-button')!;
    const artistTitle = document.querySelector('#artist-title')!;
    const aT = getFixedTranslatePoints(supportButton!, 16, 46, true);
    const bT = getFixedTranslatePoints(artistTitle, 22, 38);
    const menu = getFixedTranslatePoints(normalMenu!, 0, 80);
    this.custom.animation = createAnimation('customAnime')
      .easing('ease-in')
      .duration(400)
      .addAnimation([
        createAnimation('supportbar')
          .addElement(document.querySelector('#support-bar')!)
          .fromTo('transform', 'translateX(0px)', 'translateX(250px)'),
        createAnimation('supportbutton')
          .addElement(supportButton)
          .fromTo(
            'transform',
            'translate(0,0)',
            `translate(${aT.translateX}px,${aT.translateY}px)`
          ),
        createAnimation('name')
          .addElement(artistTitle)
          .fromTo(
            'transform',
            'translate3d(0,0,0) scale(1)',
            `translate3d(${bT.translateX}px,${bT.translateY}px,0) scale(0.6)`
          ),
        createAnimation('menu')
          .addElement(normalMenu)
          .fromTo(
            'transform',
            'translateY(0)',
            `translateY(${menu.translateY}px)`
          )
        //use values between 100 and 200 -> 80px less than throttle
      ]);
  }

  handleScrollEnd = (): void => {
    if (!this.custom.progressStarted) {
      return;
    }
    if (this.finishing) return;
    const ionContent = document.querySelector(
      'ion-content'
    )! as HTMLIonContentElement;

    ionContent.scrollEvents = false;
    ionContent.scrollY = false;
    const shouldComplete = this.lastOffset > 0.5;
    this.custom.animation
      .progressEnd(shouldComplete ? 1 : 0, this.lastOffset)
      .onFinish((): void => {
        this.setFinishing();
        ionContent.scrollY = true;
        ionContent.scrollEvents = true;
      });
    this.lastOffset = shouldComplete ? 1 : 0;
    this.custom.progressStarted = false;
    this.customAlpha.progressStarted = false;
  };

  finishing = false;
  setFinishing(): void {
    if (this.finishing) return;
    this.finishing = true;
    setTimeout((): void => {
      if (this.finishing) this.finishing = false;
    }, 200);
  }

  handleScroll = (event: CustomEvent): void => {
    if (!this.customAlpha.loaded) this.loadAnimationsAlpha();

    if (!this.customAlpha.progressStarted) {
      this.customAlpha.animation.progressStart();
      this.customAlpha.progressStarted = true;
    }

    //use values between 100 and 200 on divisor to throttle
    const offsetA = Number(
      Math.min(event.detail.scrollTop / 200, 1).toFixed(2)
    );
    this.customAlpha.animation.progressStep(offsetA);
    this.lastOffsetA = offsetA;

    if (
      event.detail.scrollTop >= HEADER_ANIMATION_OFFSET &&
      !this.custom.loaded
    ) {
      this.loadAnimations();
    }
    if (!this.custom.loaded) return;
    if (this.finishing) return;

    if (!this.custom.progressStarted) {
      this.custom.animation.progressStart();
      this.custom.progressStarted = true;
    }
    const topOffSet = Math.max(
      0,
      event.detail.scrollTop - HEADER_ANIMATION_OFFSET
    );

    const offset = Number(Math.min(topOffSet / 100, 1).toFixed(2));
    this.custom.animation.progressStep(offset);
    this.lastOffset = offset;
  };

  activeTab: string = 'features';
  handleMenu = (event: MenuInterface): void => {
    const { match, history } = this.props;
    if (event.route && event.isPage === true) {
      return history.push(event.route.replace(':id', match.params.id));
    } else if (event.onClick) {
      return event.onClick();
    }
    this.activeTab = event.id;
    this.forceUpdate();
  };

  handleBackClick = (): void => {
    const { clearCurrentArtist, history } = this.props;
    clearCurrentArtist();
    history.replace('/profile');
  };

  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage style={artistBackground(null)} id="artist-page" />;
    }

    const { currentArtist: artist, artistTabs } = this.props;
    const activeTab = artistTabs.find((x): boolean => x.id === this.activeTab)!;
    return (
      <IonPage
        id="artist-page"
        style={artistBackground(artist)}
        className="saturate"
      >
        <Header //leftBackHref={'/profile'}
          leftBackOnClick={this.handleBackClick}
        />
        <SupportBy data={artist.supportArtistFans} />
        <div id="fade-background" className="fade-background opacity-0 blur" />
        <div id="ion-item-header" className="artist-landing-header">
          <h2 id="artist-title" className={'h00 m-0 inline-table l1 shadow'}>
            {artist.name}
          </h2>
          <br />
          <ButtonSupport
            id="support-button"
            artist={artist}
            supported={artist.support}
          />

          <Menu
            id="artist-menu"
            tabs={artistTabs}
            activeId={this.activeTab}
            onClick={this.handleMenu}
          />
        </div>
        <IonContent
          scrollY={true}
          scrollEvents={true}
          forceOverscroll={false}
          fullscreen={false}
          onIonScroll={this.handleScroll}
          onIonScrollEnd={this.handleScrollEnd}
        >
          <div className="offset-content" />

          <activeTab.component />
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, loading } = artistAPI;
  const { artistTabs } = settings;
  return { currentArtist, artistTabs, loading };
};

export default connect(mapStateToProps, { getArtistAPI, clearCurrentArtist })(
  ArtistPage
);
