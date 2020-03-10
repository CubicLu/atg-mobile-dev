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
  BackIcon
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

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistPage extends React.Component<Props> {
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

  render(): React.ReactNode {
    return (
      <IonPage id="artist-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient={`180deg,${this.props.currentArtist?.backgroundGradient?.color1}00,${this.props.currentArtist?.backgroundGradient?.color1}d1,${this.props.currentArtist?.backgroundGradient?.color2}`}
            backgroundImage={this.props.currentArtist?.cover.background}
          >
            <div
              className={
                `artist-page` + (this.props.isPlaying && ' is-playing')
              }
            >
              <Header
                leftContent={
                  <ButtonIcon
                    icon={<BackIcon />}
                    onClick={(): void => this.props.history.goBack()}
                  />
                }
              />
              <div className={'row'}>
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
              </div>

              <Menu
                tabs={this.props.artistTabs}
                activeId={this.props.activeArtistTab}
                onClick={(event: MenuInterface): void => {
                  if (event.isPage === true) {
                    let route =
                      event.route != undefined
                        ? event.route.replace(':id', this.props.match.params.id)
                        : '';
                    this.props.history.push(route);
                  } else {
                    this.props.updateSettingsProperty(
                      'activeArtistTab',
                      event.id
                    );
                  }
                }}
              />
              {_.map(
                this.props.artistTabs,
                (data, i): React.ReactNode => {
                  if (data.id === this.props.activeArtistTab) {
                    return React.createElement(data.component, { key: i });
                  }
                  return null;
                }
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
