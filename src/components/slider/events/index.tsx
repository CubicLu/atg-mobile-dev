import React from 'react';
import { CardEvent, _, Button } from './../../../components';
import {} from './../../../actions';

interface Props {
  title: string;
  viewAll?: boolean;
  scroll?: boolean;
  data?: any[];
}

class SliderEventsComponent extends React.Component<Props> {
  public static defaultProps = {
    viewAll: true,
    scroll: false
  };
  render(): React.ReactNode {
    return (
      <div className="row slider image">
        <div className={'row content'}>
          <div className="col s8">
            <h1 className="title">{this.props.title}</h1>
          </div>
          <div className="col s4 view-all">
            {this.props.viewAll && (
              <Button color={'transparent'} label={'View All'} />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            {_.map(
              this.props.data,
              (data, i): React.ReactNode => {
                return <CardEvent data={data} key={i} />;
              }
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default SliderEventsComponent;
