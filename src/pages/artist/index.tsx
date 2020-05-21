import React from 'react';
import { connect } from 'react-redux';
import {
  IonContent,
  IonPage,
  createAnimation,
  withIonLifeCycle
} from '@ionic/react';
import { Menu, SupportBy, ButtonSupport, Header } from './../../components';
import { ApplicationState } from './../../reducers';
import { artistBackground, getFixedTranslatePoints } from '../../utils';
import { ArtistInterface, MenuInterface } from '../../models';
import { clearCurrentArtist, getArtistAPI } from './../../actions';
import ArtistGatewayPage from './gateway';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
  artistTabs: MenuInterface[];
}
interface DispatchProps {
  getArtistAPI: (username: string) => void;
  clearCurrentArtist: () => void;
}
interface MatchParams {
  id: string;
  tab: string;
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

interface State {
  activeTab: string;
  gateway: boolean;
}

class ArtistPage extends React.PureComponent<Props, State> {
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

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'featured',
      gateway: true
    };
  }

  componentDidUpdate(prevProps): void {
    //navigate to specific tab
    const hasTab = this.props.match.params.tab;
    if (hasTab && this.state.activeTab !== hasTab) this.updateActiveTab(hasTab);
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchArtist();
    }
  }
  ionViewDidEnter(): void {
    if (!this.customAlpha.loaded) this.loadAnimationsAlpha();
    this.fetchArtist();
  }

  fetchArtist(): void {
    const artist = this.props.currentArtist;
    const ok = artist == null || artist.username !== this.props.match.params.id;
    if (!ok) return;
    !this.state.gateway && this.updateGateway(true);
    this.props.getArtistAPI(this.props.match.params.id);
  }
  updateGateway(condition: boolean): void {
    this.setState({ gateway: condition });
  }

  updateActiveTab(tab: string): void {
    this.setState({ activeTab: tab });
  }

  componentDidMount(): void {
    this.custom?.animation?.destroy();
    this.customAlpha?.animation?.destroy();
    this.custom.loaded = false;
    this.customAlpha.loaded = false;
    this.lastOffset = 0;
    this.lastOffsetA = 0;
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

  handleMenu = (event: MenuInterface): void => {
    const { match, history } = this.props;

    if (event.route && event.isPage === true) {
      return history.push(event.route.replace(':id', match.params.id));
    } else if (event.onClick) {
      return event.onClick();
    }
    this.updateActiveTab(event.id);
  };

  noGateway(): void {
    this.updateGateway(false);
  }
  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage style={artistBackground(null)} id="artist-page" />;
    }

    const { currentArtist: artist, artistTabs } = this.props;
    const activeTab = artistTabs.find(
      (x): boolean => x.id === this.state.activeTab
    )!;
    return (
      <IonPage
        id="artist-page"
        style={artistBackground(artist)}
        className="saturate"
      >
        {this.state.gateway && (
          <ArtistGatewayPage
            currentArtist={this.props.currentArtist}
            gateway={(): void => this.noGateway()}
          />
        )}

        <Header />
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
            activeId={this.state.activeTab}
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
  const { currentArtist } = artistAPI;
  const { artistTabs } = settings;
  return { currentArtist, artistTabs };
};

export default connect(mapStateToProps, { getArtistAPI, clearCurrentArtist })(
  withIonLifeCycle(ArtistPage)
);
