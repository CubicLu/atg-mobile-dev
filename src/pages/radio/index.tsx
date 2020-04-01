import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  HeaderOverlay,
  SliderVideo
} from '../../components';
import { RadioPlayButton, PlusButton } from '../../components/icon/player';
interface Props extends RouteComponentProps {}
class RadioPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    const reggaeUrl =
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/reggae.jpg';

    return (
      <IonPage id="radio-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header leftBackButton={false} rightActionButton={true}>
          <div className="fixed-logo-left">
            <span className="brand-title text-48 l05">panthr</span>
            <br />
            <span className="h3 mx-2 l08">AI-POWERED RADIO</span>
          </div>
        </Header>

        <BackgroundImage
          gradient={`180deg,#7A41FF,#1B0334`}
          backgroundImage={reggaeUrl}
          backgroundTopDark
          backgroundTop={false}
          backgroundBottom={false}
        />

        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="top-half flex-compass south center-align">
            <div className="flex left-align mx-auto">
              <div className="mt-1 mr-2">
                <RadioPlayButton />
              </div>
              <div>
                <span className="h0">EVERYTHING REGGAE</span>
                <br />
                <span className="h3">BEATS OF THE ISLANDS</span>
              </div>
            </div>
          </div>
          <SectionTitle className="mt-2 mx-3" title="STATIONS" viewAll={true} />
          <SliderRadio className="f6 l1" data={this.radios} />

          <SectionTitle
            className="mt-2 mx-3"
            leftClassName="flex"
            leftContent={<PlusButton />}
            title="MY CUSTOM STATIONS"
            viewAll={false}
          />
          <SliderVideo data={this.radios} />
        </IonContent>
        <div className="row mt-4" />
      </IonPage>
    );
  }
  radios = [
    {
      label: 'Pharrel Williams',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      label: 'R&B',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.png'
    },
    {
      label: 'Hip Hop',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/hip-hop.png'
    },
    {
      label: 'Soul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/soul.png'
    }
  ];
}

export default withRouter(RadioPage);
