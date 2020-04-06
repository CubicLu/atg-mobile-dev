import React from 'react';
import { Avatar } from '../../components';
import { ShapesSize } from '../../interfaces';

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

class SearchResultSectionComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className={'search-result mt-3'}>
        <span className={'section-name'}>{this.props.title}</span>
        {this.props.content.map(
          (data: SearchResult, i: number): React.ReactNode => (
            <div key={i} className={'row flex-align-items-center section'}>
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
                <span className={'section-subtitle row'}>{data.artist}</span>
              </div>
            </div>
          )
        )}
        <div className="mt-3 search-outline-purple" />
      </div>
    );
  }
}

export default SearchResultSectionComponent;
