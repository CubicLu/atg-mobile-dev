import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, createAnimation, IonHeader } from '@ionic/react';
import {
  _,
  BackgroundImage,
  Header,
  Button,
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
      console.log('no current Artist', this.props.match.params.id);
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  handleScroll(event: any): void {
    const { blur } = this.state;
    const eventBlur = event.detail.scrollTop > 140;
    if (blur === eventBlur) return;
    this.setState({ blur: eventBlur });
  }
  handleMenu(event: MenuInterface): void {
    console.log(event.route);

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

  animateTitle(): void {
    const title = document.getElementById('artistName');
    if (title == null) return;
    const titleLeft = title.getBoundingClientRect().left;
    const titleTop = title.getBoundingClientRect().top;
    // const width = title.getBoundingClientRect().width;
    const leftPx = 16;
    const topPx = 45;
    const marginRight = Math.floor(leftPx - titleLeft);
    const marginTop = Math.floor(topPx - titleTop);
    // console.log(`${marginRight}px, ${marginTop}px`);

    const supportAnimation = createAnimation()
      .addElement(title)
      .duration(500)
      .fromTo(
        'transform',
        'translate(0, 0) scale(1)',
        `translate(${marginRight}px, ${marginTop}px) scale(0.48)`
      ); // .afterAddClass('left');
    supportAnimation.play();
  }

  animateSupport(): void {
    const btn = document.getElementById('supportBtn');
    if (btn == null) return;
    const buttonLeft = btn.getBoundingClientRect().left;
    const buttonTop = btn.getBoundingClientRect().top;
    const width = btn.getBoundingClientRect().width;
    const rightPx = 16;
    const topPx = 55;
    const marginRight = window.innerWidth - rightPx - width - buttonLeft;
    const marginTop = topPx - buttonTop;
    // console.log(`${marginRight}px, ${marginTop}px`);

    const supportAnimation = createAnimation()
      .addElement(btn)
      .duration(500)
      .fromTo(
        'transform',
        'translate(0, 0)',
        `translate(${Math.floor(marginRight)}px, ${Math.floor(marginTop)}px)`
      ); //.afterAddClass('right');
    supportAnimation.play();
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
    const clickSupport = (): void =>
      this.props.history.push(
        `${this.props.history.location.pathname}/support`
      );
    return (
      <IonPage id="artist-page">
        <BackgroundImage
          gradient={gradient}
          backgroundImage={backgroundImage}
          blur={this.state.blur}
        />
        <IonHeader>
          <Header //will come from position top 160 to top 55 and center to left and from 60px to 24 (250%)
            type="fixed"
            centerContent={
              <h4
                className={`artist-page name title ${scrolled ? '' : ' hide'}`}
              >
                {name}
              </h4>
            }
            rightContent={
              <div className={scrolled ? 'supportByHide' : 'supportByShow'}>
                <SupportBy data={supportFans} />
              </div>
            }
            leftContent={<ButtonIcon onClick={clickBack} icon={<BackIcon />} />}
          />
        </IonHeader>

        <div className="artist-page glassPanel" />
        <div className="artist-page content">
          <IonContent
            scrollY={true}
            scrollEvents={true}
            onIonScroll={this.handleScroll.bind(this)}
          >
            <div className="emptySpace" />
            <div className="artistName center">
              <h2
                id="artistName"
                className={`title ${scrolled ? 'left' : 'center'}`}
              >
                {name}
              </h2>
            </div>

            <div className={`supportBtn ${scrolled ? 'right' : 'center'}`}>
              <Button
                id="supportBtn"
                onClick={clickSupport}
                color={'support'}
                label={'SUPPORT US'}
                type={'rounded'}
              />
            </div>

            <div id="menu" className={scrolled ? 'menuFixed ' : 'notFixed'}>
              <Menu
                tabs={this.props.artistTabs}
                activeId={this.props.activeArtistTab}
                onClick={this.handleMenu.bind(this)}
              />
            </div>

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
