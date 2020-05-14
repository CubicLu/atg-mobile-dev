import React from 'react';
import { IonContent, IonPage, IonRouterLink } from '@ionic/react';
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
          ABC
          <div className="row">
            {radios.map(
              (data, i): React.ReactNode => {
                return (
                  <IonRouterLink key={i} routerLink={`/radio/${data.id}`}>
                    <div className="col s4 no-padding">
                      <div>
                        <Avatar
                          image={data.image}
                          type={ShapesSize.circle}
                          width={96}
                          height={96}
                        />
                        <label>{data.label}</label>
                      </div>
                    </div>
                  </IonRouterLink>
                );
              }
            )}
          </div>
        </IonContent>
      </IonPage>
    );
  }
}
