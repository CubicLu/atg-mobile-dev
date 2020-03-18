import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import {
  _,
  BackgroundImage,
  Header,
  Menu,
  ButtonIcon,
  BackIcon,
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
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  componentWillUnmount(): void {
    this.props.updateArtistProperty('currentArtist', null);
  }

  handleScroll(event: any): void {
    const { blur, scrolling } = this.state;
    if (!scrolling) return;
    const eventBlur = event.detail.currentY > 100;
    if (blur === eventBlur) return;
    this.setState({ blur: eventBlur, scrolling: false });
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
    const fixed = this.state.blur;
    return (
      <IonPage id="artist-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => this.setState({ scrolling: true })}
          onIonScrollEnd={(): any => this.setState({ scrolling: false })}
          onIonScroll={this.handleScroll.bind(this)}
        >
          <BackgroundImage
            gradient={`180deg,${this.props.currentArtist?.backgroundGradient?.color1}00 0%,${this.props.currentArtist?.backgroundGradient?.color1}d1 60%,${this.props.currentArtist?.backgroundGradient?.color2} 100%`}
            backgroundImage={this.props.currentArtist?.cover.background}
            blur={this.state.blur}
          >
            <div className={`artist-page`}>
              <div className={fixed ? 'row header-fixed' : 'row'}>
                <Header
                  leftContent={
                    <ButtonIcon
                      fixed={true}
                      icon={<BackIcon />}
                      onClick={(): void => this.props.history.goBack()}
                    />
                  }
                  rightContent={
                    <SupportBy
                      data={this.props.currentArtist?.supportArtistFans}
                    />
                  }
                  type={'default'}
                />
                <div className={'col s12 name'}>
                  <h1 className="title">{this.props.currentArtist?.name}</h1>
                  <ButtonSupport
                    supported={this.props.currentArtist?.support}
                    onClick={(): void =>
                      this.props.history.push(
                        `${this.props.history.location.pathname}/support`
                      )
                    }
                    type={'rounded'}
                    buttonType={'text'}
                    uppercase
                  />
                </div>

                <Menu
                  tabs={this.props.artistTabs}
                  activeId={this.props.activeArtistTab}
                  onClick={this.handleMenu.bind(this)}
                />
              </div>
            </div>

            <div className={`artist-page bottom` + (fixed ? ' absolute' : '')}>
              {_.map(
                this.props.artistTabs,
                (data, i): React.ReactNode =>
                  data.id === this.props.activeArtistTab &&
                  React.createElement(data.component, { key: i })
              )}
            </div>
          </BackgroundImage>
        </IonContent>
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
