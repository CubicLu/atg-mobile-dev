import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './../../../reducers';
import { ArtistInterface, ShapesSize } from '../../../interfaces';
import { IonPage, IonImg } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  ButtonSupport,
  List
} from '../../../components';

interface StateProps {
  currentArtist: ArtistInterface | null;
}
interface DispatchProps {}
interface Props extends StateProps, DispatchProps {}

class TrackListPage extends React.Component<Props> {
  tracks = [
    { song: 'Marilyn Monroe', id: 1 },
    { song: 'Brand New', id: 2 },
    { song: 'Hunter', id: 3 }
  ];
  render(): React.ReactNode {
    const song: any = null;
    return (
      <IonPage id="track-list">
        <BackgroundImage
          gradient={`180deg,#aed8e5,#039e4a`}
          backgroundTop
          backgroundBottom
          backgroundBottomDark={false}
          bottomRotate
          backgroundTopDark
          backgroundTopOpacity={0.25}
          backgroundBottomOpacity={0.3}
        />
        <Header
          leftBackButton={true}
          centerContent={
            <ButtonSupport
              buttonType={'text'}
              uppercase
              type={ShapesSize.rounded}
            />
          }
          rightActionButton={true}
          rightActionYellow={true}
          rightActionOnClick={null}
        />

        <div className="initial-page-fullscreen">
          <div className="">
            <div className="cover-title">
              <IonImg className="image radius" src={song?.cover} />
              <span className="main-song">Girl{song?.name}&nbsp;</span>
              <br />
              <span className="main-artist">Pharell{song?.artist}&nbsp;</span>
            </div>

            <div style={{height: "100%", width: '100%'}}>
              <List
                data={this.tracks}
                title={''}
                viewAll={false}
                label={'song'}
                id={'id'}
              />
            </div>
          </div>
        </div>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ artistAPI }: ApplicationState): StateProps => {
  const { currentArtist } = artistAPI;
  return { currentArtist };
};

export default connect(mapStateToProps, {})(TrackListPage);
