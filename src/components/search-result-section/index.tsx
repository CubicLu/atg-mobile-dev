import React from 'react';
import { Avatar, ContentLoader } from '../../components';
import { ShapesSize } from '../../types';
import { IonRouterLink } from '@ionic/react';

interface State {
  searchIsReady: boolean;
}

interface SearchResult {
  name?: string;
  avatar?: string;
  artist?: string;
  cover?: string;
}
interface Props {
  title: string;
  content: SearchResult[];
}

class SearchResultSectionComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      searchIsReady: false
    };
  }

  displayContent = (): void => {
    setTimeout((): void => {
      this.setState({
        searchIsReady: true
      });
    }, 2000);
  };

  render(): React.ReactNode {
    if (!this.state.searchIsReady) this.displayContent();

    return (
      <div>
        <ContentLoader
          className="mt-3"
          speed={2}
          viewBox="0 0 400 90"
          baseUrl={window.location.pathname}
          backgroundColor="rgb(255,255,255)"
          foregroundColor="rgb(255,255,255)"
          backgroundOpacity={0.05}
          foregroundOpacity={0.15}
          style={
            this.state.searchIsReady
              ? { visibility: 'hidden', display: 'none' }
              : { visibility: 'visible' }
          }
        >
          <circle cx="30" cy="30" r="30" />
          <rect x="80" y="20" rx="3" ry="3" width="180" height="20" />
        </ContentLoader>
        <div
          className={'search-result mt-3'}
          style={
            this.state.searchIsReady
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
        >
          <span className={'section-name'}>{this.props.title}</span>
          {this.props.content.map(
            (data: SearchResult, i: number): React.ReactNode => (
              <IonRouterLink key={i} routerLink="/artist/pharrell-williams">
                <div className={'row flex-align-items-center section'}>
                  <Avatar
                    type={ShapesSize.circle}
                    width={57}
                    height={57}
                    image={data.avatar}
                  />
                  <div className={'column'}>
                    <span className="section-title flex-align-items-center row">
                      {data.name}
                    </span>
                    <span className={'section-subtitle row'}>
                      {data.artist}
                    </span>
                  </div>
                </div>
              </IonRouterLink>
            )
          )}
          <div className="mx-4 mt-3 search-outline-purple" />
        </div>
      </div>
    );
  }
}

export default SearchResultSectionComponent;
