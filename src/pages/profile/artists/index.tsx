import React from 'react';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CardArtist, _ } from './../../../components';
import { getArtistsAPI } from './../../../actions';
import { ArtistInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  artists: ArtistInterface[];
  is_playing: boolean;
}

interface DispatchProps {
  getArtistsAPI: () => any;
}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ProfileArtistsPage extends React.Component<Props> {
  componentDidMount(): void {
    this.props.getArtistsAPI();
  }

  render(): React.ReactNode {
    return (
      <div
        className={
          `profile-artists-page` + (this.props.is_playing && ' is-playing')
        }
      >
        <IonList className="artist-list">
          {_.map(
            this.props.artists,
            (data, i): React.ReactNode => {
              return <CardArtist key={i} artist={data} />;
            }
          )}
        </IonList>
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI, settings }: ApplicationState): object => {
  const { artists } = artistAPI;
  const { is_playing } = settings;
  return { artists, is_playing };
};

export default withRouter(
  connect(mapStateToProps, { getArtistsAPI })(ProfileArtistsPage)
);
