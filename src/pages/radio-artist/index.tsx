import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  HeaderOverlay,
  RadioPlayer,
  TicketIcon,
  ArrowRightIcon
} from '../../components';
import { ChannelInterface } from '../../interfaces';
import { RouteComponentProps, withRouter } from 'react-router';

interface MatchParams {
  artistRadioId: string;
}
interface StateProps {
  artistRadio: ChannelInterface[];
}

interface DispatchProps {}
interface Props
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class RadioArtistPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  render(): React.ReactNode {
    return (
      <IonPage id="radio-artist-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header
          leftBackButton={true}
          rightContent={
            <div className="mt-1 default-button gold" onClick={(): void => {}}>
              <TicketIcon color="#000000" />
            </div>
          }
          rightActionButton={false}
        />

        <BackgroundImage
          gradient={this.artistRadio.color}
          backgroundImage={this.artistRadio.image}
          backgroundTop={false}
          backgroundBottom={true}
          backgroundBottomOpacity={0.3}
        />

        <IonContent
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="row mt-4" />
          <div className="row mt-4" />
          <RadioPlayer
            title={this.artistRadio.title}
            subtitle={this.artistRadio.subtitle}
          />
          <div className="flex-justify-content-end">
            <div className="flex left-align f6">
              <div className="mr-1">
                <div>Previous Song </div>
                <span>River Runs Deep </span>
              </div>
              <span
                className="mx-3 mt-2"
                onClick={(): void => {
                  this.props.history.push('/radio/history');
                }}
              >
                View History&nbsp;
                <ArrowRightIcon width={8} height={10} stroke={3} />
              </span>
            </div>
          </div>

          <SectionTitle
            className="mt-2 mx-3 mb-05"
            leftClassName="text-30"
            title={`${this.artistRadio.name} RECOMENDS`}
            viewAll={false}
          />
          <SliderRadio className="f0 l1" data={this.radios} />
        </IonContent>
        <div className="row mt-4" />
      </IonPage>
    );
  }
  artistRadio = {
    id: '0',
    type: 'Artist',
    name: 'BOB MARLEY',
    title: 'EVERYTHING REGGAE',
    subtitle: 'BEATS OF THE ISLANDS',
    color: `180deg,#ffc90d, #034627`,
    image: require('./../../assets/img/background/home-screen-v-14-b.png')
  };
  radios = [
    {
      label: 'Pharrel Williams',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png'
    },
    {
      label: 'R&B',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.jpg'
    },
    {
      label: 'Hip Hop',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/hip-hop.jpg'
    },
    {
      label: 'Soul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/soul.jpg'
    },
    {
      label: 'Blues',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/blues.jpg'
    },
    {
      label: 'Jazz',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/jazz.jpg'
    },
    {
      label: 'Funk',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg'
    }
  ];
}

export default withRouter(RadioArtistPage);
