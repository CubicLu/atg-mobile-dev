import React from 'react';
import { connect } from 'react-redux';
import { CardImage } from './../../../components';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
  isPlaying: boolean;
}
interface Props extends StateProps {}

class ArtistDiscographyPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { isPlaying, currentArtist } = this.props;
    if (!currentArtist) return <div />;
    const { discography } = currentArtist;

    return (
      <div className={`artist-discography-page ${isPlaying && ' is-playing'}`}>
        <div className="mt-2 row">
          {discography?.map(
            (d, i): React.ReactNode => (
              <div key={i}>
                <CardImage
                  key={i}
                  routerLink={`/track/artist/${currentArtist.username}/${i}`}
                  routerDirection="forward"
                  image={d.cover}
                />
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

export default connect(mapStateToProps, {})(ArtistDiscographyPage);
