import React from 'react';
import {
  BackgroundImage,
  LoaderFullscreen,
  Header,
  SliderStories
} from './../../components';
import { ApplicationState } from './../../reducers';
import { updateSettingsProperty } from './../../actions';
import { IonPage, IonContent } from '@ionic/react';
import { connect } from 'react-redux';
import PlusIcon from '../../components/icon/plus';

interface StateProps {
  isPlaying: boolean;
  loading: boolean;
}

interface DispatchProps {
  updateSettingsProperty: (property: string, value: any) => void;
}

interface Props extends StateProps, DispatchProps {}

class CommunityPage extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <IonPage id="community-page">
        <BackgroundImage
          gradient="180deg,#6A1EE4,#1e053b"
          backgroundTopDark
          backgroundTop
          backgroundTopOpacity={0.15}
          backgroundBottom
          backgroundBottomDark={false}
          backgroundBottomOrange={true}
          backgroundBottomOpacity={0.3}
        />
        <Header
          leftBackButton={false}
          leftContent={
            <div className="community">
              <h2 className="title community">Community</h2>
              <h1 className="subtitle community">Musical Goddess</h1>
            </div>
          }
          rightContent={
            <div className="default-button dark" onClick={(): void => {}}>
              <PlusIcon />
            </div>
          }
          rightActionButton={true}
        />
        <div
          className={
            `community-page content` + (this.props.isPlaying && ' is-playing')
          }
        >
          <IonContent>
            <SliderStories
              title={'ARTIST COMMUNITIES'}
              labelKey="name"
              imageKey="avatar"
              data={[
                {
                  name: 'Panthr COM',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Maia Davies',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'It’s Ok Now',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Panthr COM',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'Maia Davies',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                },
                {
                  name: 'It’s Ok Now',
                  avatar:
                    'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/community/stories/maia-davies.png'
                }
              ]}
            />
          </IonContent>
        </div>
        <LoaderFullscreen visible={this.props.loading} />
      </IonPage>
    );
  }
}

const mapStateToProps = ({
  settings,
  artistAPI
}: ApplicationState): StateProps => {
  const { isPlaying } = settings;
  const { loading } = artistAPI;
  return { isPlaying, loading };
};

export default connect(mapStateToProps, {
  updateSettingsProperty
})(CommunityPage);
