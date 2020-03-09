import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { _, CardImage } from './../../../components';
import {} from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistDiscographyPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="artist-discography-page">
        <div className="row">
          {_.map(
            this.props.currentArtist?.discography,
            (data, i): React.ReactNode => {
              return <CardImage image={data.cover} key={i} />;
            }
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(connect(mapStateToProps, {})(ArtistDiscographyPage));
