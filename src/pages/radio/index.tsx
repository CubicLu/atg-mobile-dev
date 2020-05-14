import React from 'react';
import { IonPage, IonContent, IonRouterLink } from '@ionic/react';
import {
  Header,
  BackgroundImage,
  SectionTitle,
  SliderRadio,
  SliderRadios
} from '../../components';
import { RadioPlayButton, PlusButton } from '../../components/icon/player';
import { ChannelInterface, RadioInterface } from '../../models';
import { RouteChildrenProps } from 'react-router';
import { Nullable } from '../../types';

interface Props extends RouteChildrenProps<MatchParams> {}
interface MatchParams {
  genre: string;
}
interface State {
  paramGenre: Nullable<string>;
  currentGenre: Nullable<ChannelInterface>;
}

export default class RadioPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      paramGenre: null,
      currentGenre: null
    };
  }

  UNSAFE_componentWillMount(): void {
    this.getGenre();
  }

  getGenre(): void {
    const { genre } = this.props.match?.params!;
    if (!genre) {
      return this.setState({ currentGenre: this.genres[0] });
    }

    const current = this.state.currentGenre?.name.toLocaleLowerCase();
    if (genre?.toLocaleLowerCase() === current) return;

    const currentGenre =
      this.genres.find(
        (a): boolean =>
          a?.name?.toLocaleLowerCase() === genre?.toLocaleLowerCase()
      ) || this.genres[0];

    this.setState({ currentGenre });
  }

  render(): React.ReactNode {
    return (
      <IonPage id="radio-page">
        <Header
          leftBackButton={false}
          rightActionButton={true}
          rightActionHref={'/radio/filter'}
        >
          <div className="absolute-logo-left">
            <span className="brand-title text-48 l05">panthr</span>
            <br />
            <span className="h3 mx-2 l08">AI-POWERED RADIO</span>
          </div>
        </Header>

        <BackgroundImage
          gradientOverlay={true}
          gradient={this.state.currentGenre?.color}
          backgroundImage={this.state.currentGenre?.image}
          backgroundTop={false}
          backgroundBottom={false}
        />

        <IonContent>
          <div className="top-half flex-compass south center-align">
            <div className="flex left-align mx-auto">
              <div className="mt-1 mr-2">
                <RadioPlayButton />
              </div>
              <div>
                <span className="h0">{this.state.currentGenre?.title}</span>
                <br />
                <span className="h3">{this.state.currentGenre?.subtitle}</span>
              </div>
            </div>
          </div>
          <SectionTitle
            className="mt-2 mx-3"
            title="STATIONS"
            viewAll={true}
            viewAllUrl="/radio/view-all"
          />
          <SliderRadio
            className="f6 l1"
            diameter={'110px'}
            data={this.radios}
          />

          <IonRouterLink
            routerDirection="forward"
            routerLink="/radio/station/create"
          >
            <SectionTitle
              className="mt-2 mx-3"
              leftClassName="flex"
              leftContent={<PlusButton />}
              title="MY CUSTOM STATIONS"
              viewAll={false}
            />
          </IonRouterLink>
          <div className="card-station">
            <SliderRadios canEdit={true} data={this.radios} />
          </div>
        </IonContent>
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
      color: '180deg,#7A41FF00,#1B0334',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/default.jpg'
    },
    {
      id: '1',
      type: 'Genre',
      name: 'Blues',
      title: 'KING BLACK ACID',
      subtitle: 'ROCKING YOUR SOUL',
      color: '180deg,#00000021,#000',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/blues.jpg'
    },
    {
      id: '4',
      type: 'Genre',
      name: 'Jazz',
      title: 'FOREVER JAZZ',
      subtitle: 'FREE PREVIEW',
      color: '180deg,#ffffff70,#000',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/jazz.jpg'
    },
    {
      id: '2',
      type: 'Genre',
      name: 'Funk',
      title: 'FUNK YOU UP!',
      subtitle: 'Listen Now',
      color: '180deg, #ff966600, #ae7005',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/funk.jpg'
    },
    {
      id: '3',
      type: 'Genre',
      name: 'Reggae',
      title: 'EVERYTHING REGGAE',
      subtitle: 'BEATS OF THE ISLANDS',
      color: '180deg,#bb9b00b5,#034627',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/reggae.jpg'
    },
    {
      id: '6',
      type: 'Genre',
      name: 'Country',
      title: 'MUSIC FOR ALL',
      subtitle: 'Free Preview',
      color: '180deg,#7A41FF00,#1B0334',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/radio/country.jpg'
    }
  ];
  radios: RadioInterface[] = [
    {
      label: 'Pharrel',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/playlist.png',
      id: 'pharrell-williams'
    },
    {
      id: 'pharrell-williams',
      label: 'R&B',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/reb.jpg'
    },
    {
      id: 'pharrell-williams',
      label: 'Hip Hop',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/geners/hip-hop.jpg'
    },
    {
      id: 'pharrell-williams',
      label: 'Soul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/soul.jpg'
    },
    {
      id: 'pharrell-williams',
      label: 'Blues',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/blues.jpg'
    },
    {
      id: 'pharrell-williams',
      label: 'Jazz',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/jazz.jpg'
    },
    {
      id: 'pharrell-williams',
      label: 'Funk',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg'
    }
  ];
}
