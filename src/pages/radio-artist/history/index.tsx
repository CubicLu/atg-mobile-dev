import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  IonContent,
  IonPage,
  IonList,
  IonItemSliding,
  IonItem,
  IonItemOptions
} from '@ionic/react';
import { ApplicationState } from '../../../reducers';
import {
  BackgroundImage,
  Header,
  Avatar,
  ButtonSupportIcon,
  ButtonIcon,
  AddPlaylistIcon,
  CloseIcon
} from '../../../components';
import { ShapesSize, Colors } from '../../../interfaces';

interface Props extends RouteComponentProps {}

class RadioHistoryPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <IonPage id="radio-history-page">
        <IonContent>
          <Header leftBackButton={true} title={'Everything Reggae History'} />
          <BackgroundImage
            gradient="180deg,#00baff,#0c090b"
            backgroundTopDark
            backgroundTop={true}
            backgroundTopOpacity={0.3}
            backgroundBottom
            backgroundBottomDark={false}
          />
          <IonList lines="none">
            {this.historySongs.map(
              (data, i): React.ReactNode => {
                return (
                  <IonItemSliding key={i}>
                    <IonItem>
                      <div className="row">
                        <div className="col s3 image">
                          <Avatar
                            type={ShapesSize.circle}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="col s6 info">
                          <span className="song">Jah Work</span>
                          <span className="artist">Ben Harper</span>
                        </div>
                        <div className="col s3 support">
                          <ButtonSupportIcon
                            artist={null}
                            supported={i % 2 === 0}
                          />
                        </div>
                      </div>
                    </IonItem>
                    
                  </IonItemSliding>
                );
              }
            )}
          </IonList>
        </IonContent>
      </IonPage>
    );
  }
  historySongs = [
    {
      song: 'When It Comes To You',
      artist: 'Sean Paul',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      song: 'King Whithout A Crown',
      artist: 'Matisyahu',
      isSupported: true,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    }
  ];
}

const mapStateToProps = ({}: ApplicationState): object => {
  return {};
};

export default withRouter(connect(mapStateToProps, {})(RadioHistoryPage));
