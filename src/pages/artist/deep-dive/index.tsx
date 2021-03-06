import React from 'react';
import { BackgroundImage, Header, Menu } from './../../../components';
import {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
} from './../../../actions';
import { IonContent, IonPage } from '@ionic/react';

import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { ArtistInterface, MenuInterface } from '../../../models';
import { RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
  deepDiveTabs: MenuInterface[];
  activeDeepDiveTab: string;
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
  componentDidUpdate(prevProps: Props): void {
    if (this.props.currentArtist === null) {
      return this.props.getArtistAPI(this.props.match.params.id);
    }
    if (
      prevProps.match.params.id !== this.props.match.params.id &&
      this.props.currentArtist?.username !== this.props.match.params.id
    ) {
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

  getActiveDiveTab(): React.ReactNode {
    const active = this.props.deepDiveTabs.find(
      (d): boolean => d.id === this.props.activeDeepDiveTab
    );
    if (!active) return null;

    return <active.component />;
  }
  render(): React.ReactNode {
    const { currentArtist, deepDiveTabs, activeDeepDiveTab } = this.props;
    const fixed = this.state.fixed ? 'absolute' : '';
    return (
      <IonPage id="artist-deep-dive-dive-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e): void => this.handleScroll(e)}
        >
          <BackgroundImage
            backgroundImage={currentArtist?.cover.deepDive}
            blur={this.state.fixed}
          />
          <div className={'artist-deep-dive-page'}>
            <div className={this.state.fixed ? 'row header-fixed' : 'row'}>
              <Header
                rightActionButton
                rightClickGoBack={true}
                centerContent={
                  <div className="center-col">
                    <div className="h2 l1">Deep Dive</div>
                    <div className="f6 l1">{currentArtist?.name}</div>
                  </div>
                }
              />
              <div className="title-container">
                <div className="h000">Deep Dive</div>
                <div className="f1">{currentArtist?.name}</div>
              </div>
              <Menu
                tabs={deepDiveTabs}
                activeId={activeDeepDiveTab}
                onClick={(e): void => this.handleMenu(e)}
              />
            </div>
          </div>

          <div className={`artist-deep-dive-page bottom ${fixed}`}>
            {this.getActiveDiveTab()}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  const { deepDiveTabs, activeDeepDiveTab } = settings;
  return {
    currentArtist,
    deepDiveTabs,
    activeDeepDiveTab
  };
};

export default connect(mapStateToProps, {
  updateArtistProperty,
  updateSettingsProperty,
  getArtistAPI
})(ArtistDeepDivePage);
