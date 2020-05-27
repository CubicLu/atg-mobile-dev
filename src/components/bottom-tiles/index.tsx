import React from 'react';
import { AlbumInterface } from '../../models';
import { IonRouterLink } from '@ionic/react';
import { shadowTitle } from '../../utils';

interface Props {
  tiles?: AlbumInterface[];
  onClick?: () => void;
  hidden?: boolean;
  artistUrl?: string;
}

export default class BottomTilesComponent extends React.Component<Props> {
  render(): React.ReactNode {
    let { tiles, onClick, artistUrl } = this.props;
    if (artistUrl === 'pharrell-williams') tiles = this.pharrell;
    if (artistUrl === 'rival-sons') tiles = this.rivalSons;
    if (!tiles) tiles = this.rivalSons;
    if (tiles.length < 3) tiles = this.rivalSons;

    return (
      <div
        style={{ visibility: this.props.hidden ? 'hidden' : 'visible' }}
        className="bottom-tiles fluid"
      >
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

  pharrell = [
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/tile1.jpg?v2',
      name: 'Deep Dive',
      redirectUrl: '/artist/pharrell-williams/deep-dive'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/tile2.jpg?v2',
      name: 'Community',
      redirectUrl: '/community/artist/pharrell-williams'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/tile3.jpg?v2',
      name: 'Artist Radio',
      redirectUrl: '/radio/artist/pharrell-williams'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/tile4.jpg?v2',
      name: 'Photos',
      redirectUrl: '/artist/pharrell-williams/gallery'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/artists/pharrell-williams/tile5.jpg?v2',
      name: 'Videos',
      redirectUrl: '/artist/pharrell-williams/video'
    }
  ];
  rivalSons = [
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
      redirectUrl: '/radio'
    }
  ];
}
