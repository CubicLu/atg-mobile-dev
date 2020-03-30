import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage, createAnimation } from '@ionic/react';
import { Menu, SupportBy, ButtonSupport, Header } from './../../components';
import { ApplicationState } from './../../reducers';
import { artistBackground, getFixedTranslatePoints } from '../../utils';
import { ArtistInterface, MenuInterface, ShapesSize } from '../../interfaces';
import {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
} from './../../actions';
interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
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
interface CustomAnimation {
  animation: any;
  progressStarted: boolean;
  loaded: boolean;
}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props, {}> {
  private blur: boolean = false;
  private lastOffset: number = 0;
  private custom: CustomAnimation = {
    animation: undefined,
    progressStarted: false,
    loaded: false
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.currentArtist == null) {
      this.props.getArtistAPI(nextProps.match.params.id);
    } else if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getArtistAPI(nextProps.match.params.id);
    }
  }
  componentWillUnmount(): void {
    this.custom.animation = undefined;
  }
  loadAnimations(): void {
    const normalMenu = document.querySelector('#horizontal-menu');
    if (!normalMenu) return;
    this.custom.loaded = true;
    const itensHeader = document.querySelector('.offset-content')!;
    const supportButton = document.querySelector('#support-button')!;
    const artistTitle = document.querySelector('#artist-title')!;
    const aT = getFixedTranslatePoints(supportButton!, 16, 46, true);
    const bT = getFixedTranslatePoints(artistTitle, 22, 38);
    const menu = getFixedTranslatePoints(normalMenu!, 0, 80);
    this.custom.animation = createAnimation()
      .easing('ease-in')
      .duration(1600)
      .addAnimation([
        createAnimation()
          .addElement(document.querySelector('#support-bar')!)
          .fromTo('transform', 'translateX(0px)', 'translateX(250px)'),
        createAnimation()
          .addElement(document.querySelector('#fade-background')!)
          .fromTo('opacity', '0', `1`),
        createAnimation()
          .addElement(supportButton)
          .fromTo(
            'transform',
            'translate(0,0)',
            `translate(${aT.translateX}px,${aT.translateY}px)`
          ),
        createAnimation()
          .addElement(artistTitle)
          .fromTo(
            'transform',
            'translate3d(0,0,0) scale(1)',
            `translate3d(${bT.translateX}px,${bT.translateY}px,0) scale(0.6)`
          ),
        createAnimation()
          .addElement(normalMenu)
          .fromTo(
            'transform',
            'translateY(0)',
            `translateY(${menu.translateY}px)`
          ),
        createAnimation()
          .addElement(itensHeader)
          .fromTo('marginTop', '0px', '-120px')
        //use values between 100 and 200 -> 80px less than throttle
      ]);
    this.custom.progressStarted = true;
    this.custom.animation.progressStart(true);
  }

  handleScroll(event: any): void {
    if (!this.custom.loaded) this.loadAnimations();
    //use values between 100 and 200 on divisor to throttle
    const offset = Number(Math.min(event.detail.scrollTop / 200, 1).toFixed(2));
    this.blur = event.detail.scrollTop > 200;

    if (this.blur && this.lastOffset === 1) return;
    this.custom.animation.progressStep(offset);
    this.lastOffset = offset;
  }

  handleMenu(event: MenuInterface): void {
    const { match, history, updateSettingsProperty } = this.props;
    if (event.route && event.isPage === true) {
      history.push(event.route.replace(':id', match.params.id));
    } else if (event.onClick) {
      event.onClick();
    } else {
      updateSettingsProperty('activeArtistTab', event.id);
    }
  }

  render(): React.ReactNode {
    if (!this.props.currentArtist) {
      return <IonPage style={artistBackground(null)} id="artist-page" />;
    }
    const { currentArtist: artist, artistTabs, activeArtistTab } = this.props;
    return (
      <IonPage
        id="artist-page"
        style={artistBackground(artist)}
      >
        <Header leftBackHref="/home/profile" />
        <SupportBy data={artist.supportArtistFans} />
        <div id="fade-background" className="fade-background opacity-0 blur" />
        <div id="ion-item-header" className="artist-landing-header">
          <h2 id="artist-title" className={`artist-title artist-top`}>
            {artist.name}
          </h2>
          <br />
          <ButtonSupport
            id="support-button"
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

          <Menu
            tabs={artistTabs}
            activeId={activeArtistTab}
            onClick={this.handleMenu.bind(this)}
          />
        </div>
        <IonContent
          scrollY={true}
          scrollEvents={true}
          forceOverscroll={true}
          fullscreen={false}
          onIonScroll={this.handleScroll.bind(this)}
        >
          <div className="offset-content" />

          {artistTabs?.map(
            (data, i): React.ReactNode =>
              data.id === activeArtistTab &&
              React.createElement(data.component, { key: i })
          )}
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  const { artistTabs, activeArtistTab } = settings;
  return {
    currentArtist,
    artists,
    artistTabs,
    activeArtistTab
  };
};

export default connect(mapStateToProps, {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
})(ArtistPage);
