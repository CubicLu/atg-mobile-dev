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
  private finishing: boolean = false;
  private directionTop: boolean = true;
  private scrollTop: number = 0;
  private kineticOffset: number = 0;
  private lastOffsetA: number = 0;
  private kinetic: CustomAnimation = {
    animation: undefined,
    progressStarted: false,
    loaded: false
  };
  private linearScroll: CustomAnimation = {
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

  UNSAFE_componentWillUpdate(newProps): void {
    const hasTab = newProps.match.params.tab;
    if (hasTab && this.state.activeTab !== hasTab) this.updateActiveTab(hasTab);

    if (newProps.match.params.id !== this.props.match.params.id) {
      this.fetchArtist(newProps);
    }
  }
  ionViewDidEnter(): void {
    if (!this.linearScroll.loaded) this.loadLinearScroll();
    this.fetchArtist(this.props);
  }

  fetchArtist(props: Props): void {
    const artist = props.currentArtist;
    const ok = artist == null || artist.username !== props.match.params.id;
    if (!ok) return;

    props.getArtistAPI(props.match.params.id);
    !this.state.gateway && this.updateGateway(true);
    this.resetAnimation();
  }

  updateGateway(condition: boolean): void {
    this.setState({ gateway: condition });
  }

  updateActiveTab(tab: string): void {
    this.setState({ activeTab: tab });
  }

  resetAnimation(): void {
    this.kinetic?.animation?.destroy();
    this.kinetic = {
      animation: undefined,
      progressStarted: false,
      loaded: false
    };
    this.linearScroll?.animation?.destroy();
    this.linearScroll = {
      animation: undefined,
      progressStarted: false,
      loaded: false
    };
  }

  loadLinearScroll(): void {
    const normalMenu = document.querySelector('#artist-menu');
    if (!normalMenu) return;
    this.linearScroll.loaded = true;
    this.linearScroll.animation = createAnimation('linearScroll')
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
    this.linearScroll.progressStarted = true;
    this.linearScroll.animation.progressStart(true);
  }
  loadKineticAnimation(): void {
    this.kinetic.loaded = true;
    const normalMenu = document.querySelector('#artist-menu')!;
    const supportButton = document.querySelector('#support-button')!;
    const artistTitle = document.querySelector('#artist-title')!;
    const aT = getFixedTranslatePoints(supportButton!, 16, 46, true);
    const bT = getFixedTranslatePoints(artistTitle, 22, 38);
    const menu = getFixedTranslatePoints(normalMenu!, 0, 80);
    this.kinetic.animation = createAnimation('customAnime')
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

  handleScrollEnd(): void {
    if (this.finishing) return;
    if (!this.kinetic.progressStarted) return;
    if (this.lastOffsetA !== 1) return;
    if (this.directionTop && this.kineticOffset === 1) return;
    if (!this.directionTop && this.kineticOffset === 0) return;

    const finishUp = this.directionTop && this.kineticOffset > 0.15;
    const finishDown = this.directionTop === false && this.kineticOffset < 0.85;
    if (!finishDown && !finishUp) return;

    this.kinetic.animation
      .progressEnd(finishUp ? 1 : 0, this.kineticOffset)
      .onFinish((): void => this.setFinishing());
    this.kineticOffset = finishUp ? 1 : 0;
    this.kinetic.progressStarted = false;
  }
  setFinishing(): void {
    this.finishing = true;
    setTimeout((): boolean => (this.finishing = false), 1000);
  }

  handleScroll(detail): void {
    if (!this.linearScroll.loaded) this.loadLinearScroll();
    if (!this.linearScroll.progressStarted) {
      this.linearScroll.animation.progressStart();
      this.linearScroll.progressStarted = true;
    }
    this.directionTop = detail.deltaY > 0;
    this.scrollTop = detail.scrollTop;
    const offsetA = Math.trunc(1000 * Math.min(this.scrollTop / 200, 1)) / 1000;
    this.linearScroll.animation.progressStep(offsetA);
    this.lastOffsetA = offsetA;

    if (this.scrollTop >= HEADER_ANIMATION_OFFSET && !this.kinetic.loaded) {
      this.loadKineticAnimation();
    }
    if (!this.kinetic.loaded) return;
    this.handleScrollKinetic();
  }
  handleScrollKinetic(): void {
    if (this.finishing) return;
    if (!this.kinetic.progressStarted) {
      this.kinetic.animation.progressStart();
      this.kinetic.progressStarted = true;
    }
    const topOffSet = Math.max(0, this.scrollTop - HEADER_ANIMATION_OFFSET);
    const kineticOffset = Math.min(topOffSet / 100, 1);
    //kineticOffset means % of bottom or top - 0 is bottom and 1 is top
    this.kinetic.animation.progressStep(kineticOffset);
    this.kineticOffset = kineticOffset;
  }

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
          onIonScroll={(e): void => this.handleScroll(e.detail)}
          onIonScrollEnd={(): void => this.handleScrollEnd()}
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
