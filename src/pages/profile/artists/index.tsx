import React from 'react';
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

interface Props extends StateProps, DispatchProps {}
class ProfileArtistsPage extends React.Component<Props> {
  UNSAFE_componentWillMount(): void {
    this.props.getArtistsAPI();
  }

  render(): React.ReactNode {
    const { artists } = this.props;
    return (
      <div className="content">
        {artists?.map(
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
