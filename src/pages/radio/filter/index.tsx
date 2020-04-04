import React from 'react';
import { IonPage, IonContent, IonSearchbar, IonRouterLink } from '@ionic/react';
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
  selectedChannel?: ChannelInterface;
  activeTag?: string;
}

class RadioFilterPage extends React.Component<Props, State> {
  componentWillUnmount(): void {
    this.resetSearch();
  }
  constructor(props: Props) {
    super(props);
    this.state = { searchText: '' };
  }
  private headerRef: React.RefObject<any> = React.createRef();

  filteredTags(): any[] {
    let array = this.tags;
    const text = this.state?.searchText;
    if (!(text && text.length > 2)) {
      return array;
    }
    return array.filter((x: any): boolean =>
      x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }
  filteredStations(): any[] {
    let array = this.stations;
    const text = this.state?.searchText;
    const tag = this.state?.activeTag;
    const channel = this.state?.selectedChannel;
    if (tag) {
      return array.filter((x): any => x.tags?.find((y): boolean => y === tag));
    }

    if (!(text && text.length > 0)) {
      if (channel && channel.type === 'Genre') {
        return array.filter((a): boolean => a.genre === channel.name);
      } else return array;
    }

    return array.filter(
      (x: StationInterface): boolean =>
        x.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        x.genre.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        !!x.tags?.find((x): boolean =>
          x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        )
    );
  }
  searchFilter(array: ChannelInterface[]): any[] {
    const text = this.state?.searchText;
    if (!(text && text.length > 2)) {
      return array;
    }

    const relatedStations = this.stations
      .filter(
        (x: StationInterface): boolean =>
          x.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
          x.genre.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
          !!x.tags?.find((x): boolean =>
            x.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          )
      )
      .map((x): any => x.genre); // fix me change to type

    return array.filter(
      (x: ChannelInterface): boolean =>
        x.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        (x.type === 'Genre' && relatedStations.toString().includes(x.name))
    );
  }
  performSearch(value: string): void {
    this.setState({ searchText: value });
  }

  renderGenres(): React.ReactNode {
    return (
      <React.Fragment>
        {this.searchFilter(this.genres).length > 0 && (
          <SectionTitle title="GENRE" className="mx-3 mt-3 mb-2" />
        )}
        <div className="genres mx-2">
          <Slider {...this.settings}>
            {this.searchFilter(this.genres).map(
              (genre: ChannelInterface, i: number): any => (
                <div
                  key={i}
                  onClick={this.selectChannel.bind(this, genre)}
                  className="card-genre-col mx-1"
                >
                  <div
                    className={`card-genre mb-1`}
                    style={{
                      backgroundImage: `linear-gradient(180deg,${genre.color}00,${genre.color}), url(${genre.image})`
                    }}
                  />
                  <span className={'mx-05 f4'}>{genre.name}</span>
                </div>
              )
            )}
          </Slider>
        </div>
      </React.Fragment>
    );
  }
  renderEras(): React.ReactNode {
    return (
      <React.Fragment>
        {this.searchFilter(this.eras).length > 0 && (
          <SectionTitle title="ERA" className="mx-3 mt-4 mb-2" />
        )}

        <div className="eras row mx-2 fluid">
          {this.searchFilter(this.eras).map(
            (era, i): React.ReactElement => (
              <div
                key={i}
                onClick={this.selectChannel.bind(this, era)}
                style={{ background: era.color }}
                className="card-era mx-1 flex-column-center"
              >
                <span className="f4 bold">{era.name}</span>
              </div>
            )
          )}
        </div>
      </React.Fragment>
    );
  }

  renderVibes(): React.ReactNode {
    return (
      <React.Fragment>
        {this.searchFilter(this.vibes).length > 0 && (
          <SectionTitle title="VIBE SCALE" className="mx-3 mt-4 mb-2" />
        )}

        <div className="vibes mx-3 my-2 mb-5">
          {this.searchFilter(this.vibes).map(
            (vibe, i): React.ReactElement => (
              <div
                onClick={this.selectChannel.bind(this, vibe)}
                className="vibe flex row mt-1 f4"
                key={i}
              >
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
      </React.Fragment>
    );
  }

  renderSearchBar(): React.ReactNode {
    return (
      <>
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
      </>
    );
  }
  setTag(tag: string): void {
    const activeTag = this.state.activeTag === tag ? undefined : tag;
    this.setState({ activeTag });
  }

  resetSearch = async (): Promise<void> => {
    this.setState({
      searchText: '',
      selectedChannel: undefined,
      activeTag: undefined
    });
  };

  renderTags(): React.ReactNode {
    const active = this.state.activeTag;
    return (
      <div className="m-1 ml-2 row badge-row flex">
        {this.filteredTags().map(
          (tag, i): React.ReactElement => (
            <span
              key={i}
              onClick={this.setTag.bind(this, tag)}
              className={`mx-1 f6 badge-item ${tag === active ? 'active' : ''}`}
            >
              {tag}
            </span>
          )
        )}
      </div>
    );
  }
  renderChannels(): React.ReactNode {
    return (
      <>
        <SectionTitle title="STATIONS" className="mx-3 mt-1 mb-2" />
        <div className="row mx-3 mb-5">
          {this.filteredStations().map(
            (station): React.ReactElement => (
              <div
                key={station.id}
                className={`col s4 no-padding p-1 flex-column-center mb-2 center-align`}
              >
                <IonRouterLink
                  routerLink={`/radio/genre/${station.genre.toLocaleLowerCase()}`}
                  routerDirection="forward"
                >
                  <>
                    <div
                      onClick={this.resetSearch}
                      className={`station circle`}
                      style={{
                        background: `url(${station.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="mt-1 mb-2 f7 l1">{station.name}</div>
                  </>
                </IonRouterLink>
              </div>
            )
          )}
        </div>
      </>
    );
  }

  selectChannel(channel?: ChannelInterface): void {
    return this.setState({ selectedChannel: channel });
  }
  render(): React.ReactNode {
    const { selectedChannel } = this.state;
    const pageTitle = selectedChannel ? `${selectedChannel.name}` : 'Filter';
    const classTitle = selectedChannel ? `ml-2` : '';

    return (
      <IonPage id="radio-filter-page">
        <Header
          title={pageTitle}
          titleLeft={true}
          titleClassName={classTitle}
          leftBackOnClick={this.selectChannel.bind(this, undefined)}
          leftBackButton={!!selectedChannel}
          rightCloseButton={true}
          rightCloseHref={'/radio'}
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
            <>{!selectedChannel && this.renderSearchBar()};</>
            <>{!selectedChannel && this.renderGenres()};</>
            <>{!selectedChannel && this.renderEras()};</>
            <>{!selectedChannel && this.renderVibes()};</>
            <>{selectedChannel && this.renderTags()};</>
            <>{selectedChannel && this.renderChannels()};</>
            <div className="mb-5" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  settings: Settings = {
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
  tags: string[] = [
    'Dance-Pop',
    'Reggaeton',
    'Contemporary R&B',
    'Indie Rock',
    'Emo',
    'Pop-Punk',
    'Hip-Hop',
    'Electronica',
    'Hard Rock',
    'Alternative Metal',
    'New Wave Revival',
    'Teen Pop',
    'Boy Bands',
    'Moombahton',
    'Pacific reggae',
    'Singjay',
    'Ragga',
    'Reggaeton‎',
    'Dub poetry'
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
      name: 'Reggae',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/lounge.jpg',
      color: '#f6852b',
      tags: [
        'Moombahton',
        'Pacific reggae',
        'Singjay',
        'Ragga',
        'Reggaeton‎',
        'Dub poetry'
      ]
    },
    {
      id: '6',
      type: 'Genre',
      name: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/country.jpg',
      color: '#8dc53e',
      tags: [
        'Soul meets Hip Hop',
        'Morning Soul & Funk',
        'Indie Folk Energy',
        'Chill to Folk',
        'Lazy Indie'
      ]
    }
  ];

  stations: StationInterface[] = [
    {
      name: 'The Weeknd',
      id: 'the-weeknd',
      genre: 'Blues',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/the-weeknd-gvx-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Dub poetry',
        'Happy Rock',
        'New Wave Revival',
        'Soft Rock',
        'Hip - Hop',
        'Boy Bands / Girl Groups',
        'Glam Rock'
      ]
    },
    {
      name: 'Lil Uzi Vert',
      id: 'lil-uzi',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lil-uzi-vert-mre-106x106.jpg',
      tags: [
        'Rock',
        'Sabor Latino',
        'Dance - Pop',
        'Hair Metal',
        'Romantic evening',
        'Country',
        'Blues - Rock',
        'Rock'
      ]
    },
    {
      name: 'Kenny Rogers',
      id: 'kenny-rogers',
      genre: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/kenny-rogers-vja-106x106.jpg',
      tags: [
        'Ska',
        'Dance & EDM',
        'Feel Good Alternative',
        'Romantic evening',
        'Forever Jazz',
        'Indie Folk Energy',
        'Progressive Rock'
      ]
    },
    {
      name: 'Post Malone',
      id: 'post-malone',
      genre: 'Soul',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/post-malone-1vw-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Dub poetry',
        'Pura Cumbia',
        'It´s a match',
        'Ska',
        'Dance - Pop',
        'Contemporary R&B'
      ]
    },
    {
      name: 'Conan Gray',
      id: 'conan-gray',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/conan-gray-ukk-106x106.jpg',
      tags: [
        'Latin Rock',
        'Synth - Pop',
        'Rock',
        'Electronic',
        'Alternative Metal',
        'New Wave Revival'
      ]
    },
    {
      name: 'Billie Eilish',
      id: 'billie-eilish',
      genre: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/billie-eilish-1e3-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Morning Soul & Funk',
        'Twerk It Out',
        'It´s a match',
        'Rap',
        'Indie Rock'
      ]
    },
    {
      name: 'Lil Baby',
      id: 'lil-baby',
      genre: 'Reggae',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lil-baby-nwx-106x106.jpg',
      tags: [
        'Dub poetry',
        'Electronica',
        'Best Alternatives',
        'Alternative / College Rock',
        'Women of Jazz',
        'Contemporary R&B',
        'Pop-Punk',
        'Indie Rock'
      ]
    },
    {
      name: 'Roddy Ricch',
      id: 'roddy-ricch',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/roddy-ricch-eqp-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Morning Soul & Funk',
        'Teen Pop',
        'Brazilian music',
        'Metal'
      ]
    },
    {
      name: 'Luke Combs',
      id: 'luke-combs',
      genre: 'Reggae',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/luke-combs-y14-106x106.jpg',
      tags: [
        'Dub poetry',
        'Hip - Hop',
        'Blues Rock Roadtrip',
        'Chill Jazz',
        'Electronica',
        'Indie Rock',
        'Reggaeton'
      ]
    },
    {
      name: 'Justin Bieber',
      id: 'justin-bieber',
      genre: 'Soul',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/justin-bieber-4oh-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Disney Artists',
        'Internet Stars',
        'Teen Pop',
        'Jazzy Romance',
        'Teen Pop',
        'Boy Bands'
      ]
    },
    {
      name: 'BTS',
      id: 'bts-4i5',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/bts-4i5-106x106.jpg',
      tags: [
        'Singer - Songwriter',
        'Women in Blues',
        'Acoustic Blues',
        'Rap',
        'Teen Pop',
        'Boy Bands'
      ]
    },
    {
      name: 'Bad Bunny',
      id: 'bad-bunny',
      genre: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/bad-bunny-kt8-artist-chart-wqt-106x106.jpg',
      tags: [
        'Contemporary R & B',
        'Boy Bands / Girl Groups',
        'Blues at work',
        'New Wave Revival',
        'Dub poetry',
        'Indie Rock'
      ]
    },
    {
      name: 'DaBaby',
      id: 'dababy-yo9',
      genre: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/dababy-yo9-106x106.jpg',
      tags: [
        'Dance-Pop',
        'Alternative / College Rock',
        'Forró',
        'Midnight Jazz',
        'Contemporary R&B'
      ]
    },
    {
      name: 'Bob Marley',
      id: 'bob-marley',
      genre: 'Reggae',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/bob.jpg',
      tags: [
        'Reggaeton',
        'Moombahton',
        'Pacific reggae',
        'Forró',
        'Midnight Jazz'
      ]
    },
    {
      name: 'Harry Styles',
      id: 'harry-styles',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/harry-styles-psx-artist-chart-rzg-106x106.jpg',
      tags: ['Downcast', 'Internet Stars', 'Technotronic', 'Hardcore Punk']
    },
    {
      name: 'Kelsea Ballerini',
      id: 'kelsea-ballerini',
      genre: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/kelsea-ballerini-n8l-106x106.jpg',
      tags: [
        'Psychedelic Rock',
        'Forever Jazz',
        'Psychedelic Rock',
        'Progressive Rock',
        'New Wave',
        'Dub poetry'
      ]
    },
    {
      name: 'Halsey',
      id: 'halsey-bly',
      genre: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/halsey-bly-106x106.jpg',
      tags: [
        'Jazzy Romance',
        'Psychedelic Rock',
        'Britpop',
        'Internet Stars',
        'Sabor Latino'
      ]
    },
    {
      name: 'J Balvin',
      id: 'j-balvin',
      genre: 'Jazz',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/j-balvin-d72-106x106.jpg',
      tags: [
        'Hip - Hop',
        'Acoustic Blues',
        'Soft Rock',
        'Black Power',
        'Glam Rock',
        'Dub poetry',
        'Indie Rock'
      ]
    },
    {
      name: 'Lewis Capaldi',
      id: 'lewis-capaldi',
      genre: 'Soul',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/lewis-capaldi-s2h-106x106.jpg',
      tags: [
        'Alternative / College Rock',
        'Blues Rock Roadtrip',
        'Contemporary R & B',
        'Alternative Metal'
      ]
    },
    {
      name: 'Juice WRLD',
      id: 'juice-wrld',
      genre: 'Funk',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/juice-wrld-f0a-106x106.jpg',
      tags: [
        'Soul',
        'Reggaeton',
        'Blues - Rock',
        'Acoustic Blues',
        'Electronic',
        'Black Power'
      ]
    },
    {
      name: 'Drake',
      id: 'drake-hq6',
      genre: 'Soul',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/drake-hq6-artist-chart-vz1-106x106.jpg',
      tags: [
        'It´s a match',
        'Acoustic Blues',
        'British Invasion',
        'Best Alternatives',
        'Late Night Blues'
      ]
    },
    {
      name: 'Megan Thee Stallion',
      id: 'megan-thee',
      genre: 'Blues',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/megan-thee-stallion-fnn-106x106.jpg',
      tags: [
        'Chicago Blues',
        'Happy Rock',
        'Grunge',
        'Reggaeton',
        'Synth - Pop',
        'Brazilian music',
        'Teen Pop'
      ]
    },
    {
      name: 'Ed Sheeran',
      id: 'ed-sheeran',
      genre: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/stations/ed-sheeran-buv-artist-chart-914-106x106.jpg',
      tags: ['It´s a match', 'Internet Stars', 'Teen Pop', 'Jazzy Romance']
    }
  ];
}

export default RadioFilterPage;
