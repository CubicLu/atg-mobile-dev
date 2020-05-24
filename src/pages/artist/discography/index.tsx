import React from 'react';
import { connect } from 'react-redux';
import { ImageSkeleton } from './../../../components';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../models';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
class ArtistDiscographyPage extends React.Component<StateProps> {
  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <div />;
    const { discography } = currentArtist;

    return (
      <div className="artist-discography-page row">
        {discography?.map(
          (d, i): React.ReactNode => (
            <div key={i} className="col s6">
              <ImageSkeleton
                style={{ minHeight: 165, minWidth: 140 }}
                routerLink={`/track/artist/${currentArtist.username}/${d.albumId}`}
                imgClassName="card-image"
                src={d.cover!}
              />
            </div>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default connect(mapStateToProps)(ArtistDiscographyPage);
