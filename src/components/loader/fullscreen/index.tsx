import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';

interface Props extends StateProps {}
interface StateProps {
  loading: boolean;
}
class LoaderFullscreenComponent extends React.Component<Props> {
  render(): React.ReactNode {
    if (!this.props.loading) return <div />;

    return (
      <div className="loader">
        <div className="icon" />
      </div>
    );
  }
}

const mapStateToProps = ({
  artistAPI,
  friendAPI,
  communityAPI,
  dashboardAPI
}: ApplicationState): StateProps => {
  const artistLoading = artistAPI.loading;
  const friendLoading = friendAPI.loading;
  const communityLoading = communityAPI.loading;
  const dashboardLoading = dashboardAPI.loading;

  const loading =
    artistLoading || friendLoading || communityLoading || dashboardLoading;

  return { loading };
};
export default connect(mapStateToProps)(LoaderFullscreenComponent);
