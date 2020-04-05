import React from 'react';
import { connect } from 'react-redux';
import { CardImage } from './../../../components';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface } from '../../../interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface Props extends StateProps, RouteComponentProps {}

class ArtistDiscographyPage extends React.Component<Props> {
  render(): React.ReactNode {
    const { currentArtist } = this.props;
    if (!currentArtist) return <div />;
    const { discography } = currentArtist;

    return (
      <div className={`artist-discography-page`}>
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

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default withRouter(connect(mapStateToProps)(ArtistDiscographyPage));
