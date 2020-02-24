import React from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent } from '@ionic/react';
import {
  BackgroundImage,
  HeaderProfile,
  MenuProfile,
  CirclesIcon,
  _
} from './../../components';
import { ApplitcationState } from './../../reducers';
import { updateSettingsProperty } from './../../actions';
import { TabsFanInterface } from '../../interfaces';

interface StateProps {
  activeFanTab: string;
  fanTabs: TabsFanInterface[];
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props extends StateProps, DispatchProps {}

class ProfilePage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="profile-page">
        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScrollStart={(): any => {}}
          onIonScroll={(): any => {}}
          onIonScrollEnd={(): any => {}}
          style={{ overflow: 'auto' }}
        >
          <BackgroundImage
            gradient="180deg, #691DE3 0%, #20043B 100%"
            top
            imageTop={<CirclesIcon opacity={0.25} />}
            topIsSvg
            unique={true}
          >
            <div className="profile-page">
              <HeaderProfile />
              <MenuProfile />
              {_.map(
                this.props.fanTabs,
                (data, i): React.ReactNode => {
                  if (data.id === this.props.activeFanTab) {
                    return React.createElement(data.component, { key: i });
                  }
                  return null;
                }
              )}
            </div>
          </BackgroundImage>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ settings }: ApplitcationState): StateProps => {
  const { activeFanTab, fanTabs } = settings;
  return { activeFanTab, fanTabs };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(ProfilePage);
