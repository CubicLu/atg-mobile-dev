import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  createAnimation,
  IonHeader,
  IonButton,
  CreateAnimation
} from '@ionic/react';
import {
  _,
  BackgroundImage,
  Header,
  Menu,
  ButtonIcon,
  BackIcon,
  SupportBy,
  LoaderFullscreen
} from './../../components';
import {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
} from './../../actions';
import { ApplicationState } from './../../reducers';
import { ArtistInterface, MenuInterface } from '../../interfaces';

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
  scrolling: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props, State> {
  private animation: boolean = false;
  private menuRef: React.RefObject<CreateAnimation> = React.createRef();
  private nameRef: React.RefObject<CreateAnimation> = React.createRef();
  private supRef: React.RefObject<CreateAnimation> = React.createRef();
  private supportRef: React.RefObject<CreateAnimation> = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      blur: false,
      scrolling: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }

  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  async handleScroll(event: any): Promise<void> {
    const menuAnimation = this.menuRef.current!.animation;
    const supportAnimation = this.supportRef.current!.animation;
    const nameAnimation = this.nameRef.current!.animation;

    const { blur } = this.state;
    const eventBlur = event.detail.scrollTop > 140;
    if (blur === eventBlur) return;
    this.setState({ blur: eventBlur });
    const direction = eventBlur ? 'normal' : 'reverse';

    if (this.animation) return;
    menuAnimation.direction(direction);
    supportAnimation.direction(direction);
    nameAnimation.direction(direction);
    nameAnimation.direction(direction);
    this.animation = true;
    // eslint-disable-next-line no-undef
    await Promise.all([
      menuAnimation.play(),
      supportAnimation.play(),
      nameAnimation.play()
    ]);
    this.animation = false;
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
    if (!hasArtist) return <IonPage id="artist-page" />; //to render only once, no construct again

    const scrolled = this.state.blur;
    const supportFans = this.props.currentArtist?.supportArtistFans;
    const name = this.props.currentArtist?.name;
    const gradient = `180deg,${this.props.currentArtist?.backgroundGradient?.color1}00 0%,${this.props.currentArtist?.backgroundGradient?.color1}d1 60%,${this.props.currentArtist?.backgroundGradient?.color2} 100%`;
    const backgroundImage = this.props.currentArtist?.cover.background;
    const clickBack = (): void => this.props.history.goBack();

    return (
      <IonPage id="artist-page">
        <BackgroundImage
          gradient={gradient}
          backgroundImage={backgroundImage}
          blur={this.state.blur}
        />
        <IonHeader className="ion-no-border">
          <Header
            type="fixed"
            centerContent={
              <h4
                className={`artist-page name title ${scrolled ? '' : ' hide'}`}
              >
                {name}
              </h4>
            }
            rightContent={
              // <CreateAnimation
              //   ref={this.supRef}
              //   duration={500}
              //   fromTo={{
              //     property: 'transform',
              //     fromValue: 'translateX(0)',
              //     toValue: 'translateX(300px)'
              //   }}
              // >
              <div className={scrolled ? 'supportByHide' : 'supportByShow'}>
                <SupportBy data={supportFans} />
              </div>
              // </CreateAnimation>
            }
            leftContent={<ButtonIcon onClick={clickBack} icon={<BackIcon />} />}
          />
        </IonHeader>

        <div className="artist-page content">
          <IonContent
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
          >
            <div className="emptySpace" />
            <div className="artistName center">
              <CreateAnimation
                ref={this.nameRef}
                duration={500}
                fromTo={{
                  property: 'transform',
                  fromValue: 'translate(0, 0)',
                  toValue: 'translate(-100px, -150px)'
                }}
              >
                <h2
                  id="artistName"
                  className={`title ${scrolled ? 'left' : 'center'}`}
                >
                  {name}
                </h2>
              </CreateAnimation>
            </div>

            <div className={`supportBtn ${scrolled ? 'right' : 'center'}`}>
              <CreateAnimation
                ref={this.supportRef}
                duration={500}
                fromTo={{
                  property: 'transform',
                  fromValue: 'translate(0, 0)',
                  toValue: 'translate(0px, -176px)'
                }}
              >
                <IonButton
                  className="support rounded"
                  routerDirection="forward"
                  routerLink={`${this.props.history.location.pathname}/support`}
                >
                  SUPPORT US
                </IonButton>
              </CreateAnimation>
            </div>

            <CreateAnimation
              ref={this.menuRef}
              duration={500}
              fromTo={{
                property: 'transform',
                fromValue: 'translateY(0px)',
                toValue: 'translateY(-204px)'
              }}
            >
              <div className={scrolled ? 'menuFixed ' : 'notFixed'}>
                <Menu
                  tabs={this.props.artistTabs}
                  activeId={this.props.activeArtistTab}
                  onClick={this.handleMenu.bind(this)}
                />
              </div>
            </CreateAnimation>

            {hasArtist &&
              _.map(
                this.props.artistTabs,
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
