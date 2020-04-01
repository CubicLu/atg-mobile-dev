import React from 'react';
import { IonPage, IonContent, IonSearchbar } from '@ionic/react';
import {
  Header,
  HeaderOverlay,
  BackgroundImage,
  SectionTitle,
  ArrowRightIcon
} from '../../../components';
import { ChannelInterface, StationInterface } from '../../../interfaces';
import Slider, { Settings } from 'react-slick';
interface Props {}
interface State {
  searchText?: string;
}

class RadioFilterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchText: '' };
  }
  private headerRef: React.RefObject<any> = React.createRef();

  searchFilter(array: ChannelInterface[]): any[] {
    const text = this.state?.searchText;
    if (!(text && text.length > 0)) {
      return array;
    }
    return array.filter((x: ChannelInterface): boolean =>
      x.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }
  performSearch(value: string): void {
    this.setState({ searchText: value });
  }
  render(): React.ReactNode {
    const settings: Settings = {
      dots: false,
      infinite: false,
      arrows: false,
      speed: 500,
      variableWidth: false,
      verticalSwiping: false,
      vertical: false,
      swipe: true,
      rows: 3,
      slidesPerRow: 2
    };

    return (
      <IonPage id="radio-filter-page">
        <Header
          title="Filter"
          titleLeft={true}
          leftBackButton={false}
          rightCloseButton={true}
          rightCloseHref={'/home/radio'}
          direction="POP"
        />
        <HeaderOverlay ref={this.headerRef} />
        <BackgroundImage
          gradient={`180deg,#22143c,#1a1123`}
          backgroundTop
          backgroundBottom
          backgroundBottomDark={false}
          backgroundTopDark
          backgroundTopOpacity={1}
          backgroundBottomOpacity={0.17}
        />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
        >
          <div className="container-top-bottom fluid">
            <div className="f4 l1 mx-4 center-align">
              What would you like to listen to?
            </div>

            <div id="atg-search" className="mx-4 mt-3">
              <IonSearchbar
                className="atg-search px-4"
                mode="ios"
                placeholder="Search..."
                clearIcon="close-sharp"
                debounce={150}
                searchIcon="search-sharp"
                value={this.state.searchText}
                onIonChange={(e): void => this.performSearch(e.detail.value!)}
              />
            </div>

            <div className="mt-3 search-outline" />

            <SectionTitle title="GENRE" className="mx-3 mt-3 mb-2" />
            <div className="genres mx-2">
              <Slider {...settings}>
                {this.searchFilter(this.genres).map(
                  (genre: ChannelInterface, i: number): any => (
                    <div key={i} className="card-genre-col mx-1">
                      <div
                        className={`card-genre mb-1`}
                        style={{
                          background: `linear-gradient(180deg,${genre.color}00,${genre.color}), url(${genre.image})`
                        }}
                      />
                      <span className={'mx-05 f4'}>{genre.name}</span>
                    </div>
                  )
                )}
              </Slider>
            </div>

            <SectionTitle title="ERA" className="mx-3 mt-4 mb-2" />
            <div className="eras row mx-2 fluid">
              {this.searchFilter(this.eras).map(
                (era, i): React.ReactElement => (
                  <div
                    key={i}
                    style={{ background: era.color }}
                    className="card-era mx-1 flex-column-center"
                  >
                    <span className="f4 bold">{era.name}</span>
                  </div>
                )
              )}
            </div>

            <SectionTitle title="VIBE SCALE" className="mx-3 mt-4 mb-2" />
            <div className="vibes mx-3 my-2 mb-5">
              {this.searchFilter(this.vibes).map(
                (vibe, i): React.ReactElement => (
                  <div className="vibe flex row mt-1 f4" key={i}>
                    <div className="align-start flex-align-center">
                      <div
                        className="vibe-icon center-align mr-1"
                        style={{ background: vibe.color }}
                      >
                        <span className="h1 l11 bold">{vibe.icon}</span>
                      </div>
                      <span className="mx-1 f4 l15">{vibe.name}</span>
                    </div>
                    <div className="align-end my-auto l1">
                      <ArrowRightIcon />
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="m-1 ml-2 row badge-row flex">
              {this.tags.map(
                (tag, i): React.ReactElement => (
                  <span
                    key={i}
                    className={`mx-1 f6 my-auto l2 badge-item 
                    ${i === 3 ? 'active' : ''}`}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <SectionTitle title="STATIONS" className="mx-3 mt-4 mb-2" />
            <div className="row mx-3 mb-5">
              {this.stations.map(
                (station): React.ReactElement => (
                  <div
                    key={station.id}
                    className={`col s4 no-padding p-1 flex-column-center mb-2 center-align`}
                  >
                    <div
                      className={`station circle`}
                      style={{
                        background: `url(${station.image})`
                      }}
                    ></div>
                    <div className="mt-1 mb-2 f7 l1">{station.name}</div>
                  </div>
                )
              )}
            </div>

            <div className="mb-5" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  tags: string[] = [
    'Dance-Pop',
    'Indie Rock',
    'Emo',
    'Pop-Punk',
    'Contemporary R&B',
    'Hip-Hop',
    'Reggaeton',
    'Electronica',
    'Hard Rock',
    'Alternative Metal',
    'New Wave Revival',
    'Teen Pop',
    'Boy Bands',
    'Emo',
    'Pop-Punk',
    'Contemporary R&B',
    'Hip-Hop',
    'Reggaeton',
    'Electronica',
    'Hard Rock',
    'Alternative Metal'
  ];
  eras: ChannelInterface[] = [
    {
      id: 'e1',
      type: 'Era',
      name: 'Modern',
      color: '#01a7d1',
      tags: [
        'Pop',
        'Rock',
        'Folk & singer-songwriter',
        'Sertanejo',
        'Gospel',
        'Funk',
        'Samba and Pagode',
        'Rap',
        'Electronic',
        'Dance & EDM',
        'Brazilian music',
        'Forró'
      ]
    },
    {
      id: 'e2',
      type: 'Era',
      name: '2000s',
      color: '#db115f',
      tags: [
        'Dance-Pop',
        'Indie Rock',
        'Emo',
        'Pop-Punk',
        'Contemporary R&B',
        'Hip-Hop',
        'Reggaeton',
        'Electronica',
        'Hard Rock',
        'Alternative Metal',
        'New Wave Revival',
        'Teen Pop',
        'Boy Bands'
      ]
    },
    {
      id: 'e3',
      type: 'Era',
      name: '90s',
      color: '#810d6e',
      tags: [
        'Grunge',
        'Alternative/College Rock',
        'Technotronic',
        'Hip-Hop',
        'Gangster Rap',
        'Bubblegum Pop',
        'Boy Bands/Girl Groups',
        'Pop-Punk',
        'Metal',
        'Ska',
        'Contemporary R&B',
        'Country-Pop',
        'Britpop'
      ]
    },
    {
      id: 'e4',
      type: 'Era',
      name: '80s',
      color: '#f6852b',
      tags: [
        'New Wave',
        'Synth-Pop',
        'Hair Metal',
        'Hip-Hop',
        'Gothic Rock',
        'Heavy Metal',
        'Pop',
        'Alternative Rock',
        'Hardcore Punk',
        'Contemporary R&B',
        'Country'
      ]
    },
    {
      id: 'e5',
      type: 'Era',
      name: '70s',
      color: '#00a850',
      tags: [
        'Disco/Dance',
        'Progressive Rock',
        'Punk',
        'New Wave',
        'Funk',
        'Soul',
        'Glam Rock',
        'Soft Rock',
        'Singer-Songwriter',
        'Folk',
        'Souther Rock',
        'Country-Pop'
      ]
    },
    {
      id: 'e6',
      type: 'Era',
      name: '60s',
      color: '#8dc53e',
      tags: [
        'Folk',
        'Surf Rock',
        'Psychedelic Rock',
        'Blues-Rock',
        'Progressive Rock',
        'Garage Rock',
        'Pop',
        'Soul',
        'R&B',
        'Country',
        'British Invasion',
        'Latin Rock'
      ]
    }
  ];
  vibes: ChannelInterface[] = [
    {
      id: 'v1',
      type: 'Vibe',
      icon: 'h',
      name: 'Happy',
      color: '#01add9',
      tags: ['Happy Rock', 'Internet Stars', 'Contemporary R&B', 'Pop-Punk']
    },
    {
      id: 'v2',
      type: 'Vibe',
      icon: 'r',
      name: 'Romantic',
      color: '#fcc505',
      tags: [
        'Disney Artists',
        'Teen Pop',
        'It´s a match',
        'Romantic evening',
        'Jazzy Romance'
      ]
    },
    {
      id: 'v3',
      type: 'Vibe',
      icon: 'o',
      name: 'Optimistic',
      color: '#8dc53e',
      tags: ['Adult Contemporary', 'Electronica', 'Twerk It Out']
    },
    {
      id: 'v4',
      type: 'Vibe',
      icon: 'a',
      name: 'Anticipation',
      color: '#810d6e',
      tags: ['New Wave Revival', 'Sabor Latino', 'Pura Cumbia']
    },
    {
      id: 'v5',
      type: 'Vibe',
      icon: 'e',
      name: 'Energic',
      color: '#db115f',
      tags: ['Indie Rock', 'Hip-Hop', 'Reggaeton']
    }
  ];
  genres: ChannelInterface[] = [
    {
      id: '1',
      type: 'Genre',
      name: 'Blues',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/blues.jpg',
      color: '#01a7d1',
      tags: [
        'Late Night Blues',
        'Acoustic Blues',
        'Lady Sings The Blues',
        'Blues at work',
        'Blues Rock Roadtrip',
        'Chicago Blues',
        'Delta blues',
        'Women in Blues'
      ]
    },
    {
      id: '4',
      type: 'Genre',
      name: 'Jazz',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/jazz.jpg',
      color: '#db115f',
      tags: [
        'Jazz Cocoon',
        'Midnight Jazz',
        'Jazzy Romance',
        'Women of Jazz',
        'Cool Jazz',
        'Late Night Blues',
        'Forever Jazz',
        'Chill Jazz'
      ]
    },
    {
      id: '2',
      type: 'Genre',
      name: 'Funk',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg',
      color: '#00a850',
      tags: ['Best Funk Ever', 'Black Power']
    },
    {
      id: '5',
      type: 'Genre',
      name: 'Soul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/soul.jpg',
      color: '#000000',
      tags: ['Feel Good Alternative', 'Best Alternatives', 'Downcast']
    },
    {
      id: '3',
      type: 'Genre',
      name: 'Lounge',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/lounge.jpg',
      color: '#f6852b',
      tags: ['Indie Folk Energy', 'Chill to Folk', 'Lazy Indie']
    },
    {
      id: '6',
      type: 'Genre',
      name: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/country.jpg',
      color: '#8dc53e',
      tags: ['Soul meets Hip Hop', 'Morning Soul & Funk']
    }
  ];

  stations: StationInterface[] = [
    {
      name: 'The Weeknd',
      id: 'the-weeknd',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/the-weeknd-gvx-106x106.jpg'
    },
    {
      name: 'Lil Uzi Vert',
      id: 'lil-uzi',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lil-uzi-vert-mre-106x106.jpg'
    },
    {
      name: 'Kenny Rogers',
      id: 'kenny-rogers',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/kenny-rogers-vja-106x106.jpg'
    },
    {
      name: 'Post Malone',
      id: 'post-malone',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/post-malone-1vw-106x106.jpg'
    },
    {
      name: 'Conan Gray',
      id: 'conan-gray',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/conan-gray-ukk-106x106.jpg'
    },
    {
      name: 'Billie Eilish',
      id: 'billie-eilish',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/billie-eilish-1e3-106x106.jpg'
    },
    {
      name: 'Lil Baby',
      id: 'lil-baby',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lil-baby-nwx-106x106.jpg'
    },
    {
      name: 'Roddy Ricch',
      id: 'roddy-ricch',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/roddy-ricch-eqp-106x106.jpg'
    },
    {
      name: 'Luke Combs',
      id: 'luke-combs',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/luke-combs-y14-106x106.jpg'
    },
    {
      name: 'Justin Bieber',
      id: 'justin-bieber',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/justin-bieber-4oh-106x106.jpg'
    },
    {
      name: 'BTS',
      id: 'bts-4i5',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/bts-4i5-106x106.jpg'
    },
    {
      name: 'Dua Lipa',
      id: 'dua-lipa',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/dua-lipa-5k0-106x106.jpg'
    },
    {
      name: 'Bad Bunny',
      id: 'bad-bunny',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/bad-bunny-kt8-artist-chart-wqt-106x106.jpg'
    },
    {
      name: 'DaBaby',
      id: 'dababy-yo9',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/dababy-yo9-106x106.jpg'
    },
    {
      name: 'Harry Styles',
      id: 'harry-styles',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/harry-styles-psx-artist-chart-rzg-106x106.jpg'
    },
    {
      name: 'Kelsea Ballerini',
      id: 'kelsea-ballerini',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/kelsea-ballerini-n8l-106x106.jpg'
    },
    {
      name: 'Halsey',
      id: 'halsey-bly',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/halsey-bly-106x106.jpg'
    },
    {
      name: 'J Balvin',
      id: 'j-balvin',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/j-balvin-d72-106x106.jpg'
    },
    {
      name: 'Lewis Capaldi',
      id: 'lewis-capaldi',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lewis-capaldi-s2h-106x106.jpg'
    },
    {
      name: 'Juice WRLD',
      id: 'juice-wrld',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/juice-wrld-f0a-106x106.jpg'
    },
    {
      name: 'Drake',
      id: 'drake-hq6',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/drake-hq6-artist-chart-vz1-106x106.jpg'
    },
    {
      name: 'Megan Thee Stallion',
      id: 'megan-thee',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/megan-thee-stallion-fnn-106x106.jpg'
    },
    {
      name: 'Jonas Brothers',
      id: 'jonas-brothers',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/jonas-brothers-r3d-artist-chart-i1c-106x106.jpg'
    },
    {
      name: 'Khalid',
      id: 'khalid-dsk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/khalid-dsk-106x106.jpg'
    },
    {
      name: 'Ed Sheeran',
      id: 'ed-sheeran',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/ed-sheeran-buv-artist-chart-914-106x106.jpg'
    },
    {
      name: 'Taylor Swift',
      id: 'taylor-swift',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/taylor-swift-p7u-artist-chart-ylp-106x106.jpg'
    },
    {
      name: 'Maroon 5',
      id: 'maroon-5',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/maroon-5-9st-106x106.jpg'
    },
    {
      name: '5 Seconds Of Summer',
      id: '5-seconds',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/5-seconds-of-summer-deq-106x106.jpg'
    },
    {
      name: 'YoungBoy Never Broke Again',
      id: 'youngboy-never',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/youngboy-never-broke-again-cu3-106x106.jpg'
    },
    {
      name: 'Kane Brown',
      id: 'kane-brown',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/kane-brown-ndj-106x106.jpg'
    },
    {
      name: 'Lady Gaga',
      id: 'lady-gaga',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lady-gaga-gyl-87x87.jpg?1'
    },
    {
      name: 'Morgan Wallen',
      id: 'morgan-wallen',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/morgan-wallen-ur7-106x106.jpg'
    },
    {
      name: 'Future',
      id: 'future',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/future-l22-106x106.jpg'
    },
    {
      name: 'Camila Cabello',
      id: 'camila-cabello',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/camila-cabello-4tx-106x106.jpg'
    },
    {
      name: 'Arizona Zervas',
      id: 'arizona-zervas',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/arizona-zervas-egt-106x106.jpg'
    },
    {
      name: 'Tones And I',
      id: 'tones-and-i',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/tones-and-i-e8g-106x106.jpg'
    },
    {
      name: 'Maren Morris',
      id: 'maren-morris',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/maren-morris-knd-artist-chart-413-106x106.jpg'
    },
    {
      name: 'Lizzo',
      id: 'lizzo',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lizzo-w3u-106x106.jpg'
    }
  ];
}

export default RadioFilterPage;
