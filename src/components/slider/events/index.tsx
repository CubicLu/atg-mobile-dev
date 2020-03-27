import React from 'react';
import { CardEvent, Button } from './../../../components';
import { Colors, ShapesSize } from '../../../interfaces';

interface Props {
  title: string;
  viewAll?: boolean;
  data?: any[];
  artistUsername: string | undefined;
}

class SliderEventsComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true
  };
  render(): React.ReactNode {
    const { data, title, viewAll, artistUsername } = this.props;
    if (!data) return <div />;

    return (
      <React.Fragment>
        <div className="list-feature-component align-bottom row">
          <div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="action">
            {viewAll && (
              <Button color={Colors.transparent} type={ShapesSize.viewAll} />
            )}
          </div>
        </div>
        <div style={{ marginLeft: 24, marginRight: 24 }}>
          {data.slice(0, 1).map(
            (data, i): React.ReactNode => (
              <CardEvent
                data={data}
                id={i}
                key={i}
                artistUsername={artistUsername}
              />
            )
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default SliderEventsComponent;
