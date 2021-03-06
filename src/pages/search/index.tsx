import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { getSearchResultAPI } from '../../actions';
import {
  BackgroundImage,
  Header,
  HeaderOverlay,
  SearchIcon,
  SearchResultSection
} from '../../components';
import { ApplicationState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface DispatchProps {
  getSearchResultAPI: (query: string) => void;
}
interface StateProps {
  queryResult: string;
}

interface Props extends DispatchProps, StateProps, RouteComponentProps {}

class SearchPage extends React.Component<Props> {
  filterResult = (e): void => {
    if (e.target.value.length < 3) return;
    this.props.getSearchResultAPI('all');
  };

  private headerRef: React.RefObject<any> = React.createRef();

  render(): React.ReactNode {
    const { queryResult } = this.props;

    return (
      <IonPage id="search-page">
        <Header
          leftTitle="Search"
          titleClassName="search"
          rightCloseButton={false}
          leftBackButton={false}
          rightClickGoBack={true}
        />
        <HeaderOverlay ref={this.headerRef} />
        <IonContent
          fullscreen={true}
          scrollY={true}
          scrollEvents={true}
          onIonScroll={(e: CustomEvent): void =>
            this.headerRef.current?.handleParentScroll(e)
          }
          id="search-page"
        >
          <div className="search-page">
            <BackgroundImage default={true} />
            <div className={'content-container'}>
              <input
                autoComplete="off"
                placeholder={'Artist, Genre, sub-genre, era...'}
                type={'text'}
                className="input text"
                onChange={this.filterResult}
              />
              {Object.keys(queryResult).length === 0 && (
                <div className={'search-placeholder'}>
                  <SearchIcon />
                  <span className={'placeholder-text'}>
                    AI PANTHR Search for Artist, Genre, Sub-genre and Era
                  </span>
                </div>
              )}
              {Object.keys(queryResult).length > 0 && (
                <div className={'row'}>
                  {Object.keys(queryResult).map(
                    (prop: string, i: number): React.ReactNode => {
                      return (
                        <SearchResultSection
                          key={i}
                          title={prop}
                          content={queryResult[prop]}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = ({ searchAPI }: ApplicationState): StateProps => {
  const { queryResult } = searchAPI;
  return {
    queryResult
  };
};

export default connect(mapStateToProps, {
  getSearchResultAPI
})(SearchPage);
