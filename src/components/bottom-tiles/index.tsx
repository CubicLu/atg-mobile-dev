import React from 'react';
import { AlbumInterface } from '../../interfaces';
import { IonRouterLink } from '@ionic/react';
import { shadowTitle } from '../../utils';

interface Props {
  tiles?: AlbumInterface[];
}

export default class BottomTilesComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { tiles } = this.props;
    if (!tiles) return null;
    if (tiles.length < 3) return null;

    return (
      <div className="bottom-tiles fluid">
        {tiles.map(
          (tile, i): React.ReactNode => (
            <IonRouterLink
              key={i}
              routerLink={tile.redirectUrl}
              routerDirection="forward"
            >
              <div className="tile" style={shadowTitle(tile.image!)}>
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
}
