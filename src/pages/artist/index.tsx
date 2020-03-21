import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  createAnimation,
  CreateAnimation
} from '@ionic/react';
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
  animation: Animation | any;
  blur: boolean = false;
  private menuRef: React.RefObject<HTMLDivElement> = React.createRef();
  private menuFixedRef: React.RefObject<HTMLDivElement> = React.createRef();
  private nameRef: React.RefObject<HTMLDivElement> = React.createRef();
  private supportRef: React.RefObject<HTMLDivElement> = React.createRef();
  private barRef: React.RefObject<HTMLDivElement> = React.createRef();
  private blurRef: React.RefObject<any> = React.createRef();
  private lastValidScroll: ScrollHeaderInterface = {
    direction: 'scrollUp',
    blur: false
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

  animate(): any {
    const menu = createAnimation()
      .addElement(this.menuRef?.current!)
      .fromTo('opacity', '1', '0')
      .duration(0);
    const menuFixed = createAnimation()
      .addElement(this.menuFixedRef?.current!)
      .fromTo('opacity', '0', '1')
      .duration(0);
    const bar = createAnimation()
      .addElement(this.barRef?.current!)
      .fromTo('transform', 'translateY(0px)', 'translateY(-204px)')
      .duration(200);
    const name = createAnimation()
      .addElement(this.barRef?.current!)
      .fromTo('transform', 'scale(1)', 'scale(0.6)')
      .fromTo('transform', 'translate(0, 0)', 'translate(-60px, -120px)')
      .duration(200);
    const support = createAnimation()
      .addElement(this.barRef?.current!)
      .fromTo('transform', 'translate(0, 0)', 'translate(60px, -162px)')
      .duration(200);

    this.animation = this.blurRef.current?.animation
      .fromTo('background', '#000', '#00000025')
      .fromTo('backdrop-filter', 'blur(0)', 'blur(6.5px)')
      .addAnimation([menu, menuFixed, bar, name, support]);
  }

  handleScroll(event: any): void {
    const currentScroll = validateScrollHeader(event, 438);
    if (!currentScroll.validScroll) return;
    if (currentScroll.direction === this.lastValidScroll.direction) return;

    this.lastValidScroll = currentScroll;
    this.blur = currentScroll.blur;
    console.log(this.animation, currentScroll);
    this.animation && this.animation.direction(currentScroll.direction).play();
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
    const menu = (
      <Menu
        tabs={this.props.artistTabs}
        activeId={this.props.activeArtistTab}
        onClick={this.handleMenu.bind(this)}
      />
    );
    if (!this.animation) this.animate();

    return (
      <IonPage
        id="artist-page"
        style={artistBackground(this.props.currentArtist)}
      >
        <CreateAnimation>
          <div ref={this.blurRef} className="artist-page blur-background" />
          <Header
            leftBackOnClick={clickBack}
            title={this.props.currentArtist?.name}
            titleClassName={`artist-name`}
            rightContent={
              <div ref={this.barRef}>
                <SupportBy data={this.props.currentArtist?.supportArtistFans} />
              </div>
            }
          />

          <div ref={this.menuFixedRef} className="artist-page menu-fixed">
            {this.blur && menu}
          </div>

          <div className="artist-page content">
            <IonContent
              scrollY={true}
              scrollEvents={true}
              onIonScroll={this.handleScroll.bind(this)}
            >
              <div style={{ height: 300, width: 1 }} />
              <h2 ref={this.nameRef} className={`artist-title`}>
                {this.props.currentArtist?.name}
              </h2>

              <div ref={this.supportRef} className={`support-button`}>
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

              <div style={{ minHeight: 80 }} ref={this.menuRef}>
                {!this.blur && menu}
              </div>

              {this.props.artistTabs.map(
                (data, i): React.ReactNode =>
                  data.id === this.props.activeArtistTab &&
                  React.createElement(data.component, { key: i })
              )}
            </IonContent>
          </div>
        </CreateAnimation>
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
