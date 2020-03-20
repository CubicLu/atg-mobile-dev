import React from 'react';
import { IonList, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CardArtist } from './../../../components';
import { getArtistsAPI } from './../../../actions';
import { ArtistInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  artists: ArtistInterface[];
  isPlaying: boolean;
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
      <IonContent>
        <div
          className={
            `profile-artists-page` + (this.props.isPlaying && ' is-playing')
          }
        >
          <IonList className="artist-list">
            {this.props.artists.map(
              (data, i): React.ReactNode => (
                <CardArtist key={i} artist={data} />
              )
            )}
          </IonList>
        </div>
      </IonContent>
    );
  }
}

const mapStateToProps = ({ artistAPI, settings }: ApplicationState): object => {
  const { artists } = artistAPI;
  const { isPlaying } = settings;
  return { artists, isPlaying };
};

export default withRouter(
  connect(mapStateToProps, { getArtistsAPI })(ProfileArtistsPage)
);
