import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
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
  current_artist: ArtistInterface | null;
  artists: ArtistInterface[];
  is_playing: boolean;
  artist_tabs: MenuInterface[];
  active_artist_tab: string;
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
    if (this.props.current_artist == null) {
      this.props.getArtistAPI(this.props.match.params.id);
    }
  }

  componentWillUnmount(): void {
    this.props.updateArtistProperty('current_artist', null);
  }

  handleScroll(event: any): void {
    const { blur, scrolling } = this.state;
    if (!scrolling) return;
    const eventBlur = event.detail.currentY > 100;
    if (blur === eventBlur) return;
    this.setState({ blur: eventBlur, scrolling: false });
  }
  handleMenu(event: MenuInterface): void {
    if (event.is_page === true) {
      let route =
        event.route != null
          ? event.route.replace(':id', this.props.match.params.id)
          : '';
      this.props.history.push(route);
    } else if (event.onClick !== undefined) {
      event.onClick();
    } else {
      this.props.updateSettingsProperty('active_artist_tab', event.id);
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
            gradient={`180deg,${this.props.current_artist?.background_gradient?.color1}00,${this.props.current_artist?.background_gradient?.color1}d1,${this.props.current_artist?.background_gradient?.color2}`}
            backgroundImage={this.props.current_artist?.cover.background}
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
                      data={this.props.current_artist?.support_artist_fans}
                    />
                  }
                />
                <div className={'col s12 name'}>
                  <h1 className="title">{this.props.current_artist?.name}</h1>
                  <Button
                    onClick={(): void =>
                      this.props.history.push(
                        `${this.props.history.location.pathname}/support`
                      )
                    }
                    color={'support'}
                    label={'SUPPORT US'}
                    type={'rounded'}
                  />
                </div>

                <Menu
                  tabs={this.props.artist_tabs}
                  activeId={this.props.active_artist_tab}
                  onClick={this.handleMenu.bind(this)}
                />
              </div>
            </div>

            <div className={`artist-page bottom` + (fixed ? ' absolute' : '')}>
              {_.map(
                this.props.artist_tabs,
                (data, i): React.ReactNode =>
                  data.id === this.props.active_artist_tab &&
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
  const { current_artist, artists, loading } = artistAPI;
  const { is_playing, artist_tabs, active_artist_tab } = settings;
  return {
    current_artist,
    artists,
    is_playing,
    artist_tabs,
    active_artist_tab,
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
