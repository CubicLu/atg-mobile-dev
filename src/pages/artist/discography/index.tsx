import React from 'react';
import { connect } from 'react-redux';
import { CardImage } from './../../../components';

import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
}

interface DispatchProps {}

interface Props extends StateProps, DispatchProps, RouteComponentProps {}

class ArtistDiscographyPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { isPlaying, currentArtist } = this.props;
    if (!currentArtist) return <div />;
    const { discography } = currentArtist;

    return (
      <div className={`artist-discography-page ${isPlaying && ' is-playing'}`}>
        <div className="row">
          {discography?.map(
            (d, i): React.ReactNode => (
              <div
                onClick={(): void =>
                  this.props.history.push(
                    `/track/artist/${currentArtist.username}/${i}`
                  )
                }
                key={i}
              >
                <CardImage key={i} image={d.cover} />
              </div>
            )
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
  const { currentArtist } = artistAPI;
  const { isPlaying } = settings;
  return { currentArtist, isPlaying };
};

export default withRouter(connect(mapStateToProps, {})(ArtistDiscographyPage));
