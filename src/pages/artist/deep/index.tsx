import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {} from './../../../components';
import {} from './../../../actions';
import { ApplicationState } from './../../../reducers';

interface Props extends RouteComponentProps {}

class ArtistDeepPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return <div className="artist-deep-page"></div>;
  }
}

const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(ArtistDeepPage));
