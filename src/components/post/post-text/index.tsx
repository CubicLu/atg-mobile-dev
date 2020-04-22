import React from 'react';

interface Props {
  className?: string;
}
export default class PostText extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <div className={`f6 dark mb-4 ${this.props.className}`}>
        GET THE MONEY - Cross The Line is the first song from Taylor Hawkins &
        The Coattail Riders new Album. Support Us and listen to the whole album.
      </div>
    );
  }
}
