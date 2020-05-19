import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  CardEra
} from '../../../components';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

class VaultFilterEraPage extends React.Component<Props> {
  private headerRef: React.RefObject<any> = React.createRef();
  era = [
    {
      name: 'Modern',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
      color: '#005dac',
      subEra: [
        {
          name: 'Pop & Soul',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
          color: '#005dac'
        },
        {
          name: 'R&B',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
          color: '#005dac'
        },
        {
          name: 'Hipster Hits',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
          color: '#005dac'
        },
        {
          name: 'Latin Lover',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
          color: '#005dac'
        },
        {
          name: 'Modern Film & Trailer',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/edm%403x.png',
          color: '#005dac'
        }
      ]
    },
    {
      name: '2000s',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png.png',
      color: '#810d6e',
      subEra: [
        {
          name: 'Alternative Drop',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        },
        {
          name: 'Motown Soul',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        },
        {
          name: 'Neo Soul',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        },
        {
          name: 'Latin Lover',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        },
        {
          name: 'Modern Film & Trailer',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        },
        {
          name: 'Blue-eyed Soul',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/lounge%403x.png',
          color: '#810d6e'
        }
      ]
    },
    {
      name: '90s',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
      color: '#00a850',
      subEra: [
        {
          name: '90s Old School',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
          color: '#00a850'
        },
        {
          name: 'Gold Era',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
          color: '#00a850'
        },
        {
          name: 'Motown Soul',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
          color: '#00a850'
        },
        {
          name: 'Skate Punker',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
          color: '#00a850'
        },
        {
          name: 'Classic Club',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/metal%403x.png',
          color: '#00a850'
        }
      ]
    },
    {
      name: '80s',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
      color: '#005dac',
      subEra: [
        {
          name: 'Funk & Groove',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        },
        {
          name: 'Gold era',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        },
        {
          name: 'Leather & Hair',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        },
        {
          name: 'Skate Punker',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        },
        {
          name: 'Horrorcore',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        },
        {
          name: 'Classic Club',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/hiphop%403x.png',
          color: '#005dac'
        }
      ]
    },
    {
      name: '70s',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
      color: '#db115f',
      subEra: [
        {
          name: 'Funk & Groove',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        },
        {
          name: 'Yacht Classics',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        },
        {
          name: 'Leather & Hair',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        },
        {
          name: 'Big Band',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        },
        {
          name: 'Village Folkies',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        },
        {
          name: 'Southern Outlaw',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/jazz%403x.png',
          color: '#db115f'
        }
      ]
    },
    {
      name: '60s',
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
      color: '#f6852b',
      subEra: [
        {
          name: 'Greasers Garage',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
          color: '#f6852b'
        },
        {
          name: 'Classic Jazz',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
          color: '#f6852b'
        },
        {
          name: 'Grime & Glam',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
          color: '#f6852b'
        },
        {
          name: 'Corporate Classics',
          selected: false,
          image:
            'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/genres/soul%403x.png',
          color: '#f6852b'
        }
      ]
    }
  ];
  render(): React.ReactNode {
    return (
      <IonPage id="vault-filter-era-page">
        <Header
          leftTitle="Era"
          titleClassName="era"
          rightCloseButton
          leftBackButton={false}
          rightCloseHref="/vault-filter"
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
          id="vault-filter-genre-page"
        >
          <div className="vault-filter-genre-page">
            <BackgroundImage
              gradient={'180deg,#1F0739,#1F0739'}
              backgroundTop
              backgroundBottom
              backgroundBottomDark={false}
              backgroundTopDark
              backgroundTopOpacity={0.7}
            />
            <div className={'content-container'}>
              <div className={'row'}>
                {this.era.map(
                  (data, i): React.ReactNode => {
                    return (
                      <div className={'col s6'} key={i}>
                        <CardEra
                          history={this.props.history}
                          name={data.name}
                          key={i}
                          backgroundColor={data.color}
                          subEra={data.subEra}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default VaultFilterEraPage;
