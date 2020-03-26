import React from 'react';
import { SliderMixtapes } from './../../../components';

interface Props {}

class ProfileMixtapesPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className="profile-mixtapes">
        <SliderMixtapes />
      </div>
    );
  }
}

export default ProfileMixtapesPage;
