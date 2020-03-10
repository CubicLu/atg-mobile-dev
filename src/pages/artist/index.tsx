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
  SupportBy
} from './../../components';
import { updateArtistProperty, updateSettingsProperty } from './../../actions';
import { ApplicationState } from './../../reducers';
import { ArtistInterface, MenuInterface } from '../../interfaces';

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
  constructor(props: Props) {
    super(props);
    this.state = {
      blur: false
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      let artist = _.find(
        this.props.artists,
        (x): any => x.username === nextProps.match.params.id
      );
      if (artist !== undefined) {
        this.props.updateArtistProperty('currentArtist', artist);
      }
    }
  }

  UNSAFE_componentWillMount(): void {
    if (this.props.currentArtist == null) {
      let artist = _.find(
        this.props.artists,
        (x): any => x.username === this.props.match.params.id
      );

      if (artist !== undefined) {
        this.props.updateArtistProperty('currentArtist', artist);
      }
    }
  }

  handleScroll(event: any): void {
    const { blur } = this.state;
    const eventBlur = event.detail.currentY > 100;
    if (blur === eventBlur) return;
    this.setState({ blur: eventBlur });
    console.log('blur changed to ', eventBlur, ' from ', blur);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="artist-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={this.handleScroll.bind(this)}
          onIonScrollEnd={(): any => {}}
        >
          <BackgroundImage
            gradient={`180deg,${this.props.currentArtist?.backgroundGradient?.color1}00,${this.props.currentArtist?.backgroundGradient?.color1}d1,${this.props.currentArtist?.backgroundGradient?.color2}`}
            backgroundImage={this.props.currentArtist?.cover.background}
            blur={this.state.blur}
          >
            <div
              className={
                `artist-page` + (this.props.isPlaying && ' is-playing')
              }
            >
              <div
                className={
                  this.state.blur ? 'row content-fixed' : 'row not-fixed'
                }
              >
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
                />
                <div className={'col s12 name'}>
                  <h1 className="title">{this.props.currentArtist?.name}</h1>
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
                  tabs={this.props.artistTabs}
                  activeId={this.props.activeArtistTab}
                  onClick={(event: MenuInterface): void => {
                    if (event.isPage === true) {
                      let route =
                        event.route != null
                          ? event.route.replace(':id', this.props.match.params.id)
                          : '';
                      this.props.history.push(route);
                    } else if (event.onClick !== undefined) {
                      event.onClick();
                    } else {
                      this.props.updateSettingsProperty(
                        'activeArtistTab',
                        event.id
                      );
                    }
                  }}
                />
              </div>
              {_.map(
                this.props.artistTabs,
                (data, i): React.ReactNode =>
                  data.id === this.props.activeArtistTab &&
                  React.createElement(data.component, { key: i })
              )}
            </div>
          </BackgroundImage>
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
  const { isPlaying, artistTabs, activeArtistTab } = settings;
  return { currentArtist, artists, isPlaying, artistTabs, activeArtistTab };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty
  })(ArtistPage)
);
