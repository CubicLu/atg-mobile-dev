import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { _, CardImage } from './../../../components';
import {} from './../../../actions';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';

interface StateProps {
  current_artist: ArtistInterface | null;
  is_playing: boolean;
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistDiscographyPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div
        className={
          `artist-discography-page ` + (this.props.is_playing && ' is-playing')
        }
      >
        <div className="row">
          {_.map(
            this.props.current_artist?.discography,
            (data, i): React.ReactNode => {
              return <CardImage image={data.cover} key={i} />;
            }
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  settings
}: ApplicationState): StateProps => {
  const { current_artist } = artistAPI;
  const { is_playing } = settings;
  return { current_artist, is_playing };
};

export default withRouter(connect(mapStateToProps, {})(ArtistDiscographyPage));
