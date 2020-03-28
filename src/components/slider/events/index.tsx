import React from 'react';
import { CardEvent } from './../../../components';
interface Props {
  data?: any[];
  artistUsername: string | undefined;
}

class SliderEventsComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const { data, artistUsername } = this.props;
    if (!data) return <div />;
    return data
      .slice(0, 1)
      .map(
        (data, i): React.ReactNode => (
          <CardEvent
            data={data}
            id={i}
            key={i}
            artistUsername={artistUsername}
          />
        )
      );
  }
}
export default SliderEventsComponent;
