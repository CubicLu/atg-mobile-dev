import React from 'react';
import { connect } from 'react-redux';
import { CardImage } from './../../../components';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
class ArtistDiscographyPage extends React.Component<StateProps> {
  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <div />;
    const { discography } = currentArtist;

    return (
      <div className={`artist-discography-page`}>
        <div className="row">
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

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default connect(mapStateToProps)(ArtistDiscographyPage);
