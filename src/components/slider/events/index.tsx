import React from 'react';
import { CardEvent, _, Button } from './../../../components';
import {} from './../../../actions';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
  artistUsername: string | undefined;
}

class SliderEventsComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false
  };
  render(): React.ReactNode {
    return (
      <div className="row slider image">
        <div className="list-view-all">
          <div>
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="action">
            {this.props.viewAll && (
              <Button color={'transparent'} label={'View All'} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            {_.map(
              this.props.data?.slice(0, 1),
              (data, i): React.ReactNode => {
                return (
                  <CardEvent
                    data={data}
                    id={i}
                    key={i}
                    artistUsername={this.props.artistUsername}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default SliderEventsComponent;
