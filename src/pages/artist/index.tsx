import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, createAnimation } from '@ionic/react';
import { Header, Menu, SupportBy, ButtonSupport } from './../../components';
import {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
} from './../../actions';
import { ApplicationState } from './../../reducers';
import { validateScrollHeader, artistBackground } from '../../utils';
import {
  ArtistInterface,
  MenuInterface,
  ScrollHeaderInterface,
  ShapesSize
} from '../../interfaces';
import VigilAnimator from '../../utils/animateFrame';

interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
  isPlaying: boolean;
  artistTabs: MenuInterface[];
  activeArtistTab: string;
}

interface DispatchProps {
  updateArtistProperty: (property: string, value: any) => void;
  updateSettingsProperty: (property: string, value: any) => void;
  getArtistAPI: (username: string) => void;
}

interface MatchParams {
  id: string;
}
interface State {
  blur: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props, State> {
  fixedAnimation: Animation | any;
  relativeAnimation: Animation | any;
  menuAnimationRelative: Animation | any;
  blur: boolean = false;
  private lastValidScroll: ScrollHeaderInterface = {
    direction: 'scrollUp',
    blur: false,
    animation: 'reverse'
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  vigil?: VigilAnimator;
  activateAnimations(): any {
    const normalMenu = document.querySelector('#normal-menu');
    const fixedMenu = document.querySelector('#fixed-menu');
    if (!(normalMenu && fixedMenu)) return;
    const menuOpacity = createAnimation()
      .addElement(fixedMenu!)
      .fromTo('opacity', '0', '1');
    const bar = createAnimation()
      .addElement(document.querySelector('#support-bar')!)
      .fromTo('transform', 'translateX(0px)', 'translateX(250px)')
      .duration(300);
    const blurBack = createAnimation()
      .addElement(document.querySelector('#blur-background')!)
      .easing('ease-in-out')
      .keyframes([
        { backdropFilter: 'blur(0)', opacity: 0, offset: 0 },
        { backdropFilter: 'blur(2px)', opacity: 0.9, offset: 0.25 },
        { backdropFilter: 'blur(4px)', opacity: 0.9, offset: 0.5 },
        { backdropFilter: 'blur(6.5px)', opacity: 1, offset: 1 }
      ])
      .duration(600);
    // FIXED ANIMATION

    this.vigil = new VigilAnimator({
      element: document.querySelector('#support-button')!,
      refreshRate: 500,
      direction: 'normal',
      axisY: 80,
      marginRight: 50
    });

    const support = createAnimation()
      .addElement(document.querySelector('#support-button')!)
      .duration(300)
      .easing('ease-in-out')
      .fromTo('transform', 'translate(0, 0)', 'translate(10vw, -100px)');
    const title = createAnimation()
      .addElement(document.querySelector('#artist-title')!)
      .fromTo('fontSize', '48px', '30px')
      .easing('ease-in-out')
      .duration(300)
      .fromTo('transform', 'translate(0, 0)', 'translate(-10vw, -100px)');
    const topMenu = createAnimation()
      .addElement(document.querySelector('#normal-menu')!)
      .fromTo('transform', 'translateY(0px)', 'translateY(-70px)');

    this.relativeAnimation = createAnimation()
      .easing('ease-in-out')
      .addAnimation([menuOpacity, bar, support, blurBack, title]);
    this.fixedAnimation = createAnimation()
      .easing('ease-in-out')
      .addAnimation([support, title, topMenu]);
  }

  handleScroll(event: any): void {
    console.log(this.vigil);
    const a = this.vigil?.play();

    const currentScroll = validateScrollHeader(event, 140, 200);
    if (!currentScroll.validScroll) return;
    if (currentScroll.direction === this.lastValidScroll.direction) return;

    this.lastValidScroll = currentScroll;
    this.blur = currentScroll.blur;

    this.transferNodes();
    this.relativeAnimation?.direction(currentScroll.animation).play();
    this.addRemoveFixedClasses(currentScroll.blur);
    this.fixedAnimation
      ?.direction(currentScroll.animation)
      .duration(currentScroll.blur ? 400 : 200)
      .play();
    this.addRemoveFixedClasses(currentScroll.blur);
  }

  transferNodes(): void {
    const oldParent = this.blur
      ? document.querySelector('#original')
      : document.querySelector('#fixed-menu');
    const newParent = this.blur
      ? document.querySelector('#fixed-menu')
      : document.querySelector('#original');
    while (oldParent?.hasChildNodes()) {
      newParent?.appendChild(oldParent.firstChild!);
    }
  }

  addRemoveFixedClasses(add: boolean): void {
    const normalMenu = document.querySelector('#normal-menu');
    const supportButton = document.querySelector('#support-button');
    const artistTitle = document.querySelector('#artist-title');
    if (add) {
      normalMenu?.classList.add('set-menu-fixed');
      supportButton?.classList.add('set-support-fixed');
      artistTitle?.classList.add('set-name-fixed');
    } else {
      normalMenu?.classList.remove('set-menu-fixed');
      supportButton?.classList.remove('set-support-fixed');
      artistTitle?.classList.remove('set-name-fixed');
    }
  }

  handleMenu(event: MenuInterface): void {
    const { match, history, updateSettingsProperty } = this.props;
    if (event.route && event.isPage === true) {
      const href = event.route.replace(':id', match.params.id);
      history.push(href);
      // const action = Action.
    } else if (event.onClick) {
      event.onClick();
    } else {
      updateSettingsProperty('activeArtistTab', event.id);
    }
  }

  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage id="artist-page" />;
    }
    const {
      currentArtist: artist,
      history,
      artistTabs,
      activeArtistTab
    } = this.props;

    const clickBack = (): void => history.push('/home/profile');
    if (!this.relativeAnimation) this.activateAnimations();
    return (
      <IonPage id="artist-page" style={artistBackground(artist)}>
        <div id="blur-background" className="artist-page blur-background" />
        <Header
          leftBackOnClick={clickBack}
          titleClassName={`artist-name`}
          rightContent={<SupportBy data={artist.supportArtistFans} />}
        />

        <div id="fixed-menu" className="artist-page menu-fixed-area" />
        <div id="absolute" className="artist-page absolute">
          <IonContent
            scrollY={true}
            scrollEvents={true}
            forceOverscroll={true}
            fullscreen={true}
            onIonScroll={this.handleScroll.bind(this)}
          >
            <div id="original" style={{ marginTop: 130, minHeight: 200 }}>
              <div style={{ minHeight: 50 }}>
                <h2 id="artist-title" className={`artist-title`}>
                  {artist.name}
                </h2>
              </div>
              <div style={{ minHeight: 30 }} className={`support-button`}>
                <div id="support-button">
                  <ButtonSupport
                    buttonType={'text'}
                    type={ShapesSize.rounded}
                    uppercase
                    supported={artist.support}
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${artist.username}/support`
                      );
                    }}
                  />
                </div>
              </div>
              <div style={{ minHeight: 40 }} />
              <div style={{ minHeight: 80 }}>
                <div id="normal-menu">
                  <Menu
                    tabs={artistTabs}
                    activeId={activeArtistTab}
                    onClick={this.handleMenu.bind(this)}
                  />
                </div>
              </div>
            </div>

            {artistTabs &&
              artistTabs.map(
                (data, i): React.ReactNode =>
                  data.id === activeArtistTab &&
                  React.createElement(data.component, { key: i })
              )}
          </IonContent>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  const { isPlaying, artistTabs, activeArtistTab } = settings;
  return {
    currentArtist,
    artists,
    isPlaying,
    artistTabs,
    activeArtistTab
  };
};

export default connect(mapStateToProps, {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
})(ArtistPage);
