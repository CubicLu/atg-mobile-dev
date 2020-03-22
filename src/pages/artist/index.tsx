import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, createAnimation } from '@ionic/react';
import {
  Header,
  Menu,
  SupportBy,
  LoaderFullscreen,
  ButtonSupport
} from './../../components';
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
  ScrollHeaderInterface
} from '../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
  isPlaying: boolean;
  artistTabs: MenuInterface[];
  activeArtistTab: string;
  loading: boolean;
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
    if (nextProps.match.params.id !== this.props.currentArtist?.username) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (
      nextProps.currentArtist == null &&
      nextProps.match.params.id !== undefined
    ) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  componentWillUnmount(): void {
    this.fixedAnimation.destroy();
    this.relativeAnimation.destroy();
  }

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
    const placeHolder = createAnimation()
      .addElement(document.querySelector('.place')!)
      .fromTo('height', '130px', '40px')
      .duration(400);

    this.relativeAnimation = createAnimation()
      .easing('ease-in-out')
      .addAnimation([menuOpacity, bar, support, blurBack, title]);
    this.fixedAnimation = createAnimation()
      .easing('ease-in-out')
      .addAnimation([support, title, topMenu, placeHolder]);
  }
  handleScroll(event: any): void {
    const currentScroll = validateScrollHeader(event, 140, 200);
    if (!currentScroll.validScroll) return;
    if (currentScroll.direction === this.lastValidScroll.direction) return;

    this.lastValidScroll = currentScroll;
    this.blur = currentScroll.blur;

    this.relativeAnimation?.direction(currentScroll.animation).play();

    this.addRemoveFixedClasses(currentScroll.blur);
    this.fixedAnimation
      ?.direction(currentScroll.animation)
      .duration(currentScroll.blur ? 400 : 200)
      .play();
    this.addRemoveFixedClasses(currentScroll.blur);
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
    if (event.isPage === true) {
      let route =
        event.route != null
          ? event.route.replace(':id', this.props.match.params.id)
          : '';
      this.props.history.push(route);
    } else if (event.onClick !== undefined) {
      event.onClick();
    } else {
      this.props.updateSettingsProperty('activeArtistTab', event.id);
    }
  }

  render(): React.ReactNode {
    const hasArtist = this.props.currentArtist;
    if (!hasArtist) return null;
    const clickBack = (): void => this.props.history.push('/home/profile');
    if (!this.relativeAnimation) this.activateAnimations();

    return (
      <IonPage
        id="artist-page"
        style={artistBackground(this.props.currentArtist)}
      >
        <div id="blur-background" className="artist-page blur-background" />
        <Header
          leftBackOnClick={clickBack}
          titleClassName={`artist-name`}
          rightContent={
            <SupportBy data={this.props.currentArtist?.supportArtistFans} />
          }
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
            <div>
              <div className="place" style={{ height: 130 }} />

              <div style={{ height: 50 }}>
                <h2 id="artist-title" className={`artist-title`}>
                  {this.props.currentArtist?.name}
                </h2>
              </div>

              <div style={{ height: 30 }} className={`support-button`}>
                <div id="support-button">
                  <ButtonSupport
                    buttonType={'text'}
                    type={'rounded'}
                    uppercase
                    supported={this.props.currentArtist?.support}
                    onClick={(): void => {
                      this.props.history.push(
                        `/home/artist/${this.props.currentArtist?.username}/support`
                      );
                    }}
                  />
                </div>
              </div>

              <div className="place" style={{ height: 40 }} />

              <div style={{ minHeight: 80 }}>
                <div id="normal-menu">
                  <Menu
                    tabs={this.props.artistTabs}
                    activeId={this.props.activeArtistTab}
                    onClick={this.handleMenu.bind(this)}
                  />
                </div>
              </div>
            </div>

            {this.props.artistTabs.map(
              (data, i): React.ReactNode =>
                data.id === this.props.activeArtistTab &&
                React.createElement(data.component, { key: i })
            )}
          </IonContent>
        </div>
        <LoaderFullscreen visible={this.props.loading} />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, artists, loading } = artistAPI;
  const { isPlaying, artistTabs, activeArtistTab } = settings;
  return {
    currentArtist,
    artists,
    isPlaying,
    artistTabs,
    activeArtistTab,
    loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty,
    getArtistAPI
  })(ArtistPage)
);
