import React from 'react';
import { AlbumInterface } from '../../models';
import { IonRouterLink } from '@ionic/react';
import { shadowTitle } from '../../utils';

interface Props {
  tiles?: AlbumInterface[];
  onClick?: () => void;
}

export default class BottomTilesComponent extends React.Component<Props> {
  render(): React.ReactNode {
    let { tiles, onClick } = this.props;
    if (!tiles) tiles = this.default;
    if (tiles.length < 3) tiles = this.default;

    return (
      <div className="bottom-tiles fluid">
        {tiles.map(
          (tile, i): React.ReactNode => (
            <IonRouterLink
              key={i}
              routerLink={tile.redirectUrl}
              routerDirection="forward"
            >
              <div
                onClick={(): void => (onClick ? onClick() : undefined)}
                className="tile"
                style={shadowTitle(tile.image!)}
              >
                <div>
                  <span className="f6">{tile.name}</span>
                </div>
              </div>
            </IonRouterLink>
          )
        )}
      </div>
    );
  }

  default = [
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/rival-sons/t4.jpg',
      name: 'Deep Dive',
      redirectUrl: '/artist/rival-sons/deep-dive'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/rival-sons/t2.jpg',
      name: 'Community',
      redirectUrl: '/community/artist/rival-sons'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/rival-sons/t3.jpg',
      name: 'Artist Radio',
      redirectUrl: '/artist/rival-sons'
    }
  ];
}
