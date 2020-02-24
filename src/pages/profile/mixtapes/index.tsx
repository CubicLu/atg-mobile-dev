import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SliderMixtapes } from './../../../components';
import {} from './../../../actions';

interface Props extends RouteComponentProps {}

class ProfileMixtapesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="profile-mixtapes-page">
        <SliderMixtapes />
      </div>
    );
  }
}

export default withRouter(ProfileMixtapesPage);
