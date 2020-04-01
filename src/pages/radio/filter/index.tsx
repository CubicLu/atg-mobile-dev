import React from 'react';
import { IonPage, IonContent, IonSearchbar } from '@ionic/react';
import {
  Header,
  HeaderOverlay,
  BackgroundImage,
  SectionTitle,
  ArrowRightIcon
} from '../../../components';
import {
  GenreInterface,
  EraInterface,
  VibeInterface
} from '../../../interfaces';
import Slider, { Settings } from 'react-slick';
interface Props {}
interface State {
  searchText?: string;
}
type searchTypes = GenreInterface | VibeInterface | EraInterface;
class RadioFilterPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchText: '' };
  }
  eras: EraInterface[] = [
    { name: 'Modern', color: '#01a7d1' },
    { name: '2000s', color: '#db115f' },
    { name: '90s', color: '#810d6e' },
    { name: '80s', color: '#f6852b' },
    { name: '70s', color: '#00a850' },
    { name: '60s', color: '#8dc53e' }
  ];
  vibes: VibeInterface[] = [
    { icon: 'h', name: 'Happy', color: '#01add9' },
    { icon: 'r', name: 'Romantic', color: '#fcc505' },
    { icon: 'o', name: 'Optimistic', color: '#8dc53e' },
    { icon: 'a', name: 'Anticipation', color: '#810d6e' },
    { icon: 'e', name: 'Energic', color: '#db115f' }
  ];
  genres: GenreInterface[] = [
    {
      id: '1',
      name: 'Blues',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/blues.jpg',
      color1: '#00000000',
      color2: '#01a7d1'
    },
    {
      id: '4',
      name: 'Jazz',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/jazz.jpg',
      color1: '#00000000',
      color2: '#db115f'
    },
    {
      id: '2',
      name: 'Funk',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/funk.jpg',
      color1: '#00000000',
      color2: '#00a850'
    },
    {
      id: '5',
      name: 'Soul',
      image: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/soul.jpg',
      color1: '#00000000',
      color2: '#000000'
    },
    {
      id: '3',
      name: 'Lounge',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/lounge.jpg',
      color1: '#00000000',
      color2: '#f6852b'
    },
    {
      id: '6',
      name: 'Country',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/genre/country.jpg',
      color1: '#00000000',
      color2: '#8dc53e'
    }
  ];

  private headerRef: React.RefObject<any> = React.createRef();

  searchFilter(array: searchTypes[]): any[] {
    const text = this.state?.searchText;
    if (!(text && text.length > 0)) {
      return array;
    }
    return array.filter((x: searchTypes): boolean =>
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
                  (genre: GenreInterface, i: number): any => (
                    <div key={i} className="card-genre-col mx-1">
                      <div
                        className={`card-genre mb-1`}
                        style={{
                          background: `linear-gradient(180deg,${genre.color1},${genre.color2}), url(${genre.image})`
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

            <div className="mb-5" />
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default RadioFilterPage;
