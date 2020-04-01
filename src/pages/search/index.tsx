import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BackgroundImage, Header, SearchIcon } from '../../components';

interface Props extends RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  filterResult = e => {
    if (e.target.value.length < 3) return;
    console.log(e.target.value);
  };

  queryResult = {
    artists: [
      {
        name: 'Pharrell Williams',
        avatar: 'url'
      }
    ],
    albums: [
      {
        name: 'GIRL',
        artist: 'Pharrell Williams',
        cover: 'url'
      }
    ],
    songs: [
      {
        name: 'Happy',
        artist: 'Pharrell Williams',
        cover: 'url'
      }
    ],
    recommendations: [
      {
        name: 'Focus',
        artist: 'H.E.R',
        cover: 'url'
      }
    ],
    eras: [
      {
        name: 'GIRL',
        artist: 'Pharrell Williams',
        cover: 'url'
      }
    ],
    genres: [
      {
        name: 'GIRL',
        artist: 'Pharrell Williams',
        cover: 'url'
      }
    ],
    vibes: [
      {
        name: 'GIRL',
        artist: 'Pharrell Williams',
        cover: 'url'
      }
    ]
  };

  render(): React.ReactNode {
    return (
      <IonPage id="search-page">
        <Header
          leftTitle="Search"
          titleClassName="search"
          rightCloseButton
          leftBackButton={false}
        />
        <IonContent id="search-page" scrollY={false}>
          <div className="search-page">
            <BackgroundImage
              gradient={`180deg,#1F0739,#1F0739`}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              backgroundTopDark
              backgroundTopOpacity={0.7}
            />
            <div className={`content-container`}>
              <input
                placeholder={'Artist, Genre, sub-genre, era...'}
                type={'text'}
                className="input text"
                onChange={this.filterResult}
              />
              <div className={'search-placeholder'}>
                <SearchIcon />
                <span className={'placeholder-text'}>
                  AI PANTHR Search for Artist, Genre, Sub-genre and Era
                </span>
              </div>
              <div className={'row'}>
                <div className={'query-result'}>a</div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(SearchPage);
