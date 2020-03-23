import React from 'react';
import { BackgroundImage, Header, Menu } from './../../../components';
import {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
} from './../../../actions';
import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { ArtistInterface, MenuInterface } from '../../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
  deepDiveTabs: MenuInterface[];
  activeDeepDiveTab: string;
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
  fixed: boolean;
  scrolling: boolean;
}

interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class ArtistDeepDivePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fixed: false,
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

  handleScroll(event: any): void {
    const { fixed, scrolling } = this.state;
    if (!scrolling) return;
    const eventFixed = event.detail.scrollTop > 100;
    if (fixed === eventFixed) return;
    this.setState({ fixed: eventFixed, scrolling: false });
  }

  handleMenu(event: MenuInterface): void {
    this.props.updateSettingsProperty('activeDeepDiveTab', event.id);
  }

  render(): React.ReactNode {
    const { currentArtist, deepDiveTabs, activeDeepDiveTab } = this.props;
    if (!currentArtist) return <IonPage />;
    return (
      <IonPage id="artist-deep-dive-dive-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={this.handleScroll.bind(this)}
        >
          <BackgroundImage
            backgroundImage={currentArtist.cover.deepDive}
            blur={this.state.fixed}
          >
            <div className={`artist-deep-dive-page`}>
              <div className={this.state.fixed ? 'row header-fixed' : 'row'}>
                <Header
                  rightActionButton
                  rightActionOnClick={(): void => this.props.history.goBack()}
                  centerContent={
                    <div className="center-col">
                      <div className="title-page">Deep Dive</div>
                      <div className="artist-name">{currentArtist.name}</div>
                    </div>
                  }
                />
                <div className="title-container">
                  <div className="title-page">Deep Dive</div>
                  <div className="artist-name">{currentArtist.name}</div>
                </div>
                <Menu
                  tabs={deepDiveTabs}
                  activeId={activeDeepDiveTab}
                  onClick={this.handleMenu.bind(this)}
                />
              </div>
            </div>

            <div
              className={
                `artist-deep-dive-page bottom` +
                (this.state.fixed ? ' absolute' : '')
              }
            >
              {deepDiveTabs?.map(
                (d, i): React.ReactNode =>
                  d.id === activeDeepDiveTab &&
                  React.createElement(d.component, { key: i })
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
  const { currentArtist, loading } = artistAPI;
  const { isPlaying, deepDiveTabs, activeDeepDiveTab } = settings;
  return {
    currentArtist,
    isPlaying,
    deepDiveTabs,
    activeDeepDiveTab,
    loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty,
    getArtistAPI
  })(ArtistDeepDivePage)
);
