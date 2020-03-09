import React from 'react';
import { Header, ButtonIcon, BackIcon, _ } from './../../../components';
import { IonContent } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArtistInterface } from '../../../interfaces';
import {
  updateArtistProperty,
  updateSettingsProperty
} from './../../../actions';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface State {}

interface StateProps {
  currentArtist: ArtistInterface | null;
  artists: ArtistInterface[];
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

class ArtistEventsPage extends React.Component<Props> {
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
      <IonContent
        scrollY={true}
        scrollEvents={true}
        onIonScrollStart={(): any => {}}
        onIonScroll={(): any => {}}
        onIonScrollEnd={(): any => {}}
        style={{ overflow: 'auto', zIndex: 1, backgroundColor: '#000' }}
      >
        <div className="artist-events-page">
          <div
            style={{
              backgroundImage: `url(${this.props.currentArtist?.cover.event})`
            }}
            className="background"
          />
          <Header
            leftContent={
              <ButtonIcon icon={<BackIcon />} onClick={(): void => {}} />
            }
            centerContent={<h1 className="title">Events</h1>}
          />
          <div className="row">
            <div className="col s12 content-list">
            
            </div>
          </div>
        </div>
      </IonContent>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist, artists } = artistAPI;
  return { currentArtist, artists };
};

export default withRouter(
  connect(mapStateToProps, {
    updateArtistProperty,
    updateSettingsProperty
  })(ArtistEventsPage)
);
