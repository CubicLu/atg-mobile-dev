import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, CreateAnimation } from '@ionic/react';
import {
  BackgroundImage,
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
import { validateScrollHeader } from '../../utils';
import {
  ArtistInterface,
  MenuInterface,
  ScrollHeaderInterface,
  ShapesSize
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
  scrolling: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props, State> {
  private menuRef: React.RefObject<CreateAnimation> = React.createRef();
  private nameRef: React.RefObject<CreateAnimation> = React.createRef();
  private supportRef: React.RefObject<CreateAnimation> = React.createRef();
  private lastValidScroll: ScrollHeaderInterface = {
    direction: 'scrollUp',
    blur: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      blur: false,
      scrolling: false
    };
  }
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

  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleScroll(event: any): void {
    const currentScroll = validateScrollHeader(event, 180, 250);
    if (!currentScroll.validScroll) return;
    if (currentScroll.direction === this.lastValidScroll.direction) return;

    this.lastValidScroll = currentScroll;
    this.setState({ blur: currentScroll.blur });
    const parent = this.menuRef.current!.animation;
    parent
      .direction(currentScroll.animation)
      .duration(200)
      .play();
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
    if (!hasArtist) {
      return (
        <IonPage id="artist-page">
          <LoaderFullscreen visible={true} />
        </IonPage>
      );
    }

    const scrolled = this.state.blur;
    const supportFans = this.props.currentArtist?.supportArtistFans;
    const name = this.props.currentArtist?.name;
    const gradient = `180deg,${this.props.currentArtist?.backgroundGradient?.color1}00 0%,${this.props.currentArtist?.backgroundGradient?.color1}d1 60%,${this.props.currentArtist?.backgroundGradient?.color2} 100%`;
    const backgroundImage = this.props.currentArtist?.cover.background;
    const clickBack = (): void => this.props.history.push('/home/profile');

    return (
      <IonPage id="artist-page">
        <BackgroundImage
          gradient={gradient}
          backgroundImage={backgroundImage}
          blur={this.state.blur}
        />
        <Header
          leftBackOnClick={clickBack}
          title={name}
          titleClassName={`artist-name ${scrolled ? 'show' : ' hide'}`}
          rightContent={
            <SupportBy
              data={supportFans}
              className={scrolled ? 'hide' : 'show'}
            />
          }
        />

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
                duration={200}
                fromTo={{
                  property: 'transform',
                  fromValue: 'translate(0, 0)',
                  toValue: 'translate(-60px, -120px)'
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
                duration={200}
                fromTo={{
                  property: 'transform',
                  fromValue: 'translate(0, 0)',
                  toValue: 'translate(0px, -162px)'
                }}
              >
                <ButtonSupport
                  buttonType={'text'}
                  type={ShapesSize.rounded}
                  uppercase
                  supported={this.props.currentArtist?.support}
                  onClick={(): void => {
                    this.props.history.push(
                      `/home/artist/${this.props.currentArtist?.username}/support`
                    );
                  }}
                />
              </CreateAnimation>
            </div>

            <CreateAnimation
              ref={this.menuRef}
              duration={200}
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
              this.props.artistTabs.map(
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
