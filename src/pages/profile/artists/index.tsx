import React from 'react';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CardArtist, _ } from './../../../components';
import {} from './../../../actions';
import { ArtistInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface Props extends RouteComponentProps {
  artists: ArtistInterface[];
}

class ProfileArtistsPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="profile-artists-page">
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

const mapStateToProps = ({ artistAPI }: ApplicationState): object => {
  const { artists } = artistAPI;
  return { artists };
};

export default withRouter(connect(mapStateToProps, {})(ProfileArtistsPage));
