import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../reducers';
interface StateProps {
  loading: boolean;
}
class LoaderFullscreenComponent extends React.Component<StateProps> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.loading && (
          <div className="loader">
            <div className="icon" />
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { loading } = artistAPI;
  return { loading };
};
export default connect(mapStateToProps)(LoaderFullscreenComponent);
