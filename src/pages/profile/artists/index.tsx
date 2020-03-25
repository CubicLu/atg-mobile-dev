import React from 'react';
import { IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { CardArtist } from './../../../components';
import { getArtistsAPI } from './../../../actions';
import { ArtistInterface } from '../../../interfaces';
import { ApplicationState } from '../../../reducers';
import { connect } from 'react-redux';

interface StateProps {
  artists: ArtistInterface[];
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
    const { artists } = this.props;
    if (artists && artists.length > 0) {
      return (
        <IonContent>
          {artists.map(
            (data, i): React.ReactNode => (
              <CardArtist key={i} artist={data} />
            )
          )}
        </IonContent>
      );
    }
    return <IonContent />;
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): object => {
  const { artists } = artistAPI;
  return { artists };
};

export default connect(mapStateToProps, { getArtistsAPI })(ProfileArtistsPage);
