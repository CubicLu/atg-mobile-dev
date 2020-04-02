import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  HeaderOverlay,
  SliderVideo
} from '../../components';
import { RadioPlayButton, PlusButton } from '../../components/icon/player';
import { ChannelInterface } from '../../interfaces';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<MatchParams> {}
interface MatchParams {
  genre: string;
}

class RadioPage extends React.Component<Props> {
  componentDidUpdate(): void {
    this.getGenre();
  }
  UNSAFE_componentWillMount(): void {
    this.getGenre();
  }

  getGenre(): void {
    const { genre } = this.props.match.params;
    if (genre === this.paramGenre) return;
    this.currentGenre =
      this.genres.find(
        (a): boolean => a.name.toLocaleLowerCase() === genre.toLocaleLowerCase()
      ) || this.genres[0];
    this.paramGenre = genre;
    this.forceUpdate();
  }

  private headerRef: React.RefObject<any> = React.createRef();
  private paramGenre?: string = undefined;
  private currentGenre?: ChannelInterface = undefined;
  render(): React.ReactNode {
    if (!this.currentGenre) this.getGenre();
    return (
      <IonPage id="radio-page">
        <HeaderOverlay ref={this.headerRef} />
        <Header
          leftBackButton={false}
          rightActionButton={true}
          rightActionHref={'/home/radio/filter'}
        >
          <div className="absolute-logo-left">
            <span className="brand-title text-48 l05">panthr</span>
            <br />
            <span className="h3 mx-2 l08">AI-POWERED RADIO</span>
          </div>
        </Header>

        <BackgroundImage
          gradientOverlay
          gradient={this.currentGenre?.color}
          backgroundImage={this.currentGenre?.image}
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
                <span className="h0">{this.currentGenre?.title}</span>
                <br />
                <span className="h3">{this.currentGenre?.subtitle}</span>
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
          <div className=" card-station">
            <SliderVideo data={this.radios} />
          </div>
        </IonContent>
        <div className="row mt-4" />
      </IonPage>
    );
  }
  genres: ChannelInterface[] = [
    {
      id: '0',
      type: 'Genre',
      name: 'Default',
      title: 'EVERYTHING REGGAE',
      subtitle: 'BEATS OF THE ISLANDS',
      color: `180deg,#7A41FF00,#1B0334`,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/default.jpg'
    },
    {
      id: '1',
      type: 'Genre',
      name: 'Blues',
      title: 'KING BLACK ACID',
      subtitle: 'ROCKING YOUR SOUL',
      color: `180deg,#00000021,#000`,
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/blues.jpg'
    },
    {
      id: '4',
      type: 'Genre',
      name: 'Jazz',
      title: 'FOREVER JAZZ',
      subtitle: 'FREE PREVIEW',
      color: `180deg,#ffffff70,#000`,
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/jazz.jpg'
    },
    {
      id: '2',
      type: 'Genre',
      name: 'Funk',
      title: 'FUNK YOU UP!',
      subtitle: 'Listen Now',
      color: `180deg, #ff966600, #ae7005`,
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/funk.jpg'
    },
    {
      id: '3',
      type: 'Genre',
      name: 'Reggae',
      title: 'EVERYTHING REGGAE',
      subtitle: 'BEATS OF THE ISLANDS',
      color: `180deg,#ffc90d6e,#034627`,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/reggae.jpg'
    },
    {
      id: '6',
      type: 'Genre',
      name: 'Country',
      title: 'MUSIC FOR ALL',
      subtitle: 'Free Preview',
      color: `180deg,#7A41FF00,#1B0334`,
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/country.jpg'
    }
  ];
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

export default RadioPage;
