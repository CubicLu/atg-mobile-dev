import React from 'react';
import { CardArtist } from 'components';
import { getArtistsAPI } from 'actions';
import { ArtistInterface } from 'models';
import { ApplicationState } from 'reducers';
import { connect } from 'react-redux';
interface StateProps {
  artists: ArtistInterface[];
}
interface DispatchProps {
  getArtistsAPI: () => any;
}
interface Props extends StateProps, DispatchProps {}
class ProfileArtistsPage extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.props.artists.length === 0 && this.props.getArtistsAPI();
  }
  render(): React.ReactNode {
    return (
      <div className="content">
        {this.props.artists?.map(
          (data, i): React.ReactNode => (
            <CardArtist key={i} artist={data} />
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): object => {
  const { artists } = artistAPI;
  return { artists };
};
export default connect(mapStateToProps, { getArtistsAPI })(ProfileArtistsPage);
