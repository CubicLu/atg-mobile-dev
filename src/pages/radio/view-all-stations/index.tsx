import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { BackgroundImage, Header, Avatar } from '../../../components';
import { ShapesSize } from '../../../types';
import { radios } from '../../../constants/radios';

export default class ViewAllStationsPage extends React.PureComponent<{}> {
  render(): React.ReactNode {
    return (
      <IonPage id="radio-all-station">
        <BackgroundImage default />
        <Header
          leftBackButton={false}
          title="All Radios"
          titleClassName="artist-name"
          rightCloseButton={true}
          rightClickGoBack={true}
        />
        <IonContent scrollY={false}>
          <div className="row p-3 mt-10">
            {radios.map(
              (d, i): React.ReactNode => {
                return (
                  <div
                    key={i}
                    className="col s4 no-padding my-2 flex-column-center"
                  >
                    <Avatar
                      image={d.image}
                      type={ShapesSize.circle}
                      width={96}
                      height={96}
                      avatarUrl={`/radio/artist/${d.id}`}
                    />
                    <div className="f6">{d.label}</div>
                  </div>
                );
              }
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
