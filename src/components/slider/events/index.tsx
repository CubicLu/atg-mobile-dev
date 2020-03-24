import React from 'react';
import { CardEvent, Button } from './../../../components';
import { Colors } from '../../../interfaces';

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
      <div className="row slider image">
        <div className="list-view-all">
          <div>
            <h1 className="title">{title}</h1>
          </div>
          <div className="action">
            {viewAll && (
              <Button color={Colors.transparent} label={'View All'} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col s12">
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
        </div>
      </div>
    );
  }
}
export default SliderEventsComponent;
